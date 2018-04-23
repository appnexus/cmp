import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import config from './config';
import log from './log';
import { sendPortalCommand } from './portal';

// Official global vendor list location:
// https://vendorlist.consensu.org/vendorlist.json

/**
 * Load the global vendor list using the "portal" for
 * cross domain communication.
 */
function fetchVendorList() {
	return sendPortalCommand({command: 'readVendorList'});
}

function fetchPurposeList() {
	if (!config.storePublisherData || !config.customPurposeListLocation) {
		return Promise.resolve();
	}

	return fetch(config.customPurposeListLocation, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(res => res.json())
		.catch(err => {
			log.error(`Failed to load custom purposes list from ${config.customPurposeListLocation}`, err);
		});
}

export {
	fetchVendorList,
	fetchPurposeList,
};
