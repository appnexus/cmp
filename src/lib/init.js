import { h, render } from 'preact';
import Promise from 'promise-polyfill';
import Store from './store';
import { CmpApi } from '@iabtcf/cmpapi';
import { fetchGlobalVendorList } from './vendor';
import { decodeConsentData, readConsentCookie } from './cookie/cookie';
import log from './log';
import pack from '../../package.json';
import config from './config';
import createCommands from "./commands";
import CmpManager from "./cmpManager";

export const CMP_VERSION = parseInt(process.env.CMP_VERSION,10);
export const CMP_ID = parseInt(process.env.CMP_ID, 10);
export const COOKIE_VERSION = parseInt(process.env.COOKIE_VERSION, 10);

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

			const cmpManager = new CmpManager();
			const cmpApi = new CmpApi(CMP_ID, CMP_VERSION, createCommands(store, cmpManager));

			if (config.decoratePageCallHandler) {
				config.decoratePageCallHandler(cmpApi);
			}

			store.setCmpApi(cmpApi);

			// Notify listeners that the CMP is loaded
			log.debug(`Successfully loaded CMP version: ${pack.version}`);
			cmpManager.isLoaded = true;
			cmpManager.notify('isLoaded');

			// Render the UI
			const App = require('../components/app').default;
			render(<App store={store} notify={cmpManager.notify} />, document.body);

			let isConsentToolShowing = store.isConsentToolShowing;
			store.subscribe(store => {
				if (store.isConsentToolShowing !== isConsentToolShowing) {
					isConsentToolShowing = store.isConsentToolShowing;
					cmpManager.notify('onToggleConsentToolShowing', isConsentToolShowing);
				}
			});

			// Request lists
			return Promise.all([
				store,
				fetchGlobalVendorList().then(store.updateVendorList)
			]).then((params) => {
				cmpManager.cmpReady = true;
				cmpManager.notify('cmpReady');
				return params[0];
			}).catch(err => {
				log.error('Failed to load lists. CMP not ready', err);
			});
		})
		.catch(err => {
			log.error('Failed to load CMP', err);
		});
}
