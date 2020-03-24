import {
	writeConsentCookie,
	decodeConsentData,
	encodeConsentData
} from "./cookie/cookie";
import config from './config';
import { findLocale } from './localize';
import log from './log';
import { GVL, TCModel, Vector } from '@iabtcf/core';

export const SECTION_INTRO = 0;
export const SECTION_DETAILS = 1;
export const SECTION_PURPOSES = 0;
export const SECTION_VENDORS = 1;

export default class Store {
	constructor({
		cmpId,
		cmpVersion = 2,
		cookieVersion = 2,
		consentString
	} = {}) {
		// Keep track of data that has already been persisted
		const consentLanguage = findLocale().substr(0, 2).toUpperCase();
		const tcModel = new TCModel();
		tcModel.cmpId = cmpId;
		tcModel.cmpVersion = cmpVersion;
		tcModel.isServiceSpecific = true;
		tcModel.supportOOB = false;

		this.persistedConsentString = consentString || '';
		this.persistedConsentData = decodeConsentData(consentString) || {};

		this.tcModel = Object.assign(
			tcModel,
			this.persistedConsentData,
			{
				version: cookieVersion,
				cmpId,
				cmpVersion,
				consentLanguage
			});

		this.isConsentToolShowing = false;
		this.isFooterShowing = false;
		this.section = SECTION_INTRO;
		this.subsection = SECTION_PURPOSES;
		this.hasInitialVendorsRejectionOccured = false;
	}

	setCmpApi (cmpApi) {
		this.cmpApi = cmpApi;
		if (this.persistedConsentString) {
			this.cmpApi.update(this.persistedConsentString, false);
		}
	}

	isAllSetTrue = obj => Object.keys(obj).map(key => obj[key]).every((value) => value === true);

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
			version: cookieVersion,
			created,
			lastUpdated,
			cmpId,
			cmpVersion,
			consentScreen,
			consentLanguage,
			vendorListVersion,
			vendorConsents = new Vector(),
			purposeConsents = new Vector(),
			purposeLegitimateInterests = new Vector(),
			vendorLegitimateInterests = new Vector(),
			specialFeatureOptins = new Vector()
		} = persistedConsentData;

		const {purposes = {}, vendors = {}, specialFeatures={}} = vendorList;
		const maxVendorId = vendorConsents.maxId;
		const maxPurposeId = purposeConsents.maxId;
		const maxLegIntId = purposeLegitimateInterests.maxId;
		const maxSpecialFeatureOptInsId = specialFeatureOptins.maxId;

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

		const specialFeatureOptinsMap = {};
		for (let i = 1; i <= lastSpecialFeatureOptInsId; i++) {
			specialFeatureOptinsMap[i] = specialFeatureOptins.has(i);
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
			specialFeatureOptins: specialFeatureOptinsMap,
			vendorConsents: vendorMap,
			vendorLegitimateInterests: vendorLegIntMap
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

		let encodedConsent = encodeConsentData(tcModel);

		if (config.setConsentData) {
			let consentData = encodedConsent;
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
			writeConsentCookie(encodedConsent);
		}

		this.persistedConsentString = encodedConsent;
		this.persistedConsentData = decodeConsentData(encodedConsent);
		this.cmpApi.update(encodedConsent);

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
	};

	selectVendor = (vendorId, isSelected) => {
		const {vendorConsents} = this.tcModel;
		if (isSelected) {
			vendorConsents.set(vendorId);
		} else {
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
		} else {
			vendorLegitimateInterests.unset(vendorId);
		}
		this.storeUpdate();
	};

	selectAllVendorLegitimateInterests = (isSelected, update = true) => {
		const {vendorLegitimateInterests} = this.tcModel;
		const vendorsWithLegIntsIds = Object.keys(this.vendorList.vendors)
			.filter(key => this.vendorList.vendors[key].legIntPurposes.length > 0)
			.map(key => this.vendorList.vendors[key].id);

		vendorsWithLegIntsIds.forEach(id => {
			if (isSelected) {
				vendorLegitimateInterests.set(id);
			} else {
				vendorLegitimateInterests.unset(id);
			}
		});

		if (update) {
			this.storeUpdate();
		}
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
		} else {
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
		if (isSelected) {
			purposeLegitimateInterests.set(purposeId);
		} else {
			purposeLegitimateInterests.unset(purposeId);
		}
		this.storeUpdate();
	};

	selectAllPurposesLegitimateInterests = (isSelected) => {
		const operation = isSelected ? 'setAllPurposeLegitimateInterests' : 'unsetAllPurposeLegitimateInterests';
		this.tcModel[operation]();
		this.storeUpdate();
	};

	selectSpecialFeatureOptins = (specialFeatureId, isSelected) => {
		const { specialFeatureOptins } = this.tcModel;
		if (isSelected) {
			specialFeatureOptins.set(specialFeatureId);
		} else {
			specialFeatureOptins.unset(specialFeatureId);
		}
		this.storeUpdate();
	};

	selectAllSpecialFeatureOptins = (isSelected) => {
		const operation = isSelected ? 'setAllSpecialFeatureOptins' : 'unsetAllSpecialFeatureOptins';
		this.tcModel[operation]();
		this.storeUpdate();
	};

	selectPublisherPurpose = (purposeId, isSelected) => {
		const {publisherConsents} = this.tcModel;
		if (isSelected) {
			publisherConsents.set(purposeId);
		} else {
			publisherConsents.unset(purposeId);
		}
		this.storeUpdate();
	};

	selectAllPublisherPurposes = (isSelected, update = true) => {
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

		if (update) {
			this.storeUpdate();
		}
	};

	selectPublisherLegitimateInterests = (purposeId, isSelected) => {
		const {publisherLegitimateInterests} = this.tcModel;
		if (isSelected) {
			publisherLegitimateInterests.set(purposeId);
		} else {
			publisherLegitimateInterests.unset(purposeId);
		}
		this.storeUpdate();
	};

	selectAllPublisherLegitimateInterests = (isSelected, update) => {
		const {purposes = {}} = this.vendorList || {};
		const {legIntPurposeIds, contractPurposeIds} = config;
		const operation = isSelected ? 'set' : 'unset';
		const publisherLegitimateInterests = [...legIntPurposeIds, ...contractPurposeIds];

		Object.values(purposes).forEach(({id}) => {
			if (publisherLegitimateInterests.includes(id)) {
				this.tcModel.publisherLegitimateInterests[operation](id);
			}
		});

		if (update) {
			this.storeUpdate();
		}
	};

	toggleConsentToolShowing = (isShown) => {
		this.isConsentToolShowing = typeof isShown === 'boolean' ? isShown : !this.isConsentToolShowing;
		if (this.isConsentToolShowing) {
			this.cmpApi.update(this.persistedConsentString, true);
		}
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
		this.isConsentToolShowing = false;
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
			created
		} = this.persistedConsentData;

		const {
			vendors = {},
		} = vendorList || {};

		const persistedMaxVendorId = this.persistedConsentData.vendorConsents && this.persistedConsentData.vendorConsents.maxId || 0;
		this.tcModel.gvl = new GVL(vendorList);
		this.vendorList = vendorList;

		// If vendor and publisher consent data has never been persisted set default selected status
		if (!created) {
			const getIds = (object) => Object.keys(object)
				.filter(key => object[key].id)
				.map(key => object[key].id);

			const purposesIds = getIds(vendorList.purposes);
			const vendorsIds = getIds(vendorList.vendors);
			const specialFeatureIds = getIds(vendorList.specialFeatures);

			this.tcModel.purposeConsents.set(purposesIds);
			this.tcModel.purposeLegitimateInterests.set(purposesIds);
			this.tcModel.vendorConsents.set(vendorsIds);
			this.selectAllVendorLegitimateInterests(true, false);
			this.tcModel.specialFeatureOptins.set(specialFeatureIds);
			this.selectAllPublisherPurposes(true, false);
			this.selectAllPublisherLegitimateInterests(true, false);
		}
		// If vendor consent data has already been persisted set default selected status only for new vendors
		else {
			Object.values(vendors).forEach(v => {
				if (v.id > persistedMaxVendorId) {
					this.tcModel.vendorConsents.set(v.id);
					this.tcModel.vendorLegitimateInterests.set(v.id);
				}
			});
		}

		this.storeUpdate();
	};
}
