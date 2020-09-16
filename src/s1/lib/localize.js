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

export default localize;
