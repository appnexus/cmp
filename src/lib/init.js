import { h, render } from 'preact';
import Promise from 'promise-polyfill';
import Store from './store';
import { CmpApi } from '@iabtcf/cmpapi';
import { fetchGlobalVendorList } from './vendor';
import log from './log';
import pack from '../../package.json';
import config from './config';
import createCommands from "./commands";
import CmpManager from "./cmpManager";

export const CMP_VERSION = parseInt(process.env.CMP_VERSION, 10);
export const CMP_ID = parseInt(process.env.CMP_ID, 10);
export const COOKIE_VERSION = parseInt(process.env.COOKIE_VERSION, 10);

export function init (consents, shouldDisplayCmpUI) {
	return new Promise((resolve, reject) => {
		let { consent, pubConsent: { customVendorsConsent = 0 } } = consents;
		customVendorsConsent = parseInt(customVendorsConsent, 10);
		const store = new Store({
			cmpVersion: CMP_VERSION,
			cmpId: CMP_ID,
			cookieVersion: COOKIE_VERSION,
			consentString: consent,
			customVendorsConsent
		});

		const cmpManager = new CmpManager();
		const commands = createCommands(store, cmpManager);

		const cmpApi = new CmpApi(CMP_ID, CMP_VERSION, true, commands);

		cmpApi.callResponder.purgeQueuedCalls = function () {
			if (this.queuedCalls) {
				const apiCall = this.apiCall.bind(this);
				const queuedCalls = this.queuedCalls;
				this.queuedCalls = [];
				queuedCalls.forEach(args => {
					const [command, version, callback, params] = args;
					if (params !== undefined) {
						apiCall(command, version, callback, ...params);
					} else {
						apiCall(command, version, callback);
					}
				});
			}
		};

		if (config.decoratePageCallHandler) {
			config.decoratePageCallHandler(cmpApi);
		}

		store.setCmpApi(cmpApi, shouldDisplayCmpUI);

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
			cmpManager.notify('cmpReady', true);
			resolve(params[0]);
		}).catch(err => {
			log.error('Failed to load lists. CMP not ready', err);
			cmpManager.cmpReady = true;
			cmpManager.notify('cmpReady', false);
			reject(err);
		});
	});
}
