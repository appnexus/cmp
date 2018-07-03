import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import config from './config';
import log from './log';

/**
 * Fetch the pubvendors.json from the local domain
 */
function fetchPubVendorList() {
	const {pubVendorListLocation} = config;
	if (!pubVendorListLocation) {
		return Promise.resolve();
	}
	return fetch(pubVendorListLocation)
		.then(res => res.json())
		.catch(() => {});
}

/**
 * Fetch the global vendor list if the location is configured
 */
function fetchGlobalVendorList() {
	const {globalVendorListLocation} = config;

	return (globalVendorListLocation ?
		fetch(globalVendorListLocation) :
		Promise.reject('Missing globalVendorListLocation'))
		.then(res => res.json())
		.catch(() => {
			log.error(`Failed to load global vendor list from: ${globalVendorListLocation}`);
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
	fetchGlobalVendorList,
	fetchPubVendorList,
	fetchPurposeList
};
