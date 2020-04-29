import { TCModel, GVL } from "@iabtcf/core";
import config from "./config";
import {
	encodeVendorConsentData,
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

const arrayFrom = require('core-js/library/fn/array/from');

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
	 * Build consent fields object v1 from data that has already been persisted.
	 */
	const getConsentFieldsObject = () => {
		let created, lastUpdated;

		const {
			persistedConsentData,
			persistedConsentString
		} = store;

		const {
			cmpId = store.tcModel.cmpId,
			cmpVersion = store.tcModel.cmpVersion,
			consentScreen = store.tcModel.consentScreen,
			consentLanguage = store.tcModel.consentLanguage,
		} = persistedConsentData;

		if (persistedConsentString) {
			created = persistedConsentData.created;
			lastUpdated = persistedConsentData.lastUpdated;
		}

		return {
			cmpId,
			cmpVersion,
			consentLanguage,
			consentScreen,
			created,
			lastUpdated,
		};
	};

	const generateConsentStringV1 = (data = {}, callback) => {
		const {
			persistedConsentData,
		} = store;

		const {
			created,
			lastUpdated,
			consentLanguage,
			consentScreen,
			cmpVersion,
			cmpId = CMP_ID
		} = persistedConsentData;

		const {
			selectedVendorIds = [],
			selectedPurposeIds = [],
			maxVendorId,
			vendorListVersion,
			cookieVersion
		} = data;

		const consentData = {
			cmpId,
			maxVendorId,
			cookieVersion,
			cmpVersion,
			vendorListVersion,
			created,
			lastUpdated,
			consentLanguage,
			consentScreen,
			selectedVendorIds: new Set(arrayFrom(selectedVendorIds)),
			selectedPurposeIds: new Set(arrayFrom(selectedPurposeIds))
		};

		const valid = (data = {}) => [
			'cmpId', 'cmpVersion', 'consentLanguage', 'consentScreen', 'cookieVersion', 'created', 'lastUpdated',
			'maxVendorId', 'selectedPurposeIds', 'selectedVendorIds', 'vendorListVersion'
		].every(prop => data.hasOwnProperty(prop));

		callback(valid(consentData) ? encodeVendorConsentData(consentData) : undefined);
	};

	/**
	 * Generates v1.1 compatible TC String
	 */
	const getConsentFieldsV1 = (callback, params) => {
		if (!params || !params.hasOwnProperty('cookieVersion') || !params.hasOwnProperty('vendorListVersion')) {
			return callback ({}, false);
		}

		const data = getConsentFieldsObject();

		generateConsentStringV1({
			...data,
			...params
		}, (metadata) => {
			const consent = {
				metadata,
				gdprApplies: config.gdprApplies,
				hasGlobalScope: config.storeConsentGlobally,
				...data,
				cookieVersion: params.cookieVersion,
				vendorListVersion: params.vendorListVersion
			};

			callback(consent, true);
		});
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
		store.updateSection();
		store.toggleConsentToolShowing(true);

		cmpManager.openConsentTool = true;
		cmpManager.notify('openConsentTool', { section: 'intro' });

		callback(true);
	};

	/**
	 * Trigger the consent tool UI to be shown on Detail View
	 */
	const showConsentDetailView = (callback = () => {}) => {
		cmpManager.addEventListener('cmpReady', () => {
			store.updateSection(SECTION_DETAILS);
			store.toggleConsentToolShowing(true);

			cmpManager.openConsentTool = true;
			cmpManager.notify('openConsentTool', { section: 'details' });

			callback(true);
		});
	};

	/**
	 * Trigger the vendors UI to be shown
	 */
	const showVendors = (callback = () => {}) => {
		cmpManager.addEventListener('cmpReady', () => {
			store.updateSection(SECTION_DETAILS, SECTION_VENDORS);
			store.toggleConsentToolShowing(true);

			cmpManager.openConsentTool = true;
			cmpManager.notify('openConsentTool', { section: 'details' });

			callback(true);
		});
	};

	/**
	 * Trigger the footer UI to be shown
	 * */
	const showFooter = (callback = () => {}) => {
		const footerShown = store.toggleFooterShowing(true);
		callback(footerShown);
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
		getConsentFieldsV1,
		getVendorListVersion,
		showConsentTool,
		showConsentDetailView,
		showVendors,
		showFooter,
		registerEventListener,
		unregisterEventListener
	};
};

export default createCommands;
