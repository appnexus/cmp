import {
	writeConsentCookie,
	decodeConsentData,
	encodeConsentData
} from "./cookie/cookie";
import config from './config';
import { findLocale } from './localize';
import log from './log';
import { GVL, TCModel } from '@iabtcf/core';

export const SECTION_INTRO = 0;
export const SECTION_DETAILS = 1;
export const SECTION_PURPOSES = 0;
export const SECTION_VENDORS = 1;
export const TAB_PUBLISHER_INFO = 0;
export const TAB_CONSENTS = 1;

export default class Store {
	constructor({
		cmpId,
		cmpVersion = 2,
		cookieVersion = 2,
		consentString,
		customVendorsConsent
	} = {}) {
		// Keep track of data that has already been persisted
		const consentLanguage = findLocale().substr(0, 2).toUpperCase();
		const publisherCountryCode = config.publisherCountryCode;
		const tcModel = new TCModel();
		tcModel.cmpId = cmpId;
		tcModel.cmpVersion = cmpVersion;
		tcModel.isServiceSpecific = true;
		tcModel.supportOOB = false;
		tcModel.purposeOneTreatment = config.purposeOneTreatment;
		// decoding to check if string is compatible
		const decodedConsentString = decodeConsentData(consentString);
		const isTCFv2Compatible = decodedConsentString && decodedConsentString.version > 1;
		this.persistedConsentString = isTCFv2Compatible ? consentString : '';
		this.persistedConsentData = isTCFv2Compatible ? decodedConsentString : {};
		this.isCustomVendors = false;
		this.customVendorsConsent = Boolean(customVendorsConsent);

		this.tcModel = Object.assign(
			tcModel,
			this.persistedConsentData,
			{
				version: cookieVersion,
				cmpId,
				cmpVersion,
				consentLanguage,
				publisherCountryCode
			});

		this.shouldDisplayCmpUI = false;
		this.isConsentToolShowing = false;
		this.isFooterShowing = false;
		this.section = SECTION_INTRO;
		this.subsection = SECTION_PURPOSES;
		this.selectedTab = TAB_PUBLISHER_INFO;
		this.hasInitialVendorsRejectionOccured = false;
	}

	setCmpApi(cmpApi, shouldDisplayCmpUI) {
		this.cmpApi = cmpApi;
		this.shouldDisplayCmpUI = shouldDisplayCmpUI;
		this.cmpApi.update(this.persistedConsentString, shouldDisplayCmpUI);
	}

	calculateCustomVendorsConsent(vendorList, tcModel) {
		const prepareIds = (key, excludedId) => {
			let toCheck = Object.keys(vendorList[key]).map(id => parseInt(id, 10));
			const index = toCheck.indexOf(excludedId);
			if (index > -1) {
				toCheck.splice(index, 1);
			}
			return toCheck;
		};
		const checkConsent = (key, consent, excludedId) => {
			const toCheck = prepareIds(key, excludedId);
			return toCheck.every(id => tcModel[consent].has(id));
		};

		return Boolean(this.customVendorsConsent &&
			checkConsent('specialFeatures', 'specialFeatureOptins') &&
			checkConsent('purposes', 'purposeConsents') &&
			checkConsent('purposes', 'purposeLegitimateInterests', 1) // 1st purpose can be never marked as legitimate interests
		);
	}

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
			vendors = null
		} = vendorList || {};

		if (vendors) {
			this.filterVendorConsents(vendors);
		}

		const now = new Date();
		tcModel.created = tcModel.created || now;
		tcModel.lastUpdated = now;
		tcModel.vendorListVersion = vendorListVersion;

		let encodedConsent = encodeConsentData(tcModel);

		this.persistedConsentString = encodedConsent;
		this.persistedConsentData = decodeConsentData(encodedConsent);
		this.cmpApi.update(encodedConsent);
		// It is very important to call config.setConsentData after cmpApi model update
		// because, to set pubConsent cookie with `npa` value during config.setConsentData processing
		// we use data from cmpApi to calculate `npa`
		if (config.setConsentData) {
			let consentString = encodedConsent;
			const customVendorsConsent = this.calculateCustomVendorsConsent(vendorList, tcModel);
			try {
				config.setConsentData({ consentString, customVendorsConsent }, err => {
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

		// Notify of date changes
		this.storeUpdate();
	};

	filterVendorConsents = (vendors) => {
		const {vendorConsents, vendorLegitimateInterests} = this.tcModel;
		const availableIds = new Set();

		for (let key in vendors) {
			if (vendors.hasOwnProperty(key)) {
				availableIds.add(vendors[key].id);
			}
		}

		const unsetMissingVendors = consents => {
			consents.forEach((value, id) => availableIds.has(id) || consents.unset(id));
		};

		unsetMissingVendors(vendorConsents);
		unsetMissingVendors(vendorLegitimateInterests);
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

	setCustomVendorsConsent = isSelected => {
		this.customVendorsConsent = isSelected ? 1 : 0;
		this.storeUpdate();

	};

	selectAllVendors = (isSelected) => {
		const operation = isSelected ? 'setAllVendorConsents' : 'unsetAllVendorConsents';
		this.tcModel[operation]();
		this.setCustomVendorsConsent(isSelected);
		this.storeUpdate();
	};

	selectVendorLegitimateInterests = (vendorId, isSelected, update = true) => {
		const {vendorLegitimateInterests} = this.tcModel;
		const hasLegInts = this.vendorList.vendors[vendorId].legIntPurposes.length > 0;

		if (hasLegInts) {
			if (isSelected) {
				vendorLegitimateInterests.set(vendorId);
			} else {
				vendorLegitimateInterests.unset(vendorId);
			}
		}

		if (update) {
			this.storeUpdate();
		}
	};

	getVendorsWithLegIntsIds = () => Object.keys(this.vendorList.vendors)
		.filter(key => this.vendorList.vendors[key].legIntPurposes.length > 0)
		.map(key => this.vendorList.vendors[key].id);


	selectAllVendorLegitimateInterests = (isSelected, update = true) => {
		const {vendorLegitimateInterests} = this.tcModel;
		const vendorsWithLegIntsIds = this.getVendorsWithLegIntsIds();

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
			this.setCustomVendorsConsent(false);
			this.selectAllVendors(false);
			this.hasInitialVendorsRejectionOccured = true;
		}
	};

	selectPurpose = (purposeId, isSelected) => {
		const {contractPurposeIds} = config;
		const {purposeConsents} = this.tcModel;

		if (contractPurposeIds.includes(purposeId)) {
			return;
		}

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
		const {contractPurposeIds} = config;
		const {publisherConsents} = this.tcModel;

		if (contractPurposeIds.includes(purposeId)) {
			return;
		}

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
		const publisherLegalBasedPurposes = [...legIntPurposeIds, ...contractPurposeIds];
		const availablePurposes = Object.values(purposes).map(({id}) => id).filter((purposeId) => !publisherLegalBasedPurposes.includes(purposeId));

		Object.values(purposes).forEach(({id}) => {
			if (availablePurposes.includes(id)) {
				this.tcModel.publisherConsents[operation](id);
			}
		});

		if (update) {
			this.storeUpdate();
		}
	};

	setAllContractPurposes = (update) => {
		const {purposes = {}} = this.vendorList || {};
		const {contractPurposeIds} = config;

		Object.values(purposes).forEach(({id}) => {
			if (contractPurposeIds.includes(id)) {
				this.tcModel.publisherConsents.set(id);
				this.tcModel.vendorConsents.set(id);
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
		const {legIntPurposeIds} = config;
		const operation = isSelected ? 'set' : 'unset';

		Object.values(purposes).forEach(({id}) => {
			if (legIntPurposeIds.includes(id)) {
				this.tcModel.publisherLegitimateInterests[operation](id);
			}
		});

		if (update) {
			this.storeUpdate();
		}
	};

	toggleConsentToolShowing = (isShown) => {
		const isConsentToolShowing = typeof isShown === 'boolean' ? isShown : !this.isConsentToolShowing;
		if (isConsentToolShowing) {
			if (!this.isConsentToolShowing && !this.shouldDisplayCmpUI) {
				this.cmpApi.update(this.persistedConsentString, true);
			}
			this.shouldDisplayCmpUI = false;
		}
		this.isConsentToolShowing = isConsentToolShowing;
		this.isFooterShowing = false;
		this.storeUpdate();
	};

	toggleFooterShowing = (isShown) => {
		if (this.isConsentToolShowing) {
			return false;
		}
		this.isFooterShowing = typeof isShown === 'boolean' ? isShown : !this.isFooterShowing;
		this.isConsentToolShowing = false;
		this.storeUpdate();
		return true;
	};

	updateSection = (section = SECTION_INTRO, subsection = SECTION_PURPOSES) => {
		this.section = section;
		this.updateSubsection(subsection);
	};

	updateSubsection = (subsection) => {
		this.subsection = subsection;
		this.storeUpdate();
	};

	updateSelectedTab = (tab = TAB_PUBLISHER_INFO) => {
		this.selectedTab = tab;
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
			this.setAllContractPurposes(false);
		}
		// If vendor consent data has already been persisted set default selected status only for new vendors
		else {
			Object.values(vendors).forEach(v => {
				if (v.id > persistedMaxVendorId) {
					this.tcModel.vendorConsents.set(v.id);
					this.selectVendorLegitimateInterests(v.id, true, false);
				}
			});
		}

		this.storeUpdate();
	};
}
