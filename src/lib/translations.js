import replaceMacros from './macros';
import { fetch } from './helpers';
import Promise from 'promise-polyfill';
import log from './log';
import config from './config';

class Translations {
	constructor() {
		this.localizedValues = {};
		this.currentLang = null;
		this.translations = null;
	}

	fetchTranslation = () => {
		return new Promise((resolve, reject) => {
			if (!this.translations) {
				log.error('Failed to load translation - missing configuration on vendor list');
				return reject('Failed to load translation - missing configuration on vendor list');
			}
			try {
				this.fetchFile(resolve, reject, this.currentLang);
			} catch (err) {
				log.error(`Failed to load translation`, err);
				reject(err);
			}
		});
	};

	changeLang = language => {
		return new Promise((resolve, reject) => {
			const onResolve = () => {
				this.currentLang = language;
				resolve();
			};

			if (!this.isLangAvailable(language)) {
				reject();
				return;
			}
			if (this.isFetchedAlready(language)) {
				onResolve();
				return;
			}

			this.fetchFile(onResolve, reject, language);
		});
	};

	fetchFile = (resolve, reject, language) => {
		return fetch(this.getUrl(language))
			.then(result => {
				const data = {
					[language]: result.json()
				};
				this.addTranslation(data);
				return resolve();
			}).catch(err => {
				log.error('Failed to load translation during fetching data', err);
				reject(err);
			});
	};

	initConfig = configuration => {
		if (!configuration || !Object.keys(configuration).length) {
			return;
		}
		this.translations = {};
		this.detectedLang = findLocale().split('-')[0];
		this.defaultLang = config.defaultLang && config.defaultLang.split('-')[0].toLowerCase();

		Object.keys(configuration).forEach(key => {
			this.translations[key.toLowerCase()] = configuration[key];
		});

		this.initCurrent();
	};

	initCurrent = () => {
		if (!this.translations) {
			return;
		}
		const code = this.isLangAvailable(this.detectedLang) ? this.detectedLang : this.getDefaultLang();
		this.currentLang = code;
	};

	getDefaultLang = () => {
		if (this.defaultLang && this.isLangAvailable(this.defaultLang)) {
			return this.defaultLang;
		}
		return Object.keys(this.translations)[0];
	};

	isLangAvailable = language => {
		return this.translations.hasOwnProperty(language);
	};

	getUrl = language => {
		if (language && this.isLangAvailable(language)) {
			return this.translations[language];
		}
		return null;
	};

	isFetchedAlready = language => {
		return !!this.localizedValues[language];
	};

	addTranslation = localizedData => {
		const parsed = this.processLocalized(localizedData);
		this.localizedValues = { ...this.localizedValues, ...parsed };
	};

	lookup = key => {
		return this.localizedValues[this.currentLang] && this.localizedValues[this.currentLang][key];
	};

	processLocalized = (data = {}) => {
		const locales = Object.keys(data);
		return locales.reduce((acc, locale) => {
			const [language] = locale.toLowerCase().split('-');
			return {
				...acc,
				[locale]: {
					...acc[locale],
					...this.flattenObject(data[language]),
					...this.flattenObject(data[locale])
				}
			};
		}, {});
	};

	flattenObject = (data) => {
		const flattened = {};

		function flatten(part, prefix) {
			Object.keys(part).forEach(key => {
				const prop = prefix ? `${prefix}.${key}` : key;
				const val = part[key];
				if (!val) {
					return;
				}

				if (typeof val === 'object') {
					return flatten(val, prop);
				}

				flattened[prop] = val;
			});
		}

		flatten(data);
		return flattened;
	};
}

export function findLocale() {
	const locale = config.forceLocale ||
		(navigator && (
			navigator.language ||
			navigator.browserLanguage ||
			navigator.userLanguage ||
			(navigator.languages && navigator.languages[0]) ||
			'en-us'
		));
	return locale.toLowerCase();
}

export const translations = new Translations();
