import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';

import { h, render } from 'preact';
import Promise from 'promise-polyfill';
import Store from './lib/store';
import Cmp, { CMP_GLOBAL_NAME } from './lib/cmp';
import { readVendorConsentCookie, readPublisherConsentCookie, writeGlobalVendorConsentCookie } from './lib/cookie/cookie';
import { fetchVendorList, fetchPurposeList } from './lib/vendor';
import log from './lib/log';
import config from './lib/config';
import pack from '../package.json';

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2]);
}

function init() {
	// Apply any valid config values set in the stub cmp
	const { config: configUpdates } = window[CMP_GLOBAL_NAME] || {};
	config.update(configUpdates);

	const base64 = getParameterByName('code64');
	if (base64) {
		writeGlobalVendorConsentCookie(base64, true);
	}

	log.debug('Using configuration:', config);


	// Fetch the current vendor consent before initializing
	readVendorConsentCookie()
		.then(vendorConsentData => {

			// Load publisher consent data if we are storing it
			const publisherConsentData = config.storePublisherData ? readPublisherConsentCookie() : {};

			
			// AT-637 Overriding default settings
			// const store = new Store({
			// 	vendorConsentData: {
			// 		selectedVendorIds: new Set([4, 5]),
			// 		selectedPurposeIds: new Set([1, 4])
			// 	},
			// 	publisherConsentData, vendorList, customPurposeList
			// });

			// Initialize the store with all of our consent data
			const store = new Store({ vendorConsentData, publisherConsentData });

			// Request lists
			fetchVendorList().then(store.updateVendorList);
			fetchPurposeList().then(store.updateCustomPurposeList);

			// Pull queued command from __cmp stub
			const { commandQueue = [] } = window[CMP_GLOBAL_NAME] || {};

			// Replace the __cmp with our implementation
			const cmp = new Cmp(store);

			// Expose `processCommand` as the CMP implementation
			window[CMP_GLOBAL_NAME] = cmp.processCommand;

			// Execute any previously queued command
			commandQueue.forEach(({ callId, command, parameter, callback, event }) => {
				// If command is queued with an event we will relay its result via postMessage
				if (event) {
					cmp.processCommand(command, parameter, result =>
						event.source.postMessage(JSON.stringify({
							[CMP_GLOBAL_NAME]: {
								callId,
								command,
								result
							}
						}), event.origin));
				}
				else {
					cmp.processCommand(command, parameter, callback);
				}
			});

			// Render the UI
			const App = require('./components/app').default;
			render(<App store={store} notify={cmp.notify} />, document.body);

			// Notify listeners that the CMP is loaded
			log.debug(`Successfully loaded CMP version: ${pack.version}`);
			cmp.notify('isLoaded');
		})
		.catch(err => {
			log.error('Failed to load vendors.json', err);
		});
}


// in development, set up HMR:
if (module.hot) {
	module.hot.accept('./components/app', () => requestAnimationFrame(init));
}

init();
