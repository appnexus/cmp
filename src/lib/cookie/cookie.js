import Promise from 'promise-polyfill';
import log from '../log';
import { TCString, VendorVectorEncoder, IntEncoder, BitLength } from '@iabtcf/core';

const CONSENT_COOKIE = 'adpconsent';
const CONSENT_COOKIE_MAX_AGE = 33696000;

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
		if (decoded.gvl) {
			decoded.vendorConsents.maxId_ = decoded.vendorLegitimateInterests.maxId_ = Math.max(...Object.keys(decoded.gvl.vendors));
		}
		encoded = TCString.encode(decoded, {
			isForVendors: true
		});
	} catch (e) {
		log.debug('Invalid consent data - unable to encode');
	}
	return encoded;
};

const readConsentCookie = () => {
	try {
		const cookie = readCookie(CONSENT_COOKIE);
		log.debug('Read consent data from local cookie', cookie);
		return Promise.resolve(cookie);
	} catch (e) {
		return Promise.reject(e);
	}
};

const writeConsentCookie = (encodedConsent) => {
	log.debug('Write consent data to local cookie');
	return Promise.resolve(writeCookie(CONSENT_COOKIE, encodedConsent, CONSENT_COOKIE_MAX_AGE, '/'));
};

const applyDecodeFix = () => {
	const decode = VendorVectorEncoder.decode;
	VendorVectorEncoder.decode = function (...args) {
		const [ value ] = args;
		const vector = decode.apply(this, args);
		// Ensure that vendor consents and legitimateInterests values are present in TCData object
		// for all vendors id up to maxVendorId (which is stored in tcString)
		vector.maxId_ = IntEncoder.decode(value.substr(0, BitLength.maxId), BitLength.maxId);
		return vector;
	};
	return decode;
};

export {
	decodeConsentData,
	encodeConsentData,
	readConsentCookie,
	writeConsentCookie,
	applyDecodeFix,
	CONSENT_COOKIE
};
