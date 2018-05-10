// __cmp('setConsentUiCallback', callback) QUANTCAST
import cmpShim from "./embed";
import log from '../lib/log';
import {init} from '../lib/init';

let cmp = cmpShim;

const handleConsentResult = ({vendorListVersion: listVersion} = {}, {created, vendorListVersion} = {}) => {
	console.log("handleConsentResult", listVersion, created, vendorListVersion);
	/*
	if (!created) {
		log.debug('No consent data found. Showing consent tool');
		// cmp('showConsentTool');
	}
	else if (!listVersion) {
		log.debug('Could not determine vendor list version. Not showing consent tool');
	}
	else if (vendorListVersion !== listVersion) {
		log.debug(`Consent found for version ${vendorListVersion}, but received vendor list version ${listVersion}. Showing consent tool`);
		// cmp('showConsentTool');
	}
	else {
		log.debug('Consent found. Not showing consent tool');
	}
	*/
};

const checkConsent = () => {
	console.log("checkConsent", cmp.loaded);
	if (!cmp.loaded) {
		log.error('CMP failed to load');
		// @TODO need to resolve no consent
	} else if (!window.navigator.cookieEnabled) {
		log.warn('Cookies are disabled. Ignoring CMP consent check');
		// @TODO need to resolve no consent
	} else {
		console.log(1, cmp === window.cmp, window.cmp === window.__cmp);
		cmp('getVendorConsents', null, vendorConsents => {
			console.log("getVendorConsents", vendorConsents);
		});


		setTimeout(() => {
			console.log(2, cmp === window.cmp, window.cmp === window.__cmp);
			cmp('showConsentTool', null, vendorList => {
				console.log("showConsentTool", vendorList);

			});
		}, 2000);

		setTimeout(() => {
			console.log(3, cmp === window.cmp, window.cmp === window.__cmp);
			cmp('showConsentTool', null, vendorList => {
				console.log("showConsentTool", vendorList);

			});
		}, 4000);
	}
};

const initialize = (config, callback) => {
	console.log("initialize 1", cmp === window.__cmp, window.__cmp === window.cmp);
	init(config, cmp).then(() => {
		console.log("initialize 2", cmp === window.__cmp, window.__cmp === window.cmp, window.__cmp.loaded, window.cmp.loaded);
		cmp("ping");
		// cmp = window.__cmp; //
		checkConsent(); //

		if (callback && typeof callback === "function") {
			callback();
		}
		/// out of sync
	});
};

// initialize CMP
(() => {
	const initIndex = cmp.commandQueue.findIndex(({command}) => {
		return command === 'init';
	});

	// 1. initialize call was queued from global scope
	if (initIndex >= 0 && cmp.commandQueue[initIndex]) {
		const [{
			parameter: config,
			callback
		}] = cmp.commandQueue.splice(initIndex, 1); // remove "init" from command list
		initialize(config, callback);

	// 2. initialize call never queued, so initialize with default Config
	} else {
		initialize();
	}
})();
