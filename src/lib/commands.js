import { TCModel, GVL } from "@iabtcf/core";
import config from "./config";
import {
	encodeConsentData
} from "./cookie/cookie";
import {
	CMP_VERSION,
	CMP_ID,
	COOKIE_VERSION
} from "./init";
import {
	SECTION_DETAILS,
	SECTION_VENDORS
} from "./store";

const createCommands = (store, cmpManager) => {
	/**
	 * Converts vector to consent object
	 */
	const vectorToObject = (set) => {
		let obj = {};

		set.forEach((hasConsent, id) => {
			obj[id] = hasConsent;
		});

		return obj;
	};

	/**
	 * Generates consent object based on input params: consents and vendor list
	 */
	const getConsentObject = (callback, consents, vendorList) => {
		if (!consents || !vendorList) {
			return callback({}, false);
		}

		const { persistedConsentData } = store;

		const tcModel = new TCModel(new GVL(vendorList));
		tcModel.cookieVersion = COOKIE_VERSION;
		tcModel.cmpId = CMP_ID;
		tcModel.cmpVersion = CMP_VERSION;
		tcModel.created = persistedConsentData && persistedConsentData.created || new Date();
		tcModel.lastUpdated = persistedConsentData && persistedConsentData.lastUpdated || new Date();
		tcModel.vendorListVersion = vendorList.vendorListVersion;
		tcModel.isServiceSpecific = true;
		tcModel.supportOOB = false;
		tcModel.publisherCountryCode = config.publisherCountryCode;
		tcModel.purposeOneTreatment = config.purposeOneTreatment;

		for (let key of Object.keys(consents)) {
			if (tcModel.hasOwnProperty(key)) {
				tcModel[key].set(consents[key]);
			}
		}

		const encoded = encodeConsentData(tcModel);

		const {
			cmpId,
			cmpVersion,
			policyVersion: tcfPolicyVersion,
			supportOOB,
			vendorListVersion,
			isServiceSpecific,
			useNonStandardStacks,
			publisherCountryCode: publisherCC,
			purposeConsents,
			purposeLegitimateInterests,
			publisherConsents,
			publisherLegitimateInterests,
			vendorConsents,
			vendorLegitimateInterests,
			vendorsDisclosed,
			vendorsAllowed,
			specialFeatureOptins,
			created,
			lastUpdated
		} = tcModel;

		callback({
			tcString: encoded,
			cmpId,
			cmpVersion,
			tcfPolicyVersion,
			supportOOB,
			vendorListVersion,
			isServiceSpecific,
			useNonStandardStacks,
			publisherCC,
			created,
			lastUpdated,
			gdprApplies: config.gdprApplies,
			outOfBand: {
				allowedVendors: vectorToObject(vendorsAllowed),
				disclosedVendors: vectorToObject(vendorsDisclosed)
			},
			purpose: {
				consents: vectorToObject(purposeConsents),
				legitimateInterests: vectorToObject(purposeLegitimateInterests)
			},
			vendor: {
				consents: vectorToObject(vendorConsents),
				legitimateInterests: vectorToObject(vendorLegitimateInterests)
			},
			specialFeatureOptins: vectorToObject(specialFeatureOptins),
			publisher: {
				consents: vectorToObject(publisherConsents),
				legitimateInterests: vectorToObject(publisherLegitimateInterests),
				customPurposes: {
					purposes: {},
					legitimateInterests: {}
				},
				restrictions: {},
			},
			listenerId: undefined
		}, true);
	};


	/**
	 * Trigger the consent tool UI to be shown
	 */
	const showConsentTool =  (callback = () => {}) => {
		cmpManager.addEventListener('cmpReady', ({data}) => {
			if (data) {
				store.updateSection();
				store.toggleConsentToolShowing(true);

				cmpManager.openConsentTool = true;
				cmpManager.notify('openConsentTool', { section: 'intro' });
			}

			callback(data);
		});
	};

	/**
	 * Trigger the consent tool UI to be shown on Detail View
	 */
	const showConsentDetailView = (callback = () => {}, {tab} = {}) => {
		cmpManager.addEventListener('cmpReady', ({data}) => {
			if (data) {
				store.updateSelectedTab(tab);
				store.updateSection(SECTION_DETAILS);
				store.toggleConsentToolShowing(true);

				cmpManager.openConsentTool = true;
				cmpManager.notify('openConsentTool', { section: 'details' });
			}

			callback(data);
		});
	};

	/**
	 * Trigger the vendors UI to be shown
	 */
	const showVendors = (callback = () => {}) => {
		cmpManager.addEventListener('cmpReady', ({data}) => {
			if (data) {
				store.isCustomVendors = false;
				store.updateSection(SECTION_DETAILS, SECTION_VENDORS);
				store.toggleConsentToolShowing(true);

				cmpManager.openConsentTool = true;
				cmpManager.notify('openConsentTool', { section: 'details' });
			}

			callback(data);
		});
	};

	/**
	 * Trigger the vendors UI to be shown
	 */
	const showCustomVendors = (callback = () => {}) => {
		cmpManager.addEventListener('cmpReady', ({data}) => {
			if (data) {
				store.isCustomVendors = true;
				store.updateSection(SECTION_DETAILS, SECTION_VENDORS);
				store.toggleConsentToolShowing(true);

				cmpManager.openConsentTool = true;
				cmpManager.notify('openConsentTool', { section: 'details' });
			}

			callback(data);
		});
	};

	/**
	 * Trigger the footer UI to be shown
	 * */
	const showFooter = (callback = () => {}) => {
		cmpManager.addEventListener('cmpReady', ({data}) => {
			const footerShown = data && store.toggleFooterShowing(true);
			callback(footerShown);
		});
	};

	const registerEventListener = (callback, {event}) => {
		cmpManager.addEventListener(event, callback);
	};

	const unregisterEventListener = (callback, {event}) => {
		cmpManager.removeEventListener(event, callback);
	};

	const getVendorListVersion = (callback = () => {})=> {
		const {
			vendorListVersion = null
		} = store.persistedConsentData;

		callback(vendorListVersion);
	};

	return {
		getConsentObject,
		getVendorListVersion,
		showConsentTool,
		showConsentDetailView,
		showVendors,
		showFooter,
		showCustomVendors,
		registerEventListener,
		unregisterEventListener
	};
};

export default createCommands;
