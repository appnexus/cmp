/* global __CMP_VERSION__ */

export const gdprConsentUrlParam = (() => {
	let gdprConsent = '';
	if (window && window.location && window.location.search) {
		const [, gdprConsentParam] = window.location.search.split('gdpr_consent=');
		if (gdprConsentParam) {
			gdprConsent = gdprConsentParam.split('&')[0];
		}
	}
	return gdprConsent;
})();

export const theme = {
	// primaryColor: '#0099ff',
	// textLinkColor: '#0099ff',
	// boxShadow: 'none',
	// secondaryColor: '#869cc0',
	// featuresColor: '#d0d3d7',
	// maxWidthModal: '500px',
	shouldAutoResizeModal: true,
	maxHeightModal: '45vh',
};

export const config = {
	baseUrl: './config/2.0',
	business: 'dev',
	canLog: false, // pixel logs for monitoring
	canDebug: false, // console.logs
	cmpId: 38,
	cmpVersion: __CMP_VERSION__,
	cookieDomain: '',
	ccpaApplies: false,
	experimentId: 'control',
	gdprApplies: false,
	gdprConsentUrlParam,
	isServiceSpecific: true, // whether or not this cmp is configured to be service specific
	language: '', // empty to detect browser navigator language
	narrowedVendors: [],
	publisherCountryCode: 'US',
	shouldAutoConsent: false, // deprecated feature
	shouldUseStacks: true, // todo: stacks need individual purposes/special-features with toggles
	theme,
	scriptSrc: './tcf-2.0-cmp.js',
	languageFilename: 'purposes/purposes-[LANG].json',
	translationFilename: 'translations/translations-[LANG].json',
	versionedFilename: 'vendor-list.json',
};

export default config;
