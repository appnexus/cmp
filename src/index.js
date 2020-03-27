import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';
import 'core-js/fn/set';
import 'core-js/fn/number/is-integer';
import 'core-js/es6/symbol';
import 'core-js/fn/string/repeat';
import { init as initializeStore } from './lib/init';
import log from "./lib/log";
import config from "./lib/config";
import { decodeConsentData, readConsentCookie } from "./lib/cookie/cookie";
import {fetchGlobalVendorList} from "./lib/vendor";

const TCF_CONFIG = '__tcfConfig';

const handleConsentResult = (tcfApi, vendorList, consentData = {}) => {
	const {
		vendorListVersion: listVersion,
		tcfPolicyVersion: listPolicyVersion = 1
	} = vendorList;

	const {
		created,
		vendorListVersion,
		policyVersion: consentPolicyVersion = 1
	} = consentData;

	let displayOptions = {};

	if (!config.autoDisplay) {
		return { display: false };
	}

	if (!created) {
		log.debug('No consent data found. Showing consent tool');
		displayOptions = {display: true, fn: 'showConsentTool'};
	} else if (!listVersion) {
		log.debug('Could not determine vendor list version. Not showing consent tool');
		displayOptions = { display: false };
	} else if (vendorListVersion !== listVersion) {
		log.debug(`Consent found for version ${vendorListVersion}, but received vendor list version ${listVersion}. Showing consent tool`);
		displayOptions = {display: true, fn: 'showConsentTool'};
	} else if (consentPolicyVersion !== listPolicyVersion) {
		log.debug(`Consent found for policy ${consentPolicyVersion}, but received vendor list with policy ${consentPolicyVersion}. Showing consent tool`);
		displayOptions = {display: true, fn: 'showConsentTool'};
	} else {
		log.debug('Consent found. Not showing consent tool. Show footer when not all consents set to true');
		displayOptions = {display: false, fn: 'showFooter'};
	}

	return  displayOptions;
};


const shouldDisplay = (tcfApi) => {
	return new Promise((resolve, reject) => {
		if (!tcfApi) {
			const msg = 'CMP failed to load';
			log.error(msg);
			reject(msg);
		} else if (!window.navigator.cookieEnabled) {
			const msg = 'Cookies are disabled. Ignoring CMP consent check';
			log.warn(msg);
			reject(msg);
		} else {
			const finish = (timeout, consentData = {}, vendorList) => {
				clearTimeout(timeout);
				const result = handleConsentResult(tcfApi, vendorList, consentData);
				resolve(result);
			};

			const { getVendorList, getConsentData } = config;
			if (getVendorList) {
				getVendorList((err, vendorList) => {
					if (err) {
						log.error('Failed to get vendor list');
						reject(err);
					} else {
						const timeout = setTimeout(() => {
							handleConsentResult(tcfApi, vendorList);
						}, 100);

						if (getConsentData) {
							getConsentData((err, data) => {
								if (err) {
									resolve(timeout);
								} else {
									try {
										const tcStringDecoded = decodeConsentData(data.consent);
										finish(timeout, tcStringDecoded, vendorList);
									} catch (e) {
										finish(timeout);
									}
								}
							});
						}
					}
				});
			} else {
				fetchGlobalVendorList().then((vendorList) => {
					const timeout = setTimeout(() => {
						handleConsentResult(tcfApi, vendorList);
					}, 100);

					readConsentCookie().then((cookie) => {
						if (cookie) {
							try {
								const tcStringDecoded = decodeConsentData(cookie);
								finish(timeout, tcStringDecoded, vendorList);
							} catch (e) {
								finish(timeout);
							}
						}
					});
				});
			}
		}
	});
};

const displayUI = (tcfApi, result, store) => {
	const { isConsentToolShowing } = store;
	let { display, fn } = result;

	const tcfApiCall = (command) => {
		tcfApi(command, 2, () => log.debug(`${command} command was called`));
	};

	if (display) {
		tcfApiCall(fn);
	} else if (fn === 'showFooter') {
		!isConsentToolShowing && tcfApiCall(fn);
	}
};

function start() {
	// Preserve any config options already set
	const tcfConfig = window[TCF_CONFIG] || {};

	const configUpdates = {
		globalConsentLocation: 'https://rasp.mgr.consensu.org/portal.html',
		...tcfConfig
	};

	config.update(configUpdates);

	shouldDisplay(window.__tcfapi)
		.then(result => {
			initializeStore(result.display)
				.then(store => {
					displayUI(window.__tcfapi, result, store);
				}).catch(e => {
					log.debug(e);
				});
		})
		.catch((e) => {
			log.debug(e);
		});
}

start();
