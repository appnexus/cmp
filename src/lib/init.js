import { h, render } from 'preact';
import Promise from 'promise-polyfill';
import Store from './store';
import Cmp, { CMP_GLOBAL_NAME } from './cmp';
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

function readExternalConsentData(config) {
	return new Promise((resolve, reject) => {
		try {
			config.getConsentData((err, data) => {
				if (err) {
					reject(err);
				} else {
					try {
						resolve(data.consent && decodeConsentData(data.consent) || undefined);
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

export function init (configUpdates) {
	config.update(configUpdates);
	log.debug('Using configuration:', config);

	// Fetch the current vendor consent before initializing
	return ((config.getConsentData) ? readExternalConsentData(config) : readConsentCookie())
		.then((consentData) => {
			const store = new Store({
				cmpVersion: CMP_VERSION,
				cmpId: CMP_ID,
				cookieVersion: COOKIE_VERSION,
				consentData,
			});

			const cmpApi = new CmpApi(CMP_ID, CMP_VERSION, createCommands(store));

			store.setCmpApi(cmpApi);

			if (config.decoratePageCallHandler) {
				config.decoratePageCallHandler(CmpApi, cmpApi);
			}

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
