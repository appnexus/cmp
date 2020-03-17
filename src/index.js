import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';
import 'core-js/fn/set';
import {init} from './lib/init';
import log from "./lib/log";
import config from "./lib/config";
import { decodeConsentData } from "./lib/cookie/cookie";

const TCF_CONFIG = '__tcfConfig';

function handleConsentResult(tcfApi, store = {}, vendorList, consentData = {}) {
	const { isConsentToolShowing } = store;

	const {
		vendorListVersion: listVersion,
		tcfPolicyVersion: listPolicyVersion = 1
	} = vendorList;

	const {
		created,
		vendorListVersion,
		policyVersion: consentPolicyVersion = 1
	} = consentData;

	const tcfApiCall = (command) => {
		tcfApi(command, 2, () => {log.debug(`${command} command was called`)});
	};

	if (!created) {
		log.debug('No consent data found. Showing consent tool');
		config.autoDisplay && tcfApiCall('showConsentTool');
	} else if (!listVersion) {
		log.debug('Could not determine vendor list version. Not showing consent tool');
	} else if (vendorListVersion !== listVersion) {
		log.debug(`Consent found for version ${vendorListVersion}, but received vendor list version ${listVersion}. Showing consent tool`);
		config.autoDisplay && tcfApiCall('showConsentTool');
	} else if (consentPolicyVersion !== listPolicyVersion) {
		log.debug(`Consent found for policy ${consentPolicyVersion}, but received vendor list with policy ${consentPolicyVersion}. Showing consent tool`);
		config.autoDisplay && tcfApiCall('showConsentTool');
	} else {
		log.debug('Consent found. Not showing consent tool. Show footer when not all consents set to true');
		!isConsentToolShowing && config.autoDisplay && tcfApiCall('showFooter');
	}
}

function checkConsent(tcfApi, store) {
	if (!tcfApi) {
		log.error('CMP failed to load');
	}
	else if (!window.navigator.cookieEnabled) {
		log.warn('Cookies are disabled. Ignoring CMP consent check');
	}
	else {
		const { getVendorList } = config;

		if (getVendorList) {
			getVendorList((err, vendorList) => {
				if (err) {
					log.error('Failed to get vendor list');
				} else {
					const timeout = setTimeout(() => {
						handleConsentResult(tcfApi, store, vendorList);
					}, 100);

					tcfApi('getTCData',2, (tcData, success) => {
						if (success) {
							let tcStringDecoded = decodeConsentData(tcData.tcString);
							clearTimeout(timeout);
							handleConsentResult(tcfApi, store, vendorList, tcStringDecoded);
						}
					}, undefined, true);
				}
			});
		}
	}
}

function start() {
	// Preserve any config options already set
	const config  = window[TCF_CONFIG] || {};

	const configUpdates = {
		globalConsentLocation: 'https://rasp.mgr.consensu.org/portal.html',
		...config
	};

	init(configUpdates).then((store) => checkConsent(window.__tcfapi, store));
}

start();
