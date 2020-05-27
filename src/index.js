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
import { decodeConsentData, readConsentCookie, applyDecodeFix } from "./lib/cookie/cookie";
import {fetchGlobalVendorList} from "./lib/vendor";
import Promise from "promise-polyfill";

const TCF_CONFIG = '__tcfConfig';

const handleConsentResult = (...args) => {
	if (args.length < 2 || !config.autoDisplay) {
		return { display: false };
	}

	const [vendorList = {}, consentData = {}] = args;

	const {
		vendorListVersion: listVersion,
		tcfPolicyVersion: listPolicyVersion = 1
	} = vendorList;

	const {
		created,
		vendorListVersion,
		policyVersion: consentPolicyVersion = 1
	} = consentData;

	let displayOptions;

	if (!created) {
		log.debug('No consent data found. Showing consent tool');
		displayOptions = {display: true, command: 'showConsentTool'};
	} else if (!listVersion) {
		log.debug('Could not determine vendor list version. Not showing consent tool');
		displayOptions = { display: false };
	} else if (vendorListVersion !== listVersion) {
		log.debug(`Consent found for version ${vendorListVersion}, but received vendor list version ${listVersion}. Showing consent tool`);
		displayOptions = {display: true, command: 'showConsentTool'};
	} else if (consentPolicyVersion !== listPolicyVersion) {
		log.debug(`Consent found for policy ${consentPolicyVersion}, but received vendor list with policy ${consentPolicyVersion}. Showing consent tool`);
		displayOptions = {display: true, command: 'showConsentTool'};
	} else {
		log.debug('Consent found. Not showing consent tool. Show footer when not all consents set to true');
		displayOptions = {display: false, command: 'showFooter'};
	}

	return displayOptions;
};


const shouldDisplay = () => {
	return new Promise((resolve) => {
		if (!window.navigator.cookieEnabled) {
			const msg = 'Cookies are disabled. Ignoring CMP consent check';
			log.warn(msg);
			const result = handleConsentResult();
			resolve(result);
		} else {
			const finish = (timeout, vendorList, consentData) => {
				clearTimeout(timeout);
				const result = handleConsentResult(vendorList, consentData);
				resolve(result);
			};

			const { getVendorList, getConsentData, getConsentDataTimeout } = config;
			if (getVendorList) {
				getVendorList((err, vendorList) => {
					if (err) {
						log.error('Failed to get vendor list');
						const result = handleConsentResult();
						resolve(result);
					} else {
						const timeout = setTimeout(() => {
							resolve({ display: false });
						}, getConsentDataTimeout);

						if (getConsentData) {
							getConsentData((err, data) => {
								if (err) {
									finish(timeout, vendorList);
								} else {
									try {
										const tcStringDecoded = decodeConsentData(data.consent);
										finish(timeout, vendorList, tcStringDecoded);
									} catch (e) {
										finish(timeout, vendorList);
									}
								}
							});
						}
					}
				});
			} else {
				fetchGlobalVendorList().then((vendorList) => {
					const timeout = setTimeout(() => {
						const result = handleConsentResult(vendorList, undefined);
						resolve(result);
					}, 100);

					readConsentCookie().then((cookie) => {
						if (cookie) {
							try {
								const tcStringDecoded = decodeConsentData(cookie);
								finish(timeout, vendorList, tcStringDecoded);
							} catch (e) {
								finish(timeout, vendorList);
							}
						} else {
							finish(timeout, vendorList);
						}
					});
				}).catch(() => {
					const result = handleConsentResult();
					resolve(result);
				});
			}
		}
	});
};

const displayUI = (tcfApi, result) => {
	if (!tcfApi) {
		return;
	}

	const { shouldDisplayFooter } = config;
	let { display, command } = result;

	const tcfApiCall = (command) => {
		tcfApi(command, 2, () => log.debug(`${command} command was called`));
	};

	if (display) {
		tcfApiCall(command);
	} else if (command === 'showFooter') {
		if (shouldDisplayFooter) {
			shouldDisplayFooter((result) => {
				if (result) {
					tcfApiCall(command);
				}
			});
		}
	}
};

function readExternalConsentData(config) {
	return new Promise((resolve, reject) => {
		try {
			config.getConsentData((err, data) => {
				if (err) {
					reject(err);
				} else {
					try {
						resolve(data.consent && data.consent || undefined);
					} catch (err) {
						reject(err);
					}
				}
			});
		} catch (err) {
			reject(err);
		}
	});
}

function start() {
	applyDecodeFix();

	// Preserve any config options already set
	const tcfConfig = window[TCF_CONFIG] || {};

	const configUpdates = {
		globalConsentLocation: 'https://rasp.mgr.consensu.org/portal.html',
		...tcfConfig
	};

	config.update(configUpdates);

	Promise.all([
		shouldDisplay(),
		config.getConsentData ? readExternalConsentData(config) : readConsentCookie()
	]).then(([displayOptions, consentString]) => {
		initializeStore(consentString, displayOptions.display).then(() => {
			displayUI(window.__tcfapi, displayOptions);
		}).catch(err => {
			log.error('Failed to initialize CMP store', err);
		});
	}).catch(err => {
		log.error('Failed to load CMP', err);
	});
}

start();
