import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import config from './config';
import log from './log';
import { sendPortalCommand } from './portal';

const LOCAL_VENDOR_LIST_LOCATION = `//${window.location.host}/cmp/vendors.json`;

function fetchVendorList() {
	if (config.storeConsentGlobally && config.globalConsentLocation) {
		return sendPortalCommand({command: 'readVendorList'});
	}

	return fetch(LOCAL_VENDOR_LIST_LOCATION).then(res => res.json())
		.catch(err => {
			log.error(`Failed to load vendors list from ${LOCAL_VENDOR_LIST_LOCATION}`, err);
		});
}

function fetchPurposeList() {
	if (!config.storePublisherData || !config.customPurposeListLocation) {
		return Promise.resolve();
	}

	return fetch(config.customPurposeListLocation)
		.then(res => res.json())
		.catch(err => {
			log.error(`Failed to load custom purposes list from ${config.customPurposeListLocation}`, err);
		});
}

export {
	fetchVendorList,
	fetchPurposeList,
};
