import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';

import { h, render } from 'preact';
import Promise from 'promise-polyfill';
import Store from './lib/store';
import Cmp, { CMP_GLOBAL_NAME } from './lib/cmp';
import { readVendorConsentCookie, readPublisherConsentCookie } from './lib/cookie/cookie';
import { fetchVendorList, fetchPurposeList } from './lib/vendor';
import log from './lib/log';
import config from './lib/config';
import pack from '../package.json';


function init() {
	// Apply any valid config values set in the stub cmp
	const { config: configUpdates } = window[CMP_GLOBAL_NAME] || {};
	config.update(configUpdates);
	log.debug('Using configuration:', config);

	// Fetch all information we need to initialize
	Promise.all([
		readVendorConsentCookie(),
		fetchVendorList(),
		fetchPurposeList()
	])
		.then(([vendorConsentData, vendorList, customPurposeList]) => {

			// Load publisher consent data if we are storing it
			const publisherConsentData = config.storePublisherData ? readPublisherConsentCookie() : {};

			// Initialize the store with all of our consent data
			const store = new Store({ vendorConsentData, publisherConsentData, vendorList, customPurposeList });

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
