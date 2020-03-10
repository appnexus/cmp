import { h, render } from 'preact';
import Promise from 'promise-polyfill';
import Store from './store';
import Cmp, { CMP_GLOBAL_NAME } from './cmp';
import { TCString } from "@iabtcf/core";
import { CmpApi } from '@iabtcf/cmpapi';
import { fetchGlobalVendorList } from './vendor';
import { decodeConsentData, readConsentCookie } from './cookie/cookie';
import log from './log';
import pack from '../../package.json';
import config from './config';
import createCommands from "./commands";

const CMP_VERSION = 2;
const CMP_ID = 280;
const COOKIE_VERSION = 2;

function handleConsentResult(cmp, {isConsentToolShowing},
							 {vendorListVersion: listVersion, tcfPolicyVersion: listPolicyVersion = 1} = {},
							 {created, vendorListVersion, policyVersion: consentPolicyVersion = 1} = {}) {
	if (!created) {
		log.debug('No consent data found. Showing consent tool');
		config.autoDisplay && cmp('showConsentTool');
	} else if (!listVersion) {
		log.debug('Could not determine vendor list version. Not showing consent tool');
	} else if (vendorListVersion !== listVersion) {
		log.debug(`Consent found for version ${vendorListVersion}, but received vendor list version ${listVersion}. Showing consent tool`);
		config.autoDisplay && cmp('showConsentTool');
	} else if (consentPolicyVersion !== listPolicyVersion) {
		log.debug(`Consent found for policy ${consentPolicyVersion}, but received vendor list with policy ${consentPolicyVersion}. Showing consent tool`);
		config.autoDisplay && cmp('showConsentTool');
	} else {
		log.debug('Consent found. Not showing consent tool. Show footer when not all consents set to true');
		!isConsentToolShowing && config.autoDisplay && cmp('showFooter');
	}
}

function checkConsent(cmp, store) {
	if (!cmp) {
		log.error('CMP failed to load');
	}
	else if (!window.navigator.cookieEnabled) {
		log.warn('Cookies are disabled. Ignoring CMP consent check');
	}
	else {
		__tcfapi('getVendorList', 2,  (vendorList, success) => {
			if (success) {
				const timeout = setTimeout(() => {
					handleConsentResult(cmp, store, vendorList);
				}, 100);

				__tcfapi('getTCData', 2, (tcData, success) => {
					if (success) {
						let tcStringDecoded;

						try {
							tcStringDecoded = TCString.decode(tcData.tcString);
						} catch (e) {
							// error ocurred during decoding TCString
						} finally {
							clearTimeout(timeout);
							handleConsentResult(cmp, store, vendorList, tcStringDecoded);
						}
					}
				});
			}
		});
	}
}

function readExternalConsentData(config) {
	return new Promise((resolve, reject) => {
		try {
			config.getConsentData((err, data) => {
				if (err) {
					reject(err);
				} else {
					try {
						resolve(data.vendor && decodeConsentData(data.vendor) || undefined);
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

export function init(configUpdates) {
	config.update(configUpdates);
	log.debug('Using configuration:', config);
	// Fetch the current vendor consent before initializing
	return ((config.getConsentData) ? readExternalConsentData(config) : readConsentCookie())
		.then((consentData) => {
			const cmpApi = new CmpApi(CMP_ID, CMP_VERSION);

			// Initialize the store with all of our consent data
			const store = new Store({
				cmpVersion: CMP_VERSION,
				cmpId: CMP_ID,
				cookieVersion: COOKIE_VERSION,
				consentData,
				cmpApi
			});

			cmpApi.customCommands = createCommands(store);

			// Pull queued command from __cmp stub
			const {commandQueue = []} = window[CMP_GLOBAL_NAME] || {};

			// Replace the __cmp with our implementation
			const cmp = new Cmp(store);

			// Expose `processCommand` as the CMP implementation
			window[CMP_GLOBAL_NAME] = cmp.processCommand;

			// Notify listeners that the CMP is loaded
			log.debug(`Successfully loaded CMP version: ${pack.version}`);
			cmp.isLoaded = true;
			cmp.notify('isLoaded');
			// Render the UI
			const App = require('../components/app').default;
			render(<App store={store} notify={cmp.notify} />, document.body);

			// Execute any previously queued command
			cmp.commandQueue = commandQueue;
			cmp.processCommandQueue();

			let isConsentToolShowing = store.isConsentToolShowing;
			store.subscribe(store => {
				if (store.isConsentToolShowing !== isConsentToolShowing) {
					isConsentToolShowing = store.isConsentToolShowing;
					cmp.notify('onToggleConsentToolShowing', isConsentToolShowing);
				}
			});
			// Request lists
			return Promise.all([
				store,
				fetchGlobalVendorList().then(store.updateVendorList)
			]).then((params) => {
				cmp.cmpReady = true;
				cmp.notify('cmpReady');
				return params[0];
			}).catch(err => {
				log.error('Failed to load lists. CMP not ready', err);
			});
		})
		.catch(err => {
			log.error('Failed to load CMP', err);
		});
}

// Preserve any config options already set
const {config: configuration} = window[CMP_GLOBAL_NAME] || {};
const configUpdates = {
	globalConsentLocation: 'https://rasp.mgr.consensu.org/portal.html',
	...configuration
};

init(configUpdates).then((store) => checkConsent(window.__cmp, store));

