import Promise from 'promise-polyfill';
import 'whatwg-fetch';

const host = (window && window.location && window.location.hostname) || '';
const parts = host.split('.');
const COOKIE_DOMAIN = parts.length > 1 ? `;domain=.${parts.slice(-3).join('.')}` : '';
const COOKIE_PATH = '/' + (window.location.pathname.split('/')[1] || '');
const COOKIE_MAX_AGE = 33696000; // 13 months (390 days)
const CMP_ADPCONSENT_COOKIE = 'cmpadpconsent';
const CMP_PUBCONSENT_COOKIE = 'cmppubconsent';
const EUCONSENT_COOKIE = 'euconsent';
const COOKIE_WHITELIST = [
	CMP_ADPCONSENT_COOKIE,
	CMP_PUBCONSENT_COOKIE,
	EUCONSENT_COOKIE];


function readCookie (name) {
	const value = '; ' + document.cookie;
	const parts = value.split('; ' + name + '=');
	if (parts.length >= 2) {
		// the first are cookies on a path matching the URL path
		return parts[1].split(';').shift();
	}
	return null;
}

function writeCookie ({ name, value, path = COOKIE_PATH }) {
	document.cookie = `${name}=${value}${COOKIE_DOMAIN};path=${path};max-age=${COOKIE_MAX_AGE};SameSite=None;Secure;`;
}

const commands = {
	writeConsent: ({ consent }) => {
		COOKIE_WHITELIST.forEach((name) => {
			if (name in consent) {
				writeCookie({ name, value: consent[name] });
			}
		});
		return Promise.resolve();
	},
	readConsent: () => {
		return Promise.resolve({
			cmpadpconsent: readCookie(CMP_ADPCONSENT_COOKIE),
			cmppubconsent: readCookie(CMP_PUBCONSENT_COOKIE),
			euconsent: readCookie(EUCONSENT_COOKIE)
		});
	}
};

window.addEventListener('message', (event) => {
	const data = event.data.__consentCall;
	if (data && typeof commands[data.command] === 'function') {
		const { command } = data;
		commands[command](data).then(result => {
			event.source.postMessage({
				__consentReturn: {
					...data,
					result
				}
			}, event.origin);
		});
	}
});
window.parent.postMessage({ __consentReturn: { command: 'isLoaded' } }, '*');
