import { writeConsentCookie } from "./cookie/cookie";
import config from './config';
import { findLocale } from './localize';
import log from './log';
import { GVL, TCModel, TCString, Vector } from '@iabtcf/core';

export const SECTION_INTRO = 0;
export const SECTION_DETAILS = 1;
export const SECTION_PURPOSES = 0;
export const SECTION_VENDORS = 1;

/**
 * Copy a data object and make sure to replace references
 * of Set objects with new ones.
 */
function copyData(dataObject) {
	if (typeof dataObject !== 'object') {
		return dataObject;
	}
	const copy = {...dataObject};
	for (let key in copy) {
		if (copy.hasOwnProperty(key) && copy[key] instanceof Set) {
			copy[key] = new Set(copy[key]);
		}
	}
	return copy;
}

export default class Store {
	constructor({
		cmpId = 1,
		cmpVersion = 2,
		cookieVersion = 2,
		consentData,
		cmpApi
	} = {}) {
		// Keep track of data that has already been persisted
		consentData = consentData || {};
		this.persistedConsentData = copyData(consentData);
		const consentLanguage = findLocale().substr(0, 2).toUpperCase();
		const tcModel = new TCModel();
		tcModel.cmpId = cmpId;
		tcModel.cmpVersion = cmpVersion;

		this.tcModel = Object.assign(
			tcModel,
			consentData,
			{
				cookieVersion,
				cmpId,
				cmpVersion,
				consentLanguage
			});

		this.cmpApi = cmpApi;
		this.isConsentToolShowing = this.cmpApi.uiVisible = false;
		this.isFooterShowing = false;
		this.section = SECTION_INTRO;
		this.subsection = SECTION_PURPOSES;
		this.hasInitialVendorsRejectionOccured = false;
	}

	isAllSetTrue = obj => {
		return Object.keys(obj).map(key => obj[key]).every((value) => value === true);
	};

	/**
	 * Build vendor consent object from data that has already been persisted. This
	 * list will only return consent=true for vendors that exist in the current
	 * vendorList.
	 */
	getVendorConsentsObject = (vendorIds) => {
		const {
			vendorList = {},
			persistedConsentData,
		} = this;

		const {
			version_: cookieVersion,
			created,
			lastUpdated,
			cmpId_: cmpId,
			cmpVersion_: cmpVersion,
			consentScreen_: consentScreen,
			consentLanguage_: consentLanguage,
			vendorListVersion_: vendorListVersion,
			vendorConsents = new Vector(),
			purposeConsents = new Vector(),
			purposeLegitimateInterests = new Vector(),
			vendorLegitimateInterests = new Vector(),
			specialFeatureOptIns = new Vector()
		} = persistedConsentData;

		const {purposes = {}, vendors = {}, specialFeatures={}} = vendorList;
		const maxVendorId = vendorConsents.maxId;
		const maxPurposeId = purposeConsents.maxId;
		const maxLegIntId = purposeLegitimateInterests.maxId;
		const maxSpecialFeatureOptInsId = specialFeatureOptIns.maxId;

		// Map requested vendorIds
		const vendorMap = {};
		const vendorLegIntMap = {};


		if (vendorIds && vendorIds.length) {
			vendorIds.forEach(id => {
				vendorMap[id] = vendorConsents.has(id);
				vendorLegIntMap[id] = vendorLegitimateInterests.has(id);
			});
		} else {
			// In case the vendor list has not been loaded yet find the highest
			// vendor ID to map any consent data we already have
			const lastVendorId = Math.max(maxVendorId,
				...Object.values(vendors).map(({id}) => id)
			);

			// Map all IDs up to the highest vendor ID found
			for (let i = 1; i <= lastVendorId; i++) {
				vendorMap[i] = vendorConsents.has(i);
				vendorLegIntMap[i] = vendorLegitimateInterests.has(i);
			}
		}

		const lastPurposeId = Math.max(
			...[maxPurposeId],
			...Object.values(purposes).map(({id}) => id),
		);

		const purposeMap = {};
		for (let i = 1; i <= lastPurposeId; i++) {
			purposeMap[i] = purposeConsents.has(i);
		}

		const lastLegIntId = Math.max(
			...[maxLegIntId],
			...Object.values(purposes).map(({id}) => id),
		);

		const legIntMap = {};
		for (let i = 1; i <= lastLegIntId; i++) {
			legIntMap[i] = purposeLegitimateInterests.has(i);
		}

		const lastSpecialFeatureOptInsId = Math.max(
			...[maxSpecialFeatureOptInsId],
			...Object.values(specialFeatures).map(({id}) => id),
		);

		const specialFeatureOptInsMap = {};
		for (let i = 1; i <= lastSpecialFeatureOptInsId; i++) {
			specialFeatureOptInsMap[i] = specialFeatureOptIns.has(i);
		}

		return {
			cookieVersion,
			created,
			lastUpdated,
			cmpId,
			cmpVersion,
			consentScreen,
			consentLanguage,
			vendorListVersion,
			purposeConsents: purposeMap,
			purposeLegitimateInterests: legIntMap,
			specialFeatureOptIns: specialFeatureOptInsMap,
			vendorConsents: vendorMap,
			vendorLegitimateInterests: vendorLegIntMap
		};
	};

	/**
	 * Build publisher consent object from data that has already been persisted.
	 * Purposes will only have consent=true if they exist in the current vendorList.
	 */
	getPublisherConsentsObject = () => {
		const {
			vendorList = {},
			persistedConsentData = {}
		} = this;

		const {
			version_: cookieVersion,
			created,
			lastUpdated,
			cmpId_: cmpId,
			vendorListVersion_: vendorListVersion,
			publisherConsents = new Vector(),
			publisherLegitimateInterests = new Vector(),
			publisherCustomConsents = new Vector(),
			publisherCustomLegitimateInterests = new Vector(),
		} = persistedConsentData;

		const {purposes = {}} = vendorList;
		let publisherCustomPurposesMap = {};
		let publisherCustomLegIntMap = {};

		const maxPersistedPublisherPurposeId = publisherConsents.maxId;
		const maxPersistedPublisherLegIntId = publisherLegitimateInterests.maxId;

		const lastPublisherPurposeId = Math.max(
			...Object.values(purposes).map(({id}) => id),
			...[maxPersistedPublisherPurposeId]);

		const publisherPurposesMap = {};
		for (let i = 1; i <= lastPublisherPurposeId; i++) {
			publisherPurposesMap[i] = publisherConsents.has(i);
		}

		const lastPublisherLegIntId = Math.max(
			...Object.values(purposes).map(({id}) => id),
			...[maxPersistedPublisherLegIntId]);

		const publisherLegIntMap= {};
		for (let i = 1; i <= lastPublisherLegIntId; i++) {
			publisherLegIntMap[i] = publisherLegitimateInterests.has(i);
		}

		if (publisherCustomConsents.size) {
			const maxPersistedPublisherCustomPurposeId = publisherCustomConsents.maxId;

			const lastPublisherCustomPurposeId = Math.max(
				...Object.values(purposes).map(({id}) => id),
				...[maxPersistedPublisherCustomPurposeId]);

			publisherCustomPurposesMap = {};
			for (let i = 1; i <= lastPublisherCustomPurposeId; i++) {
				publisherCustomPurposesMap[i] = publisherCustomConsents.has(i);
			}
		}

		if (publisherCustomLegitimateInterests.size) {
			const maxPersistedPublisherCustomLegIntId = publisherCustomLegitimateInterests.maxId;

			const lastPublisherCustomLegIntId = Math.max(
				...Object.values(purposes).map(({id}) => id),
				...[maxPersistedPublisherCustomLegIntId]);

			publisherCustomLegIntMap = {};
			for (let i = 1; i <= lastPublisherCustomLegIntId; i++) {
				publisherCustomLegIntMap[i] = publisherCustomLegitimateInterests.has(i);
			}
		}

		return {
			cookieVersion,
			created,
			lastUpdated,
			cmpId,
			vendorListVersion,
			publisherConsents: publisherPurposesMap,
			publisherLegitimateInterests: publisherLegIntMap,
			publisherCustomConsents: publisherCustomPurposesMap,
			publisherCustomLegitimateInterests: publisherCustomLegIntMap
		};
	};

	/**
	 * Build consent fields object from data that has already been persisted.
	 */
	getConsentFieldsObject = () => {
		const {
			tcModel
		} = this;

		const consentObject = TCString.decode(TCString.encode(tcModel));

		const {
			created,
			lastUpdated,
			cmpId,
			cmpVersion,
			consentScreen,
			consentLanguage,
			vendorListVersion,
			globalVendorListVersion,
			version
		} = consentObject;

		return {
			cmpId,
			cmpVersion,
			consentLanguage,
			consentScreen,
			created,
			globalVendorListVersion,
			vendorListVersion,
			lastUpdated,
			version
		};
	};
	/**
	 * Persist all consent data to the cookie.  This data will NOT be filtered
	 * by the vendorList and will include global consents set no matter what
	 * was allowed by the list.
	 */
	persist = () => {
		const {
			vendorList,
			tcModel
		} = this;

		const {
			vendorListVersion = 1,
		} = vendorList || {};

		const now = new Date();
		tcModel.created = tcModel.created || now;
		tcModel.lastUpdated = now;
		tcModel.vendorListVersion = vendorListVersion;

		let encodedConsent = TCString.encode(this.tcModel);

		if (config.setConsentData) {
			let consentData = {
				vendor: encodedConsent,
				publisher: 'aaa'
			};
			try {
				config.setConsentData(consentData, err => {
					if (err) {
						log.error('Failed writing external consent data', err);
					}
				});
			} catch (err) {
				log.error('Failed writing external consent data', err);
			}
		} else  {
			writeConsentCookie(encodedConsent)
		}

		this.persistedConsentData = TCString.decode(encodedConsent);

		// Notify of date changes
		this.storeUpdate();
	};

	listeners = new Set();

	subscribe = (callback) => {
		this.listeners.add(callback);
	};

	unsubscribe = (callback) => {
		this.listeners.delete(callback);
	};

	storeUpdate = () => {
		this.listeners.forEach(callback => callback(this));
		this.cmpApi.tcModel = this.tcModel;
	};

	selectVendor = (vendorId, isSelected) => {
		const {vendorConsents} = this.tcModel;
		if (isSelected) {
			vendorConsents.set(vendorId);
		}
		else {
			vendorConsents.unset(vendorId);
		}
		this.storeUpdate();
	};

	selectVendors = (vendorIds, isSelected) => {
		const {vendorConsents} = this.tcModel;
		if (isSelected) {
			vendorIds.forEach(id => {
				vendorConsents.set(id);
			});
		} else {
			vendorIds.forEach(id => {
				vendorConsents.unset(id);
			});
		}
		this.storeUpdate();
	};

	selectAllVendors = (isSelected) => {
		const operation = isSelected ? 'setAllVendorConsents' : 'unsetAllVendorConsents';
		this.tcModel[operation]();
		this.storeUpdate();
	};

	selectVendorLegitimateInterests = (vendorId, isSelected) => {
		const {vendorLegitimateInterests} = this.tcModel;
		if (isSelected) {
			vendorLegitimateInterests.set(vendorId);
		}
		else {
			vendorLegitimateInterests.unset(vendorId);
		}
		this.storeUpdate();
	};

	selectAllVendorLegitimateInterests = (isSelected) => {
		const operation = isSelected ? 'setAllVendorLegitimateInterests' : 'unsetAllVendorLegitimateInterests';
		this.tcModel[operation]();
		this.storeUpdate();
	};

	initialVendorsRejection = () => {
		//vendors rejection can occurs only once in the lifetime of application
		//should only be called if user vendor consent has not been created yet
		if (!this.hasInitialVendorsRejectionOccured) {
			this.selectAllVendors(false);
			this.hasInitialVendorsRejectionOccured = true;
		}
	};

	selectPurpose = (purposeId, isSelected) => {
		const {purposeConsents} = this.tcModel;
		if (isSelected) {
			purposeConsents.set(purposeId);
		}
		else {
			purposeConsents.unset(purposeId);
		}
		this.storeUpdate();
	};

	selectAllPurposes = (isSelected) => {
		const operation = isSelected ? 'setAllPurposeConsents' : 'unsetAllPurposeConsents';
		this.tcModel[operation]();
		this.storeUpdate();
	};

	selectPurposeLegitimateInterests = (purposeId, isSelected) => {
		const {purposeLegitimateInterests} = this.tcModel;
		console.log(this.tcModel);
		console.log(purposeId);
		if (isSelected) {
			purposeLegitimateInterests.set(purposeId);
		}
		else {
			purposeLegitimateInterests.unset(purposeId);
		}
		this.storeUpdate();
	};

	selectAllPurposesLegitimateInterests = (isSelected) => {
		const operation = isSelected ? 'setAllPurposeLegitimateInterests' : 'unsetAllPurposeLegitimateInterests';
		this.tcModel[operation]();
		this.storeUpdate();
	};

	selectSpecialFeature = (specialFeatureId, isSelected) => {
		const { specialFeatureOptIns } = this.tcModel;
		if (isSelected) {
			specialFeatureOptIns.set(specialFeatureId);
		} else {
			specialFeatureOptIns.unset(specialFeatureId);
		}
	};

	selectAllSpecialFeatureOptIns = (isSelected) => {
		const operation = isSelected ? 'setAllSpecialFeatureOptIns' : 'unsetAllSpecialFeatureOptIns';
		this.tcModel[operation]();
		this.storeUpdate();
	};

	selectPublisherPurpose = (purposeId, isSelected) => {
		const {publisherConsents} = this.tcModel;
		if (isSelected) {
			publisherConsents.set(purposeId);
		}
		else {
			publisherConsents.unset(purposeId);
		}
		this.storeUpdate();
	};

	selectAllPublisherPurposes = (isSelected) => {
		const {purposes = {}} = this.vendorList || {};
		const operation = isSelected ? 'set' : 'unset';
		const {legIntPurposeIds, contractPurposeIds} = config;
		const publisherLegitimateInterests = [...legIntPurposeIds, ...contractPurposeIds];
		const availablePurposes = Object.values(purposes).map(({id}) => id).filter((purposeId) => !publisherLegitimateInterests.includes(purposeId));

		Object.values(purposes).forEach(({id}) => {
			if (availablePurposes.includes(id)) {
				this.tcModel.publisherConsents[operation](id);
			}
		});

		this.storeUpdate();
	};

	selectPublisherLegitimateInterests = (purposeId, isSelected) => {
		const {publisherLegitimateInterests} = this.tcModel;
		if (isSelected) {
			publisherLegitimateInterests.set(purposeId);
		}
		else {
			publisherLegitimateInterests.unset(purposeId);
		}
		this.storeUpdate();
	};

	selectAllPublisherLegitimateInterests = (isSelected) => {
		const {purposes = {}} = this.vendorList || {};
		const {legIntPurposeIds, contractPurposeIds} = config;
		const operation = isSelected ? 'set' : 'unset';
		const publisherLegitimateInterests = [...legIntPurposeIds, ...contractPurposeIds];

		Object.values(purposes).forEach(({id}) => {
			if (publisherLegitimateInterests.includes(id)) {
				this.tcModel.publisherLegitimateInterests[operation](id)
			}
		});

		this.storeUpdate();
	};

	toggleConsentToolShowing = (isShown) => {
		this.isConsentToolShowing = this.cmpApi.uiVisible = typeof isShown === 'boolean' ? isShown : !this.isConsentToolShowing;
		this.isFooterShowing = false;
		this.storeUpdate();
	};

	toggleFooterShowing = (isShown) => {
		const vendorConsentsObject = this.getVendorConsentsObject();

		if (this.isAllSetTrue(vendorConsentsObject.purposeConsents)) {
			let vendorConsents;
			if (this.vendorList) {
				const {vendors = {}} = this.vendorList;
				const vendorIds = new Set(Object.values(vendors).map(({id}) => id));
				vendorConsents = {};
				Object.keys(vendorConsentsObject.vendorConsents).filter(id => vendorIds.has(Number(id))).forEach(id => {
					vendorConsents[id] = vendorConsentsObject.vendorConsents[id];
				});
			} else {
				vendorConsents = vendorConsentsObject.vendorConsents;
			}
			if (this.isAllSetTrue(vendorConsents)) {
				isShown = false;
			}
		}
		this.isFooterShowing = typeof isShown === 'boolean' ? isShown : !this.isFooterShowing;
		this.isConsentToolShowing = this.cmpApi.uiVisible = false;
		this.storeUpdate();
	};

	updateSection = (section = SECTION_INTRO, subsection = SECTION_PURPOSES) => {
		this.section = section;
		this.updateSubsection(subsection);
	};

	updateSubsection = (subsection) => {
		this.subsection = subsection;
		this.storeUpdate();
	};

	updateVendorList = (vendorList) => {
		const {
			created,
		} = this.persistedConsentData || {};

		const {
			vendors = {},
		} = vendorList || {};

		const persistedMaxVendorId = this.persistedConsentData.vendorConsents && this.persistedConsentData.vendorConsents.maxId || 0;

		this.tcModel.gvl = new GVL(vendorList);
		this.vendorList = vendorList;

		// If vendor and publisher consent data has never been persisted set default selected status
		if (!created) {
			this.selectAllPurposes(true);
			this.selectAllPurposesLegitimateInterests(true);
			this.selectAllVendors(true);
			this.selectAllVendorLegitimateInterests(true);
			this.selectAllSpecialFeatureOptIns(true);

			this.selectAllPublisherPurposes(true);
			this.selectAllPublisherLegitimateInterests(true);
		}
		// If vendor consent data has already been persisted set default selected status only for new vendors
		else {
			Object.values(vendors).forEach(v => {
				if (v.id > persistedMaxVendorId) {
					this.tcModel.vendorConsents.set(v.id);
				}
			});
		}

		this.storeUpdate();
	};
}
