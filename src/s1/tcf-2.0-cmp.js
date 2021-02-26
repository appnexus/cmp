import { CmpApi } from '@iabtcf/cmpapi';
import { GVL } from '@iabtcf/core';
import { h, render } from 'preact';

import App from './components/app';
import Store from './lib/store';
import debug from './lib/debug';
import defaultConfig from './lib/config';
import logger, { EVENTS as LOG_EVENTS } from './lib/logger';

import { CMP_GLOBAL_NAME, CUSTOM_API, CUSTOM_EVENTS, VERSION } from './constants';

const { CHANGE_LANGUAGE, INIT, ON_CONSENT_CHANGED, OFF_CONSENT_CHANGED, SHOW_CONSENT_TOOL } = CUSTOM_API;

let errorMessage = '';

export const setup = (configOpt) => {
	const config = {
		...defaultConfig,
		...configOpt,
		theme: {
			...defaultConfig.theme,
			...(configOpt.theme || {}),
		},
	};

	debug.isEnabled = config.canDebug;

	logger.isEnabled = config.canLog;
	logger.session = {
		version: VERSION,
		url: global && global.location && global.location.href ? global.location.href.split('?')[0] : 'unknown',
		experimentId: config.experimentId,
		business: config.business,
		ccpaApplies: config.ccpaApplies === true,
		gdprApplies: config.gdprApplies === true,
	};

	logger(LOG_EVENTS.CMPSetupStart || 'CMPSetupStart');

	GVL.baseUrl = config.baseUrl;
	GVL.versionedFilename = config.versionedFilename;
	GVL.languageFilename = config.languageFilename;
	GVL.translationFilename = config.translationFilename;

	// 1. customize the CMP API
	const cmpApi = new CmpApi(config.cmpId, config.cmpVersion, config.isServiceSpecific, {
		[SHOW_CONSENT_TOOL]: (callback) => {
			store.toggleShowModal(true);
			callback(store, true);
		},

		[CHANGE_LANGUAGE]: (callback, language) => {
			store.toggleLanguage(language, true).finally((result) => {
				callback(store, result);
			});
		},

		[ON_CONSENT_CHANGED]: (callback) => {
			const onConsentChanged = () => {
				callback(store);
			};
			global.addEventListener(CUSTOM_EVENTS.CONSENT_ALL_CHANGED, onConsentChanged);
			return onConsentChanged;
		},

		[OFF_CONSENT_CHANGED]: (callback) => {
			global.addEventListener(CUSTOM_EVENTS.CONSENT_ALL_CHANGED, callback);
		},

		// Custom init function maps to 1.1 integration
		[INIT]: (callback) => {
			if (!store || !init) {
				logger(LOG_EVENTS.CMPError, {
					message: `initError: ${errorMessage}`,
				});
				callback(init(store), new Error(`CMP: initError: ${errorMessage}`));
			} else {
				// could be loading gvl (readyPromise)
				// could be updating CMP ()
				// you hoisted this config up for the `setup` step, so you dont need it again
				// need to wait for promise and for tcData to get current state of cmp
				const { readyPromise } = store;
				readyPromise
					.catch((e) => {
						logger(LOG_EVENTS.CMPError, {
							message: `gvlInitError: ${e}`,
						});
					})
					.finally(() => {
						// complete undefined, consented, not consented
						const {
							hasConsentedAll,
							hasSession,
							isModalShowing,
							gvl: { vendorListVersion },
						} = store;

						logger(LOG_EVENTS.CMPSetupComplete, {
							timingMs: logger.mark,
							hasConsentedAll,
							isModalShowing,
							hasSession,
							vendorListVersion,
						});

						callback(init());
					});
			}
		},
	});

	// 2. Create the store to persist choices
	const store = new Store({
		gvl: new GVL(),
		cmpApi,
		tcfApi: global.__tcfapi,
		config,
	});

	const init = () => {
		render(<App store={store} />, document.body);
		return store;
	};

	// for testing
	return {
		cmpApi,
		init,
	};
};

// 2. Process Anything in the Queue
export const processCommandQueue = (() => {
	const errorLoggerListener = (event) => {
		// just log the first error and then release the error handler
		debug('cmp: error', event.message);
		logger(LOG_EVENTS.CMPError, {
			message: event.message,
		});
		global.removeEventListener('error', errorLoggerListener, false);
	};
	global.addEventListener('error', errorLoggerListener, false);

	const { commandQueue = [] } = window[CMP_GLOBAL_NAME] || {};
	const initIndex = commandQueue.findIndex(({ command }) => command === INIT);
	const initCommandFirst = initIndex >= 0 ? commandQueue.splice(initIndex, 1).concat(commandQueue) : commandQueue;

	initCommandFirst.forEach(({ command, callback, parameter }) => {
		if (command === 'init') {
			// shove the config into GVL creation
			try {
				setup(parameter);
			} catch (e) {
				errorMessage = e;
			}
		}
		window[CMP_GLOBAL_NAME].call(this, command, parameter, callback);
	});
	window[CMP_GLOBAL_NAME].commandQueue = [];
})();
