const PUBLISHER_CONSENT_COOKIE_NAME = 'pubconsent_2.0';
const PUBLISHER_CONSENT_COOKIE_MAX_AGE = 33696000;

const VENDOR_CONSENT_COOKIE_NAME = 'euconsent_2.0';
const VENDOR_CONSENT_COOKIE_MAX_AGE = 33696000;

const HAS_CONTENED_ALL = 'gdpr_opt_in';
const HAS_CONTENED_ALL_MAX_AGE = 33696000;

const getCookieDomain = (customCookieDomain) => {
	const hostname = (window && window.location && window.location.hostname) || '';
	const cookieDomain =
		hostname.split('.').length > 1 && customCookieDomain && `.${hostname}`.indexOf(customCookieDomain) > -1
			? `;domain=${customCookieDomain}`
			: '';
	return cookieDomain;
};

function readCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);

	if (parts.length === 2) {
		return parts.pop().split(';').shift();
	}
}

function writeCookie({ name, value, maxAgeSeconds, path = '/', domain }) {
	const maxAge = maxAgeSeconds === null ? '' : `;max-age=${maxAgeSeconds}`;
	const expires =
		maxAgeSeconds === null ? '' : ';expires=' + new Date(new Date() * 1 + maxAgeSeconds * 1000).toUTCString();
	const secure = global.location && global.location.protocol === 'http:' ? ';SameSite=Lax' : ';SameSite=None;secure';
	const cookie = `${name}=${value}${getCookieDomain(domain)};path=${path}${maxAge}${expires}${secure}`;
	document.cookie = cookie;
	return cookie;
}

function readPublisherConsentCookie() {
	return readCookie(PUBLISHER_CONSENT_COOKIE_NAME);
}

function writePublisherConsentCookie(value, domain) {
	writeCookie({
		name: PUBLISHER_CONSENT_COOKIE_NAME,
		value,
		maxAgeSeconds: PUBLISHER_CONSENT_COOKIE_MAX_AGE,
		path: '/',
		domain,
	});
}

/**
 * Read vendor consent data from first-party cookie on the
 * local domain.
 *
 * @returns Promise resolved with decoded cookie object
 */
function readLocalVendorConsentCookie() {
	return readCookie(VENDOR_CONSENT_COOKIE_NAME);
}

/**
 * Write vendor consent data to first-party cookie on the
 * local domain.
 *
 * @returns Promise resolved after cookie is written
 */
function writeLocalVendorConsentCookie(value, domain) {
	return Promise.resolve(
		writeCookie({
			name: VENDOR_CONSENT_COOKIE_NAME,
			value,
			maxAgeSeconds: VENDOR_CONSENT_COOKIE_MAX_AGE,
			path: '/',
			domain,
		})
	);
}

function readVendorConsentCookie() {
	return readLocalVendorConsentCookie();
}

function writeVendorConsentCookie(value, domain) {
	return writeLocalVendorConsentCookie(value, domain);
}

function readConsentedAllCookie() {
	return readCookie(HAS_CONTENED_ALL);
}

function writeConsentedAllCookie(value, domain) {
	writeCookie({
		name: HAS_CONTENED_ALL,
		value,
		maxAgeSeconds: HAS_CONTENED_ALL_MAX_AGE,
		path: '/',
		domain,
	});
}

export default {
	readVendorConsentCookie,
	writeVendorConsentCookie,
	readPublisherConsentCookie,
	writePublisherConsentCookie,
	readConsentedAllCookie,
	writeConsentedAllCookie,
};
