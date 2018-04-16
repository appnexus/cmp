import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';
import Promise from 'promise-polyfill';
import log from './lib/log';
import { init } from './lib/init';
import { CMP_GLOBAL_NAME } from "./lib/cmp";

function checkConsent() {
	const cmp = window.__cmp;
	if (!cmp) {
		log.error('CMP failed to load');
	}
	else if (!window.navigator.cookieEnabled) {
		log.warn('Cookies are disabled. Ignoring CMP consent check');
	}
	else {
		Promise.all([
			cmp('getVendorConsents'),
			cmp('getVendorList')
		]).then(([{created, vendorListVersion}, {version}]) => {
			if (!created) {
				log.debug('No consent data found. Showing consent tool');
				cmp('showConsentTool');
			}
			else if (vendorListVersion !== version) {
				log.debug(`Consent found for version ${vendorListVersion}, but received vendor list version ${version}. Showing consent tool`);
				cmp('showConsentTool');
			}
			else {
				log.debug('Consent found. Not showing consent tool');
			}
		});
	}
}

// Preserve any config options already set
const {config} = window[CMP_GLOBAL_NAME] || {};
const configUpdates = {
	globalConsentLocation: '//acdn.adnxs.com/cmp/docs/portal.html',
	...config
};

// Add stub
window.__cmp = (() => {
	const commandQueue = [];
	const cmp = function(command, parameter, callback) {
		commandQueue.push({
			command,
			parameter,
			callback
		});
	};
	cmp.commandQueue = commandQueue;
	cmp.receiveMessage = function(event) {
		const data = event && event.data && event.data.__cmpCall;
		if (data) {
			commandQueue.push({
				callId: data.callId,
				command: data.command,
				parameter: data.parameter,
				event: event
			});
		}
	};
});

// Listen for postMessage events
window.addEventListener('message', event => {
	window.__cmp.receiveMessage(event);
});

// Initialize CMP and then check if we need to ask for consent
init(configUpdates).then(checkConsent);
