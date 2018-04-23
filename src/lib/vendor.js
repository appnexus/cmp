import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import config from './config';
import log from './log';
import { sendPortalCommand } from './portal';

// Official global vendor list location:
const GLOBAL_VENDOR_LIST_LOCATION = 'https://vendorlist.consensu.org/vendorlist.json';

/**
 * Attempt to load the vendors list from the global location and
 * fallback to portal location.
 */
function fetchVendorList() {
	return fetch(GLOBAL_VENDOR_LIST_LOCATION)
		.then(res => res.json())
		.catch(() => {
			return sendPortalCommand({command: 'readVendorList'});
		});
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
