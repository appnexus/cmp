import Promise from 'promise-polyfill';
import log from '../log';
import {
	padRight,
	encodeVendorCookieValue,
	decodeVendorCookieValue,
	encodePublisherCookieValue,
	decodePublisherCookieValue
} from './cookieutils';

import { sendPortalCommand } from '../portal';
import pack from '../../../package.json';
import config from '../config';

const PUBLISHER_CONSENT_COOKIE_NAME = 'pubconsent';
const PUBLISHER_CONSENT_COOKIE_MAX_AGE = 33696000;

const VENDOR_CONSENT_COOKIE_NAME = 'euconsent';
const VENDOR_CONSENT_COOKIE_MAX_AGE = 33696000;


function encodeVendorIdsToBits(maxVendorId, selectedVendorIds = new Set()) {
	let vendorString = '';
	for (let id = 1; id <= maxVendorId; id++) {
		vendorString += (selectedVendorIds.has(id) ? '1' : '0');
	}
	return padRight(vendorString, Math.max(0, maxVendorId - vendorString.length));
}

function encodePurposeIdsToBits(purposes, selectedPurposeIds = new Set()) {
	const maxPurposeId = Math.max(0,
		...purposes.map(({id}) => id),
		...Array.from(selectedPurposeIds));
	let purposeString = '';
	for (let id = 1; id <= maxPurposeId; id++) {
		purposeString += (selectedPurposeIds.has(id) ? '1' : '0');
	}
	return purposeString;
}

function decodeBitsToIds(bitString) {
	return bitString.split('').reduce((acc, bit, index) => {
		if (bit === '1') {
			acc.add(index + 1);
		}
		return acc;
	}, new Set());
}

function convertVendorsToRanges(maxVendorId, selectedIds) {
	let range = [];
	const ranges = [];
	for (let id = 1; id <= maxVendorId; id++) {
		if (selectedIds.has(id)) {
			range.push(id);
		}

		// If the range has ended or at the end of vendors add entry to the list
		if ((!selectedIds.has(id) || id === maxVendorId) && range.length) {
			const startVendorId = range.shift();
			const endVendorId = range.pop();
			range = [];
			ranges.push({
				isRange: typeof endVendorId === 'number',
				startVendorId,
				endVendorId
			});
		}
	}
	return ranges;
}

function encodeVendorConsentData(vendorData) {
	const {vendorList = {}, selectedPurposeIds, selectedVendorIds, maxVendorId} = vendorData;
	const {purposes = []} = vendorList;

	// Encode the data with and without ranges and return the smallest encoded payload
	const noRangesData = encodeVendorCookieValue({
		...vendorData,
		maxVendorId,
		purposeIdBitString: encodePurposeIdsToBits(purposes, selectedPurposeIds),
		isRange: false,
		vendorIdBitString: encodeVendorIdsToBits(maxVendorId, selectedVendorIds)
	});

	const vendorRangeList = convertVendorsToRanges(maxVendorId, selectedVendorIds);
	const rangesData = encodeVendorCookieValue({
		...vendorData,
		maxVendorId,
		purposeIdBitString: encodePurposeIdsToBits(purposes, selectedPurposeIds),
		isRange: true,
		defaultConsent: false,
		numEntries: vendorRangeList.length,
		vendorRangeList
	});

	return noRangesData.length < rangesData.length ? noRangesData : rangesData;
}

function decodeVendorConsentData(cookieValue) {
	const {
		cookieVersion,
		cmpId,
		cmpVersion,
		consentScreen,
		consentLanguage,
		vendorListVersion,
		purposeIdBitString,
		maxVendorId,
		created,
		lastUpdated,
		isRange,
		defaultConsent,
		vendorIdBitString,
		vendorRangeList
	} = decodeVendorCookieValue(cookieValue);

	const cookieData = {
		cookieVersion,
		cmpId,
		cmpVersion,
		consentScreen,
		consentLanguage,
		vendorListVersion,
		selectedPurposeIds: decodeBitsToIds(purposeIdBitString),
		maxVendorId,
		created,
		lastUpdated
	};

	if (isRange) {
		const idMap = vendorRangeList.reduce((acc, {isRange, startVendorId, endVendorId}) => {
			const lastVendorId = isRange ? endVendorId : startVendorId;
			for (let i = startVendorId; i <= lastVendorId; i++) {
				acc[i] = true;
			}
			return acc;
		}, {});

		cookieData.selectedVendorIds = new Set();
		for (let i = 0; i <= maxVendorId; i++) {
			if ((defaultConsent && !idMap[i]) ||
				(!defaultConsent && idMap[i])) {
				cookieData.selectedVendorIds.add(i);
			}
		}
	}
	else {
		cookieData.selectedVendorIds = decodeBitsToIds(vendorIdBitString);
	}

	return cookieData;
}

function encodePublisherConsentData(publisherData) {
	const {
		vendorList = {},
		customPurposeList = {},
		selectedPurposeIds,
		selectedCustomPurposeIds
	} = publisherData;
	const {purposes: customPurposes = []} = customPurposeList;
	const {purposes = []} = vendorList;

	return encodePublisherCookieValue({
		...publisherData,
		numCustomPurposes: customPurposes.length,
		standardPurposeIdBitString: encodePurposeIdsToBits(purposes, selectedPurposeIds),
		customPurposeIdBitString: encodePurposeIdsToBits(customPurposes, selectedCustomPurposeIds)
	});
}

function decodePublisherConsentData(cookieValue) {
	const {
		cookieVersion,
		cmpId,
		vendorListVersion,
		publisherPurposeVersion,
		created,
		lastUpdated,
		customPurposeIdBitString
	} = decodePublisherCookieValue(cookieValue);

	return {
		cookieVersion,
		cmpId,
		vendorListVersion,
		publisherPurposeVersion,
		created,
		lastUpdated,
		selectedCustomPurposeIds: decodeBitsToIds(customPurposeIdBitString)
	};

}

function readCookie(name) {
	const cookies = document.cookie.split(';');
	const result = [];

	for (const cookie of cookies) {
		const i = cookie.indexOf('='),
			  key = cookie.substring(0, i).trim(),
			  value = cookie.substring(i + 1, cookie.length).trim();

		if (key === name) {
			result.push(value);
		}
	}

	return result;
}

function cookieReducer(cookies, func) {
	if (!cookies || cookies.length === 0) {
		return undefined;
	}

	return cookies
		.map(cookie => func(cookie))
		.reduce((cookie1, cookie2) => {
			return (cookie1 && cookie2)
				? cookie1.vendorListVersion > cookie2.vendorListVersion
					? cookie1
					: cookie2
				: (cookie1 || cookie2);
		});
}

function writeCookie(name, value, maxAgeSeconds, path = '/') {
	const maxAge = maxAgeSeconds === null ? '' : `;max-age=${maxAgeSeconds}`;
	document.cookie = `${name}=${value};path=${path}${maxAge}`;
}

function readPublisherConsentCookie() {
	// If configured try to read publisher cookie
	if (config.storePublisherData) {
		const cookies = readCookie(PUBLISHER_CONSENT_COOKIE_NAME);
		log.debug('Read publisher consent data from local cookie', cookies);
		return cookieReducer(cookies, decodePublisherConsentData);
	}
}

function writePublisherConsentCookie(publisherConsentData) {
	log.debug('Write publisher consent data to local cookie', publisherConsentData);
	writeCookie(PUBLISHER_CONSENT_COOKIE_NAME,
		encodePublisherConsentData(publisherConsentData),
		PUBLISHER_CONSENT_COOKIE_MAX_AGE,
		'/');
}


/**
 * Read vendor consent data from third-party cookie on the
 * global vendor list domain.
 *
 * @returns Promise resolved with decoded cookie object
 */
function readGlobalVendorConsentCookie() {
	log.debug('Request consent data from global cookie');
	return sendPortalCommand({
		command: 'readVendorConsent',
	}).then(result => {
		log.debug('Read consent data from global cookie', result);
		if (result) {
			return decodeVendorConsentData(result);
		}
	}).catch(err => {
		log.error('Failed reading global vendor consent cookie', err);
	});
}

/**
 * Write vendor consent data to third-party cookie on the
 * global vendor list domain.
 *
 * @returns Promise resolved after cookie is written
 */
function writeGlobalVendorConsentCookie(vendorConsentData) {
	log.debug('Write consent data to global cookie', vendorConsentData);
	return sendPortalCommand({
		command: 'writeVendorConsent',
		encodedValue: encodeVendorConsentData(vendorConsentData),
		vendorConsentData,
		cmpVersion: pack.version
	}).catch(err => {
		log.error('Failed writing global vendor consent cookie', err);
	});
}

/**
 * Read vendor consent data from first-party cookie on the
 * local domain.
 *
 * @returns Promise resolved with decoded cookie object
 */
function readLocalVendorConsentCookie() {
	const cookies = readCookie(VENDOR_CONSENT_COOKIE_NAME);
	log.debug('Read consent data from local cookie', cookies);
	return Promise.resolve(cookieReducer(cookies, decodeVendorConsentData));
}

/**
 * Write vendor consent data to first-party cookie on the
 * local domain.
 *
 * @returns Promise resolved after cookie is written
 */
function writeLocalVendorConsentCookie(vendorConsentData) {
	log.debug('Write consent data to local cookie', vendorConsentData);
	return Promise.resolve(writeCookie(VENDOR_CONSENT_COOKIE_NAME,
		encodeVendorConsentData(vendorConsentData),
		VENDOR_CONSENT_COOKIE_MAX_AGE,
		'/'));
}

function readVendorConsentCookie() {
	return config.storeConsentGlobally ?
		readGlobalVendorConsentCookie() : readLocalVendorConsentCookie();
}

function writeVendorConsentCookie(vendorConsentData) {
	return config.storeConsentGlobally ?
		writeGlobalVendorConsentCookie(vendorConsentData) : writeLocalVendorConsentCookie(vendorConsentData);
}

export {
	readCookie,
	writeCookie,
	encodeVendorConsentData,
	decodeVendorConsentData,

	convertVendorsToRanges,

	encodePublisherConsentData,
	decodePublisherConsentData,

	readGlobalVendorConsentCookie,
	writeGlobalVendorConsentCookie,
	readLocalVendorConsentCookie,
	writeLocalVendorConsentCookie,
	readVendorConsentCookie,
	writeVendorConsentCookie,

	readPublisherConsentCookie,
	writePublisherConsentCookie,

	PUBLISHER_CONSENT_COOKIE_NAME,
	VENDOR_CONSENT_COOKIE_NAME
};
