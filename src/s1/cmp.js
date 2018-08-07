// __cmp('setConsentUiCallback', callback) QUANTCAST
import 'core-js/fn/array/find-index';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/from';
import 'core-js/fn/array/find';
import 'core-js/fn/array/map';
import 'core-js/fn/object/keys';

import cmp from './loader';
import {init} from '../lib/init';
import log from '../lib/log';
import {readCookie, writeCookie} from "../lib/cookie/cookie";

const GDPR_OPT_IN_COOKIE = "gdpr_opt_in";
const GDPR_OPT_IN_COOKIE_MAX_AGE = 33696000;

const defaultConfig = {
	logging: false
};

const initialize = (config, callback) => {
	init(config, cmp).then(() => {
		cmp('addEventListener', 'onSubmit', () => {
			checkConsent();
		});
		checkConsent(callback);
	});
};

const checkHasConsentedAll = ({ purposeConsents } = {}) => {
	const hasAnyPurposeDisabled = Object.keys(purposeConsents).find(key => {
		return purposeConsents[key] === false;
	});
	return !hasAnyPurposeDisabled;
};

const checkConsent = (callback = () => {}) => {
	let errorMsg = "";
	if (!cmp.isLoaded) {
		errorMsg = 'CMP failed to load';
		log.error(errorMsg);
		handleConsentResult({
			errorMsg
		});
	} else if (!window.navigator.cookieEnabled) {
		errorMsg = 'Cookies are disabled. Ignoring CMP consent check';
		log.error(errorMsg);
		handleConsentResult({
			errorMsg
		});
	} else {
		cmp('getVendorList', null, vendorList => {
			cmp('getVendorConsents', null, vendorConsentData => {
				handleConsentResult({
					vendorList,
					vendorConsentData,
					callback
				});
			});
		});
	}
};

const handleConsentResult = ({
	vendorList = {},
	vendorConsentData = {},
	callback,
	errorMsg = ""
}) => {
	const hasConsentedCookie = readCookie(GDPR_OPT_IN_COOKIE);
	const { vendorListVersion: listVersion } = vendorList;
	const { created, vendorListVersion } = vendorConsentData;
	if (!created) {
		errorMsg = 'No consent data found. Show consent tool';
	}
	// if (vendorListVersion !== listVersion) {
	// 	errorMsg = `Consent found for version ${vendorListVersion}, but received vendor list version ${listVersion}. Showing consent tool`;
	// }
	log.debug("FIXME: Unify pubVendorVersion and globalVendorVersion", listVersion, vendorListVersion);
	if (errorMsg) {
		log.debug(errorMsg);
	}

	// if (!listVersion) {
	// 	errorMsg =
	// 		'Could not determine vendor list version. Not showing consent tool';
	// }

	if (callback && typeof callback === "function") {
		// store as 1 or 0
		const hasConsented = checkHasConsentedAll(vendorConsentData);
		if (created) {
			writeCookie(GDPR_OPT_IN_COOKIE, hasConsented ? "1" : "0", GDPR_OPT_IN_COOKIE_MAX_AGE);
		}
		const consent = {
			consentRequired: true,
			gdprApplies: true,
			hasConsented,
			vendorList,
			vendorConsentData,
			errorMsg
		};
		callback.call(this, consent);

		if (created && hasConsented !== hasConsentedCookie) {
			cmp.notify('onConsentChanged', consent);
		}
	}
};

// initialize CMP
(() => {
	const initIndex = cmp.commandQueue && cmp.commandQueue.findIndex(({ command }) => {
		return command === 'init';
	});

	// 1. initialize call was queued from global scope (inline cmpLoader)
	if (initIndex >= 0 && cmp.commandQueue[initIndex]) {
		const [{ parameter: config, callback }] = cmp.commandQueue.splice(
			initIndex,
			1
		); // remove "init" from command list because it doesn't exist
		initialize(config, callback);

		// 2. initialize call never queued, so initialize with default Config
	} else {
		initialize(defaultConfig, result => {
			const { errorMsg } = result;
			if (errorMsg) {
				log.debug(errorMsg);
				cmp('showConsentTool');
			}
		});
	}
})();
