import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import config from './config';
import log from './log';
import { sendPortalCommand } from './portal';

/**
 * Attempt to load the vendors list from the global location and
 * fallback to portal location.
 */
function fetchVendorList() {
	const {globalVendorListLocation, storeConsentGlobally, globalConsentLocation} = config;
	return (globalVendorListLocation ?
		fetch(globalVendorListLocation + ((globalVendorListLocation + '').indexOf('?') < 0 ? '?' : '&') + 'host=' + encodeURIComponent(window.location.hostname)) :
		Promise.reject('Missing globalVendorListLocation'))
		.then(res => res.json())
		.catch(err => {
			if (storeConsentGlobally && globalConsentLocation) {
				return sendPortalCommand({command: 'readVendorList'});
			}
			log.error(`Failed to load vendor list from ${globalVendorListLocation}`, err);
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
