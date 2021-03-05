import { GVL } from '@iabtcf/core';
import { DEFAULT_LANGUAGE, LANGUAGES } from '../constants';
import logger, { EVENTS as LOG_EVENTS } from './logger';

const translations = {};

export function findLangage(optLang) {
	let langCode =
		optLang ||
		(navigator &&
			(navigator.language ||
				navigator.browserLanguage ||
				navigator.userLanguage ||
				(navigator.languages && navigator.languages[0]) ||
				'en-us'));
	return LANGUAGES.find(({ code }) => code === langCode.toLowerCase()) || DEFAULT_LANGUAGE;
}

export const flatten = (obj, acc = {}, flatKey = '') => {
	let i;
	for (i in obj) {
		if (obj.hasOwnProperty(i)) {
			const key = flatKey ? `${flatKey}.${i}` : i;
			if (typeof obj[i] === 'object') {
				//
				flatten(obj[i], acc, key);
			} else {
				acc[key] = obj[i];
			}
		}
	}
	return acc;
};

export const localize = (language) => {
	const { code } = findLangage(language);
	if (translations[code]) {
		return Promise.resolve(translations[code]);
	}

	const filename = `${GVL.baseUrl}${GVL.translationFilename.replace('[LANG]', code)}`;
	return fetch(filename)
		.then((response) => response.json())
		.then((json) => flatten(json))
		.catch((e) => {
			logger(LOG_EVENTS.CMPError, {
				message: `localizeError: ${e} ${filename}`,
			});
		});
};

export const lookup = ({ label, prefix, localizeKey, translations } = {}) => {
	const key = prefix ? `${prefix}.${localizeKey}` : localizeKey;
	return translations[key] || label;
};

export const secondsToNearestInt = (seconds) => {
	const minutes = seconds / 60;
	if (minutes < 1) {
		return {
			unit: 'seconds',
			value: seconds
		};
	}
	const hours = minutes / 60;
	if (hours < 1) {
		return {
			unit: 'minutes',
			value: Math.round(minutes)
		};
	}
	const days = hours / 24;
	if (days < 1) {
		return {
			unit: 'hours',
			value: Math.round(hours)
		};
	}
	const months = days / 30;
	if (months < 1) {
		return {
			unit: 'days',
			value: Math.round(days)
		};
	}
	const years = days / 365;
	if (years < 1) {
		return {
			unit: 'months',
			value: Math.round(months)
		};
	}
	
	return {
		unit: 'years',
		value: Math.round(years)
	};
}
export default localize;
