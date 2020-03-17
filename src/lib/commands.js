import { TCModel, GVL } from "@iabtcf/core";
import config from "./config";
import {
	encodeVendorConsentData,
	encodeConsentData,
} from "./cookie/cookie";
import {
	CMP_VERSION,
	CMP_ID,
	COOKIE_VERSION
} from "./init";
import {SECTION_DETAILS, SECTION_VENDORS} from "./store";

const arrayFrom = require('core-js/library/fn/array/from');
const COOKIE_VERSION_V1 = 1;

const createCommands = (store, tcfManager) => {

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
		const {
			persistedConsentData
		} = store;

		const {
			created,
			lastUpdated,
			cmpId_: cmpId = store.tcModel.cmpId,
			cmpVersion_: cmpVersion = 1,
			consentScreen_: consentScreen = store.tcModel.consentScreen,
			consentLanguage_: consentLanguage = store.tcModel.consentLanguage,
			vendorListVersion_: vendorListVersion,
		} = persistedConsentData;

		return {
			cmpId,
			cmpVersion,
			consentLanguage,
			consentScreen,
			created,
			vendorListVersion,
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
			consentLanguage_: consentLanguage,
			consentScreen_: consentScreen,
			version_: version = COOKIE_VERSION_V1,
			cmpId_: cmpId = CMP_ID
		} = persistedConsentData;

		const {
			selectedVendorIds = [],
			selectedPurposeIds = [],
			maxVendorId,
			cookieVersion,
			vendorListVersion,
			cmpVersion
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
			version,
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
				vendorListVersion: params.vendorListVersion
			};

			callback(consent, true);
		});
	};

	/**
	 * Generates consent object based on input params: consents and vendor list
	 */
	const getConsentObject = (callback, consents, vendorList) => {

		const { persistedConsentData } = store;

		const tcModel = new TCModel(new GVL(vendorList));
		tcModel.cookieVersion = COOKIE_VERSION;
		tcModel.cmpId = CMP_ID;
		tcModel.cmpVersion = CMP_VERSION;
		tcModel.created = persistedConsentData && persistedConsentData.created || new Date();
		tcModel.lastUpdated = persistedConsentData && persistedConsentData.lastUpdated || new Date();
		tcModel.vendorListVersion = tcModel.vendorListVersion_ = vendorList.vendorListVersion;
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
			specialFeatureOptIns,
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
			specialFeatureOptins: vectorToObject(specialFeatureOptIns),
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

		tcfManager.openConsentTool = true;
		tcfManager.notify('openConsentTool', { section: 'intro' });

		callback(true);
	};

	/**
	 * Trigger the consent tool UI to be shown on Detail View
	 */
	const showConsentDetailView = (callback = () => {}) => {
		store.updateSection(SECTION_DETAILS);
		store.toggleConsentToolShowing(true);

		tcfManager.openConsentTool = true;
		tcfManager.notify('openConsentTool', { section: 'details' });

		callback(true);
	};

	/**
	 * Trigger the vendors UI to be shown
	 */
	const showVendors = (callback = () => {}) => {
		store.updateSection(SECTION_DETAILS, SECTION_VENDORS);
		store.toggleConsentToolShowing(true);

		tcfManager.openConsentTool = true;
		tcfManager.notify('openConsentTool', { section: 'details' });

		callback(true);
	};

	/**
	 * Trigger the footer UI to be shown
	 * */
	const showFooter = (callback = () => {}) => {
		store.toggleFooterShowing(true);
		callback(true);
	};

	return {
		getConsentObject,
		getConsentFieldsV1,
		showConsentTool,
		showConsentDetailView,
		showVendors,
		showFooter
	};
};

export default createCommands;
