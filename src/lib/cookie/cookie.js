import Promise from 'promise-polyfill';
import log from '../log';
import {TCString} from '@iabtcf/core';

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
		log.debug('Consent string not compatible with TCF v2.0')
	}
	return decoded;
}

function encodeConsentData (decoded) {
	return TCString.encode(decoded);
}

function readConsentCookie () {
	const cookie = readCookie(CONSENT_COOKIE);
	log.debug('Read consent data from local cookie', cookie);
	if (cookie) {
		return TCString.decode(cookie);
	}
}

function writeConsentCookie(encodedConsent) {
	log.debug('Write consent data to local cookie');
	return Promise.resolve(writeCookie(CONSENT_COOKIE, encodedConsent, CONSENT_COOKIE_MAX_AGE, '/'));
}

export {
	writeCookie,
	decodeConsentData,
	encodeConsentData,
	readConsentCookie,
	writeConsentCookie,
};
