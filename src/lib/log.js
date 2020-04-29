import config, { VERSION } from './config';
import { cmp as DPL } from '@s1/dpl';

const logLevels = ['debug', 'info', 'warn', 'error'];

export default logLevels.reduce((logger, funcName, index) => {
	logger[funcName] = function (...args) {
		const consoleFunc = funcName === 'debug' ? 'log' : funcName;
		const { logging } = config;
		if (logging && console && typeof console[consoleFunc] === 'function') {
			const enabledLevelIndex = logLevels.indexOf(logging.toString().toLocaleLowerCase());
			if (logging === true || (enabledLevelIndex > -1 && index >= enabledLevelIndex)) {
				const [message, ...rest] = [...args];
				console[consoleFunc](`${funcName.toUpperCase()} - (CMP) ${message}`, ...rest);
			}
		}
		if (funcName === 'error') {
			const [message] = [...args];
			track('CMPError', {
				message,
			});
		}
	};
	return logger;
}, {});

export const EVENTS = {
	...DPL.events.adsCoordinator,
};

export const track = (eventName, payload) => {
	const tracker = DPL.events.cmp[eventName];
	const url = window.location.href.split('?')[0]; // only need href/path
	if (tracker) {
		tracker.log({
			version: VERSION,
			url,
			...payload,
		});
	}
};
