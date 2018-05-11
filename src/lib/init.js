import { h, render } from 'preact';
import Promise from 'promise-polyfill';
import Store from './store';
import Cmp, { CMP_GLOBAL_NAME } from './cmp';
import { readVendorConsentCookie, readPublisherConsentCookie } from './cookie/cookie';
import { fetchPubVendorList, fetchGlobalVendorList, fetchPurposeList } from './vendor';
import log from './log';
import pack from '../../package.json';
import config from './config';

const CMP_VERSION = 1;
const CMP_ID = 1;
const COOKIE_VERSION = 1;

export function init(configUpdates, __cmp) {
	config.update(configUpdates);
	log.debug('Using configuration:', config);
	const startTime = Date.now();

	// Fetch the current vendor consent before initializing
	return Promise.all([
		readVendorConsentCookie(),
		fetchPubVendorList()
	])
		.then(([vendorConsentData, pubVendorsList]) => {
			const {vendors} = pubVendorsList || {};

			// Check config for allowedVendorIds then the pubVendorList
			const {allowedVendorIds: configVendorIds} = config;
			const allowedVendorIds = configVendorIds instanceof Array && configVendorIds.length ? configVendorIds :
				vendors && vendors.map(vendor => vendor.id);

			// Initialize the store with all of our consent data
			const store = new Store({
				cmpVersion: CMP_VERSION,
				cmpId: CMP_ID,
				cookieVersion: COOKIE_VERSION,
				vendorConsentData,
				publisherConsentData: readPublisherConsentCookie(),
				pubVendorsList,
				allowedVendorIds
			});

			// Pull queued command from __cmp stub
			const {commandQueue = []} = window[CMP_GLOBAL_NAME] || {};

			// Replace the __cmp with our implementation
			const cmp = new Cmp(store);

			// Expose `processCommand` as the CMP implementation
			// window[CMP_GLOBAL_NAME] = cmp.processCommand;
			__cmp.processCommand = cmp.processCommand;

			// Notify listeners that the CMP is loaded
			log.debug(`Successfully loaded CMP version: ${pack.version} in ${Date.now() - startTime}ms`);
			cmp.isLoaded = true;
			cmp.notify('isLoaded');

			// Render the UI
			const App = require('../components/app').default;
			render(<App store={store} notify={cmp.notify} />, document.body);


			// Execute any previously queued command
			cmp.commandQueue = commandQueue;
			cmp.processCommandQueue();

			// Request lists
			return Promise.all([
				fetchGlobalVendorList().then(store.updateVendorList),
				fetchPurposeList().then(store.updateCustomPurposeList)
			]).then(() => {
				cmp.cmpReady = true;
				cmp.notify('cmpReady');
			}).catch(err => {
				log.error('Failed to load lists. CMP not ready', err);
			});
		})
		.catch(err => {
			log.error('Failed to load CMP', err);
		});
}
