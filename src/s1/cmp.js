// __cmp('setConsentUiCallback', callback) QUANTCAST
import 'core-js/fn/array/find-index';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/from';
import 'core-js/fn/array/find';
import 'core-js/fn/array/map';
import 'core-js/fn/object/keys';
import 'core-js/fn/promise';

import cmp from './loader';
import { init } from '../lib/init';
import log, { track } from '../lib/log';
import { readCookie, writeCookie } from '../lib/cookie/cookie';

const GDPR_OPT_IN_COOKIE = 'gdpr_opt_in';
const GDPR_OPT_IN_COOKIE_MAX_AGE = 33696000;

const defaultConfig = {
	logging: false,
	shouldAutoConsent: false,
	shouldAutoConsentWithFooter: false,
	shouldAutoUpgradeConsent: true, // if user has previously consented, but GVL changes, re-auto-consent with footer
};

let performanceTimer;

cmp('addEventListener', 'onShowConsentTool', () => {
	track('CMPShowConsentTool');
});

const addLocatorFrame = () => {
	if (!window.frames['__cmpLocator']) {
		if (document.body) {
			const frame = document.createElement('iframe');
			frame.style.display = 'none';
			frame.name = '__cmpLocator';
			document.body.appendChild(frame);
		} else {
			setTimeout(addLocatorFrame, 5);
		}
	}
};

const addPostmessageReceiver = (cmp) => {
	const onReceiveMessage = (event) => {
		const data = event && event.data && event.data.__cmpCall;
		if (data) {
			const { command, parameter } = data;
			cmp.call(this, command, parameter);
		}
	};

	const listen = window.attachEvent || window.addEventListener;
	listen('message', onReceiveMessage, false);
};

const initialize = (config, callback) => {
	// storeConsentGlobally will fail to store cookie if third party cookies are disabled
	// TODO: check to see if 3rdpartycookies are enabled and force the user into storeConsentLocally if so
	// https://github.com/mindmup/3rdpartycookiecheck

	performanceTimer = new Date();
	track('CMPInit', {
		shouldAutoConsent: config.shouldAutoConsent,
	});

	const callBackWithTracking = (result) => {
		const {
			vendorList: { vendorListVersion = 0 } = {},
			vendorConsentData: { vendorListVersion: vendorConsentListVersion = 0 } = {},
		} = result;

		track('CMPInitComplete', {
			hasConsented: result.hasConsented,
			hasConsentChanged: result.hasConsented !== result.hasConsentedCookie,
			errorMessage: result.errorMsg,
			warningMessage: result.warningMsg,
			shouldAutoConsent: config.shouldAutoConsent,
			shouldAutoUpgrade: config.shouldAutoUpgradeConsent,
			vendorListVersion,
			vendorConsentVersion: vendorConsentListVersion,
			timingMs: new Date() - performanceTimer,
		});

		if (callback && typeof callback === 'function') {
			callback(result);
		}
	};

	init(config, cmp).then(() => {
		addPostmessageReceiver(cmp);
		addLocatorFrame();

		cmp('addEventListener', 'onSubmit', () => {
			checkConsent({
				isOnSubmit: true,
			});
		});

		checkConsent({
			callback: callBackWithTracking,
			config,
		});
	});
};

const checkHasConsentedAll = ({ vendors = [] }, { allowedVendorIds, purposeConsents, vendorConsents } = {}) => {
	const filteredVendors =
		allowedVendorIds && allowedVendorIds.size ? vendors.filter(({ id }) => allowedVendorIds.has(id)) : vendors;
	const hasAnyVendorsDisabled = filteredVendors.find(({ id }) => vendorConsents[id] === false);
	const hasAnyPurposeDisabled = Object.keys(purposeConsents).find((key) => {
		return purposeConsents[key] === false;
	});
	return !hasAnyPurposeDisabled && !hasAnyVendorsDisabled;
};

const checkConsent = ({ callback = () => {}, config, warningMsg = '', isOnSubmit = false } = {}) => {
	let errorMsg = '';
	if (!cmp.isLoaded) {
		errorMsg = 'CMP failed to load';
		log.error(errorMsg);
		handleConsentResult({
			errorMsg,
			warningMsg,
			isOnSubmit,
		});
	} else if (!window.navigator.cookieEnabled) {
		errorMsg = 'Cookies are disabled. Ignoring CMP consent check';
		log.error(errorMsg);
		handleConsentResult({
			errorMsg,
			warningMsg,
			isOnSubmit,
		});
	} else {
		cmp('getVendorList', null, (vendorList) => {
			cmp('getVendorConsents', null, (vendorConsentData) => {
				handleConsentResult({
					vendorList,
					vendorConsentData,
					callback,
					config,
					warningMsg,
					isOnSubmit,
				});
			});
		});
	}
};

const handleConsentResult = ({
	vendorList = {},
	vendorConsentData = {},
	callback,
	config,
	warningMsg = '',
	errorMsg = '',
	isOnSubmit = false,
}) => {
	const hasConsentedCookie = Boolean(parseInt(readCookie(GDPR_OPT_IN_COOKIE) || 0, 10));
	const { vendorListVersion: listVersion } = vendorList;
	const { created, vendorListVersion } = vendorConsentData;

	const autoConsentFlow = (shouldAutoConsentWithFooter, warningMsg = '') => {
		cmp('acceptAllConsents');
		if (shouldAutoConsentWithFooter) {
			cmp('showConsentTool');
		}
		checkConsent({
			callback,
			warningMsg,
		});
	};

	const { shouldAutoConsent, shouldAutoConsentWithFooter, shouldAutoUpgradeConsent } = config || {};

	if (!created) {
		if (shouldAutoConsent || shouldAutoConsentWithFooter) {
			log.debug('CMP: auto-consent to all conditions.');
			autoConsentFlow(shouldAutoConsentWithFooter);
			return;
		}
		errorMsg = 'No consent data found. Show consent tool';
	} else if (vendorListVersion !== listVersion) {
		if (shouldAutoUpgradeConsent) {
			warningMsg = `Consent found for version ${vendorListVersion}, but received vendor list version ${listVersion}. Consent upgraded, show consent notice`;
			log.debug(warningMsg);
			autoConsentFlow(true, warningMsg);
			return;
		}
		errorMsg = `Consent found for version ${vendorListVersion}, but received vendor list version ${listVersion}. Show consent tool`;
	} else if (!listVersion) {
		errorMsg = 'Could not determine vendor list version. Not showing consent tool';
	}

	if (errorMsg) {
		log.debug(errorMsg);
	}

	if (callback && typeof callback === 'function') {
		// store as 1 or 0
		const hasConsented = checkHasConsentedAll(vendorList, vendorConsentData);
		if (created) {
			writeCookie(GDPR_OPT_IN_COOKIE, hasConsented ? '1' : '0', GDPR_OPT_IN_COOKIE_MAX_AGE);
		}
		const consent = {
			consentRequired: true,
			gdprApplies: true,
			hasConsented,
			hasConsentedCookie,
			vendorList,
			vendorConsentData,
			errorMsg,
			warningMsg,
		};

		if (created && hasConsented !== hasConsentedCookie && !errorMsg) {
			cmp.notify('onConsentChanged', consent);
		}

		if (isOnSubmit) {
			track('CMPOnSubmit', {
				hasConsented,
				hasConsentChanged: hasConsented !== hasConsentedCookie,
			});
		}

		callback(consent);
	}
};

// initialize CMP
(() => {
	const initIndex =
		cmp.commandQueue &&
		cmp.commandQueue.findIndex(({ command }) => {
			return command === 'init';
		});

	// 1. initialize call was queued from global scope (inline cmpLoader)
	if (initIndex >= 0 && cmp.commandQueue[initIndex]) {
		const [{ parameter: config, callback }] = cmp.commandQueue.splice(initIndex, 1); // remove "init" from command list because it doesn't exist
		initialize(
			{
				...defaultConfig,
				...config,
			},
			callback
		);

		// 2. initialize call never queued, so initialize with default Config
	} else {
		initialize(defaultConfig, (result) => {
			const { errorMsg } = result;
			if (errorMsg) {
				log.debug(errorMsg);
				cmp('showConsentTool');
			}
		});
	}
})();
