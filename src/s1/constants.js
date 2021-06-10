/* global __VERSION__ */

export const COOKIES = {
	VENDOR_CONSENT: 'euconsent-v2',
	PUBLISHER_CONSENT: 'pubconsent-v2',
	HAS_CONSENTED_ALL: 'gdpr_opt_in',
};
export const CONSENT_SCREENS = {
	STACKS_LAYER1: 1,
	PURPOSES_LAYER2: 2,
	VENDORS_LAYER3: 3,
	SLIM_LAYER0: 4,
};

export const CUSTOM_API = {
	CHANGE_CONFIG: 'changeConfig',
	CHANGE_LANGUAGE: 'changeLanguage',
	INIT: 'init',
	OFF_CONSENT_CHANGED: 'offConsentAllChanged',
	ON_CONSENT_CHANGED: 'onConsentAllChanged',
	SHOW_CONSENT_TOOL: 'showConsentTool',
};

export const CUSTOM_EVENTS = {
	CONSENT_ALL_CHANGED: 'cmpConsentAllChanged',
	ERROR: 'cmpError',
};

export const CMP_GLOBAL_NAME = 'cmp';
export const VERSION = __VERSION__;

export const LANGUAGES = [
	{ display: 'English', code: 'en', shouldDisablePurposesFetch: true },
	{ display: 'Bulgarian', code: 'bg' },
	{ display: 'Catalan', code: 'ca' },
	{ display: 'Czech', code: 'cs' },
	{ display: 'Danish', code: 'da' },
	{ display: 'German', code: 'de' },
	{ display: 'Greek', code: 'el' },
	{ display: 'Spanish', code: 'es' },
	{ display: 'Estonian', code: 'et' },
	{ display: 'Finnish', code: 'fi' },
	{ display: 'French', code: 'fr' },
	{ display: 'Croatian', code: 'hr' },
	{ display: 'Hungarian', code: 'hu' },
	{ display: 'Italian', code: 'it' },
	{ display: 'Japanese', code: 'ja' },
	{ display: 'Lithuanian', code: 'lt' },
	{ display: 'Latvian', code: 'lv' },
	{ display: 'Maltese', code: 'mt' },
	{ display: 'Dutch', code: 'nl' },
	{ display: 'Norwegian', code: 'no' },
	{ display: 'Polish', code: 'pl' },
	{ display: 'Portuguese', code: 'pt' },
	{ display: 'Romanian', code: 'ro' },
	// { display: 'Serbian Cryllic', code: 'sr-cyrillic' }, // currently not supported in core
	// { display: 'Serbian Latin', code: 'sr-latin' },// currently not supported in core
	{ display: 'Russian', code: 'ru' },
	{ display: 'Slovak', code: 'sk' },
	{ display: 'Slovenian', code: 'sl' },
	{ display: 'Swedish', code: 'sv' },
	{ display: 'Turkish', code: 'tr' },
	{ display: 'Chinese', code: 'zh' },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0];
