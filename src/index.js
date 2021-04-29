import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/includes';
import 'core-js/fn/object/values';
import 'core-js/fn/map';
import 'core-js/fn/set';
import 'core-js/fn/number/is-integer';
import 'core-js/fn/symbol';
import 'core-js/fn/string/repeat';
import { init as initializeStore } from './lib/init';
import log from './lib/log';
import config from './lib/config';
import { decodeConsentData, readConsentCookie, applyDecodeFix } from './lib/cookie/cookie';
import { fetchGlobalVendorList } from './lib/vendor';
import { translations } from './lib/translations';
import Promise from 'promise-polyfill';

const TCF_CONFIG = '__tcfConfig';

const queryStringToObject = str => {
	return ((str || '') + '').split('&').reduce((acc, curr) => {
		const pair = curr.split('=');
		if (pair.length > 1) {
			acc[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
		}
		return acc;
	}, {});
};

const parsePubConsent = pubConsent => queryStringToObject(decodeURIComponent(pubConsent));

const handleConsentResult = (...args) => {
	if (args.length < 2 || !config.autoDisplay) {
		return { display: false };
	}

	const [vendorList = {}, consentData = {}, pubConsent = {}] = args;

	const {
		publicationVersion: pubVersion,
		vendorListVersion: listVersion,
		tcfPolicyVersion: listPolicyVersion = 1
	} = vendorList;

	const {
		created,
		vendorListVersion,
		policyVersion: consentPolicyVersion = 1
	} = consentData;

	const { publicationVersion } = pubConsent;

	if (!created) {
		log.debug('No consent data found. Showing consent tool');
		return { display: true, command: 'showConsentTool' };
	}
	if (!listVersion && !pubVersion) {
		log.debug('Could not determine vendor list version. Not showing consent tool');
		return { display: false };
	}
	if (pubVersion && parseInt(pubVersion, 10) !== parseInt(publicationVersion, 10)) {
		log.debug(`Consent found for publication version ${publicationVersion}, but received vendor list version ${pubVersion}. Showing consent tool`);
		return { display: true, command: 'showConsentTool' };
	}
	if (vendorListVersion !== listVersion) {
		log.debug(`Consent found for version ${vendorListVersion}, but received vendor list version ${listVersion}. Showing consent tool`);
		return { display: true, command: 'showConsentTool' };
	}
	if (consentPolicyVersion !== listPolicyVersion) {
		log.debug(`Consent found for policy ${consentPolicyVersion}, but received vendor list with policy ${consentPolicyVersion}. Showing consent tool`);
		return { display: true, command: 'showConsentTool' };
	}

	log.debug('Consent found. Not showing consent tool. Show footer when not all consents set to true');
	return { display: false, command: 'showFooter' };
};


const shouldDisplay = () => {
	return new Promise((resolve) => {
		let translationFetched = false;
		if (!window.navigator.cookieEnabled) {
			const msg = 'Cookies are disabled. Ignoring CMP consent check';
			log.warn(msg);
			const result = handleConsentResult();
			resolve({ ...result, translationFetched });
		} else {
			const finish = (timeout, vendorList, consentData, pubConsent) => {
				clearTimeout(timeout);
				const result = handleConsentResult(vendorList, consentData, pubConsent);
				resolve({ ...result, translationFetched });
			};

			const { getVendorList, getConsentData, getConsentDataTimeout } = config;
			if (getVendorList) {
				getVendorList((err, vendorList) => {
					if (err) {
						log.error('Failed to get vendor list');
						const result = handleConsentResult();
						resolve(result);
					} else {
						translations.initConfig(vendorList.translations);
						translations.fetchTranslation()
							.then(() => {
								translationFetched = true;
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
												const pubConsent = parsePubConsent(data.pubConsent);
												finish(timeout, vendorList, tcStringDecoded, pubConsent);
											} catch (e) {
												finish(timeout, vendorList);
											}
										}
									});
								}
							})
							.catch(() => {
								const result = handleConsentResult();
								resolve({ ...result, translationFetched });
							});
					}
				});
			} else {
				fetchGlobalVendorList().then((vendorList) => {
					const timeout = setTimeout(() => {
						resolve({ display: false });
					}, getConsentDataTimeout);

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
						const result = {
							consent: data && data.consent,
							pubConsent: parsePubConsent(data && data.pubConsent)
						};
						resolve(result);
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
	]).then(([displayOptions, consents]) => {
		initializeStore(consents, displayOptions).then(() => {
			displayUI(window.__tcfapi, displayOptions);
		}).catch(err => {
			log.error('Failed to initialize CMP store', err);
		});
	}).catch(err => {
		log.error('Failed to load CMP', err);
	});
}

start();
