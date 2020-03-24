import Promise from 'promise-polyfill';
import log from '../log';
import { TCString } from '@iabtcf/core';
import {
	padRight,
	encodeVendorCookieValue
} from './cookieEncodeHelpers';
const arrayFrom = require('core-js/library/fn/array/from');

const CONSENT_COOKIE = 'adpconsent';
const CONSENT_COOKIE_MAX_AGE = 33696000;
const MAX_PURPOSE_V1_ID = 5;

function readCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);

	if (parts.length === 2) {
		return parts.pop().split(';').shift();
	}
}

function writeCookie(name, value, maxAgeSeconds, path = '/') {
	const maxAge = maxAgeSeconds === null ? '' : `;max-age=${maxAgeSeconds}`;
	document.cookie = `${name}=${value};path=${path}${maxAge}`;
}

function decodeConsentData (encoded) {
	let decoded;
	try {
		decoded = TCString.decode(encoded);
	} catch (e) {
		log.debug('Consent string not compatible with TCF v2.0');
	}
	return decoded;
}

const encodeConsentData = (decoded) => {
	let encoded;
	try {
		encoded = TCString.encode(decoded);
	} catch (e) {
		log.debug('Invalid consent data - unable to encode');
	}
	return encoded;
};

const readConsentCookie = () => {
	const cookie = readCookie(CONSENT_COOKIE);
	log.debug('Read consent data from local cookie', cookie);
	return Promise.resolve(cookie);
};

const writeConsentCookie = (encodedConsent) => {
	log.debug('Write consent data to local cookie');
	return Promise.resolve(writeCookie(CONSENT_COOKIE, encodedConsent, CONSENT_COOKIE_MAX_AGE, '/'));
};

const encodePurposeIdsToBits = (selectedPurposeIds = new Set()) => {
	const maxPurposeId = Math.max(0,
		...arrayFrom(selectedPurposeIds),
		MAX_PURPOSE_V1_ID);
	let purposeString = '';
	for (let id = 1; id <= maxPurposeId; id++) {
		purposeString += (selectedPurposeIds.has(id) ? '1' : '0');
	}
	return purposeString;
};

const encodeVendorIdsToBits = (maxVendorId, selectedVendorIds = new Set()) => {
	let vendorString = '';
	for (let id = 1; id <= maxVendorId; id++) {
		vendorString += (selectedVendorIds.has(id) ? '1' : '0');
	}
	return padRight(vendorString, Math.max(0, maxVendorId - vendorString.length));
};

const convertVendorsToRanges = (maxVendorId, selectedIds) => {
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
};

const encodeVendorConsentData = (vendorData) => {
	const { selectedPurposeIds, selectedVendorIds, maxVendorId } = vendorData;

	// Encode the data with and without ranges and return the smallest encoded payload
	const noRangesData = encodeVendorCookieValue({
		...vendorData,
		maxVendorId,
		purposeIdBitString: encodePurposeIdsToBits(selectedPurposeIds),
		isRange: false,
		vendorIdBitString: encodeVendorIdsToBits(maxVendorId, selectedVendorIds)
	});

	const vendorRangeList = convertVendorsToRanges(maxVendorId, selectedVendorIds);
	const rangesData = encodeVendorCookieValue({
		...vendorData,
		maxVendorId,
		purposeIdBitString: encodePurposeIdsToBits(selectedPurposeIds),
		isRange: true,
		defaultConsent: false,
		numEntries: vendorRangeList.length,
		vendorRangeList
	});

	return noRangesData.length < rangesData.length ? noRangesData : rangesData;
};

export {
	decodeConsentData,
	encodeConsentData,
	readConsentCookie,
	writeConsentCookie,
	encodeVendorConsentData,
	convertVendorsToRanges,
	CONSENT_COOKIE
};
