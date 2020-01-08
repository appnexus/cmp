import Promise from 'promise-polyfill';
import config from './config';
import log from './log';
import { sendPortalCommand } from './portal';


const PUB_VENDOR_LOCATION = '/.well-known/pubvendors.json';


function fetch(url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = () => {
			resolve({
				json: () => JSON.parse(xhr.responseText)
			});
		};
		xhr.onerror = () => {
			reject(new TypeError('Network request failed'));
		};
		xhr.ontimeout = () => {
			reject(new TypeError('Network request failed'));
		};
		xhr.open('GET', url, true);
		xhr.send(null);
	});
}


/**
 * Fetch the pubvendors.json from the local domain
 */
function fetchPubVendorList() {
	return fetch(PUB_VENDOR_LOCATION)
		.then(res => res.json())
		.catch(() => {});
}

/**
 * Fetch the global vendor list if the location is configured
 */
function fetchGlobalVendorList() {
	const {globalVendorListLocation, storeConsentGlobally, globalConsentLocation, getVendorList} = config;
	if (getVendorList) {
		return new Promise((resolve, reject) => {
			try {
				getVendorList((err, data) => {
					if (err) {
						reject(err);
					} else {
						try {
							resolve(data);
						} catch (err) {
							reject(err);
						}
					}
				});
			} catch (err) {
				reject(err);
			}
		}).catch(err => {
			log.error(`Failed to load global vendor list from configuration`, err);
		});
	}
	return (globalVendorListLocation ?
		fetch(globalVendorListLocation) :
		Promise.reject('Missing globalVendorListLocation'))
		.then(res => res.json())
		.catch(err => {
			log.error(`Failed to load global vendor list from ${globalVendorListLocation}`, err);
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
	fetchGlobalVendorList,
	fetchPubVendorList,
	fetchPurposeList
};
