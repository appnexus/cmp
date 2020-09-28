/**
 * Optional logger for monitoring/alerting
 */
import DPL from '@s1/dpl/cjs/cmp';
import debug from './debug';

let isLoggerEnabled = false;
let sessionConfig;
let performanceMark = new Date();

console.log('DPL', DPL);

export const EVENTS = {
	...DPL.events.cmp,
};

export const logger = (logger, payload) => {
	const loggerPayload = {
		...sessionConfig,
		...payload,
	};
	if (logger && isLoggerEnabled) {
		if (logger === EVENTS.CMPError) {
			// emit the error to the console
			console.error(payload.message);
		}
		logger.log(loggerPayload);
	} else {
		debug('logger (isDisabled)', logger, loggerPayload);
	}
};

Object.defineProperties(logger, {
	isEnabled: {
		get: function isEnabled() {
			return isLoggerEnabled;
		},
		set: function isEnabled(isEnabled) {
			isLoggerEnabled = isEnabled;
		},
	},
	session: {
		get: function session() {
			return sessionConfig;
		},
		set: function session(config) {
			sessionConfig = config;
		},
	},
	EVENTS: {
		value: EVENTS,
	},
	mark: {
		get: function mark() {
			const previousPerformanceMark = performanceMark;
			performanceMark = new Date();
			return performanceMark - previousPerformanceMark;
		},
		set: function mark(now) {
			performanceMark = now;
		},
	},
});

export default logger;
