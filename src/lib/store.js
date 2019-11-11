import { writePublisherConsentCookie, writeVendorConsentCookie,encodePublisherConsentData, encodeVendorConsentData } from "./cookie/cookie";
import config from './config';
import { findLocale } from './localize';
import log from './log';
const arrayFrom = require('core-js/library/fn/array/from');

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
		cmpVersion = 1,
		cookieVersion = 1,
		vendorConsentData,
		globalVendorConsentData,
		publisherConsentData,
		vendorList,
		customPurposeList,
		pubVendorsList,
		allowedVendorIds
	} = {}) {
		// Keep track of data that has already been persisted
		this.persistedVendorConsentData = copyData(vendorConsentData);
		this.persistedPublisherConsentData = copyData(publisherConsentData);
		this.persistedGlobalVendorConsentData = copyData(globalVendorConsentData);

		const consentLanguage = findLocale().substr(0, 2).toUpperCase();
		this.vendorConsentData = Object.assign(
			{
				selectedPurposeIds: new Set(),
				selectedVendorIds: new Set()
			},
			vendorConsentData,
			{
				cookieVersion,
				cmpId,
				cmpVersion,
				consentLanguage
			});

		this.globalVendorConsentData = Object.assign(
			{
				selectedPurposeIds: new Set(),
				selectedVendorIds: new Set()
			},
			globalVendorConsentData,
			{
				cookieVersion,
				cmpId,
				cmpVersion,
				consentLanguage
			}
		);

		this.publisherConsentData = Object.assign(
			{
				selectedCustomPurposeIds: new Set()
			},
			publisherConsentData,
			{
				cookieVersion,
				cmpId
			});
		this.globalVendorIdsPresentOnList = new Map();
		this.pubVendorsList = pubVendorsList;
		this.allowedVendorIds = new Set(allowedVendorIds);
		this.isConsentToolShowing = false;
		this.isFooterShowing = false;
		this.isDetailViewAsDefault = false;

		this.updateVendorList(vendorList);
		this.updateCustomPurposeList(customPurposeList);
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
			persistedVendorConsentData = {},
			pubVendorsList = {},
			allowedVendorIds,
		} = this;

		const {
			publisherVendorsVersion,
			globalVendorListVersion
		} = pubVendorsList;

		const {
			cookieVersion,
			created,
			lastUpdated,
			cmpId,
			cmpVersion,
			consentScreen,
			consentLanguage,
			vendorListVersion,
			maxVendorId = 0,
			selectedVendorIds = new Set(),
			selectedPurposeIds = new Set()
		} = persistedVendorConsentData;

		const {purposes = [], vendors = []} = vendorList;

		// Map requested vendorIds
		const vendorMap = {};
		if (vendorIds && vendorIds.length) {
			vendorIds.forEach(id => vendorMap[id] = selectedVendorIds.has(id) && (!allowedVendorIds.size || allowedVendorIds.has(id)));
		}
		else {
			// In case the vendor list has not been loaded yet find the highest
			// vendor ID to map any consent data we already have
			const lastVendorId = Math.max(maxVendorId,
				...vendors.map(({id}) => id),
				...arrayFrom(selectedVendorIds));

			// Map all IDs up to the highest vendor ID found
			for (let i = 1; i <= lastVendorId; i++) {
				vendorMap[i] = selectedVendorIds.has(i) && (!allowedVendorIds.size || allowedVendorIds.has(i));
			}
		}

		// Map all purpose IDs
		const lastPurposeId = Math.max(
			...purposes.map(({id}) => id),
			...arrayFrom(selectedPurposeIds));

		const purposeMap = {};
		for (let i = 1; i <= lastPurposeId; i++) {
			purposeMap[i] = selectedPurposeIds.has(i);
		}

		return {
			cookieVersion,
			created,
			lastUpdated,
			cmpId,
			cmpVersion,
			consentScreen,
			consentLanguage,
			publisherVendorsVersion,
			globalVendorListVersion,
			vendorListVersion,
			maxVendorId,
			purposeConsents: purposeMap,
			vendorConsents: vendorMap
		};
	};

	/**
	 * Build publisher consent object from data that has already been persisted.
	 * Purposes will only have consent=true if they exist in the current vendorList.
	 */
	getPublisherConsentsObject = () => {
		const {
			vendorList = {},
			customPurposeList = {},
			persistedPublisherConsentData = {},
			persistedVendorConsentData = {}
		} = this;

		const {
			cookieVersion,
			created,
			lastUpdated,
			cmpId,
			vendorListVersion,
			publisherPurposeVersion,
			selectedCustomPurposeIds = new Set()
		} = persistedPublisherConsentData;

		const {selectedPurposeIds = new Set()} = persistedVendorConsentData;
		const {purposes = []} = vendorList;
		const {purposes: customPurposes = []} = customPurposeList;

		const lastStandardPurposeId = Math.max(
			...purposes.map(({id}) => id),
			...arrayFrom(selectedPurposeIds));

		const lastCustomPurposeId = Math.max(
			...customPurposes.map(({id}) => id),
			...arrayFrom(selectedPurposeIds));

		// Map all purpose IDs
		const standardPurposeMap = {};
		for (let i = 1; i <= lastStandardPurposeId; i++) {
			standardPurposeMap[i] = selectedPurposeIds.has(i);
		}
		const customPurposeMap = {};
		for (let i = 1; i <= lastCustomPurposeId; i++) {
			customPurposeMap[i] = selectedCustomPurposeIds.has(i);
		}

		return {
			cookieVersion,
			created,
			lastUpdated,
			cmpId,
			vendorListVersion,
			publisherPurposeVersion,
			standardPurposes: standardPurposeMap,
			customPurposes: customPurposeMap
		};
	};

	/**
	 * Build consent fields object from data that has already been persisted.
	 */
	getConsentFieldsObject = () => {
		const {
			persistedVendorConsentData = {},
			vendorConsentData = {}
		} = this;
		const {
			cmpId,
			cmpVersion,
			consentLanguage,
			consentScreen = 0,
			cookieVersion,
			created,
			globalVendorListVersion,
			lastUpdated,
			publisherVendorsVersion,
			vendorListVersion
		} = {
			...vendorConsentData,
			...persistedVendorConsentData
		};
		return {
			cmpId,
			cmpVersion,
			consentLanguage,
			consentScreen,
			cookieVersion,
			created,
			globalVendorListVersion,
			vendorListVersion,
			lastUpdated,
			publisherVendorsVersion
		};
	};
	/**
	 * Persist all consent data to the cookie.  This data will NOT be filtered
	 * by the vendorList and will include global consents set no matter what
	 * was allowed by the list.
	 */
	persist = () => {
		const {
			vendorConsentData,
			globalVendorConsentData,
			publisherConsentData,
			vendorList,
			customPurposeList
		} = this;

		const {
			vendorListVersion = 1,
			globalVendorListVersion = 1
		} = vendorList || {};

		// Update modification dates and write the cookies
		const now = new Date();
		vendorConsentData.created = vendorConsentData.created || now;
		vendorConsentData.lastUpdated = now;
		globalVendorConsentData.created = globalVendorConsentData.created || now;
		globalVendorConsentData.lastUpdated = now;

		// Update version of list to one we are using
		vendorConsentData.vendorListVersion = vendorListVersion;
		globalVendorConsentData.vendorListVersion = globalVendorListVersion;
		publisherConsentData.vendorListVersion = vendorListVersion;

		publisherConsentData.created = publisherConsentData.created || now;
		publisherConsentData.lastUpdated = now;

		const vendorConsents = {...vendorConsentData, vendorList};
		const publisherConsents = {
			...vendorConsentData,
			...publisherConsentData,
			vendorList,
			customPurposeList
		};
		if (config.setConsentData) {
			let consentData = {
				vendor: encodeVendorConsentData(vendorConsents)
			};
			if (config.storePublisherData) {
				consentData.publisher = encodePublisherConsentData(publisherConsents);
			}
			try {
				config.setConsentData(consentData, err => {
					if (err) {
						log.error('Failed writing external consent data', err);
					}
				});
			} catch (err) {
				log.error('Failed writing external consent data', err);
			}
			// Write vendor cookie to appropriate domain
			this.mergeVendorConsentsToGlobalCookie();
			this.mergePurposeConsentsToGlobalCookie();

			const globalVendorConsents = {...globalVendorConsentData, vendorList};
			writeVendorConsentCookie(globalVendorConsents);

			this.persistedGlobalVendorConsentData = copyData(globalVendorConsentData);
		} else  {
			// Write vendor cookie to appropriate domain
			writeVendorConsentCookie(vendorConsents);

			// Write publisher cookie if enabled
			if (config.storePublisherData) {
				writePublisherConsentCookie(publisherConsents);
			}
		}

		// Store the persisted data
		this.persistedVendorConsentData = copyData(vendorConsentData);
		this.persistedPublisherConsentData = copyData(publisherConsentData);

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
		const {selectedVendorIds} = this.vendorConsentData;
		if (isSelected) {
			selectedVendorIds.add(vendorId);
		}
		else {
			selectedVendorIds.delete(vendorId);
		}
		this.storeUpdate();
	};

	selectAllVendors = (isSelected) => {
		const {vendors = []} = this.vendorList || {};
		const operation = isSelected ? 'add' : 'delete';
		vendors.forEach(({id}) => this.vendorConsentData.selectedVendorIds[operation](id));
		this.storeUpdate();
	};

	selectPurpose = (purposeId, isSelected) => {
		const {selectedPurposeIds} = this.vendorConsentData;
		if (isSelected) {
			selectedPurposeIds.add(purposeId);
		}
		else {
			selectedPurposeIds.delete(purposeId);
		}
		this.storeUpdate();
	};

	selectAllPurposes = (isSelected) => {
		const {purposes = []} = this.vendorList || {};
		const operation = isSelected ? 'add' : 'delete';
		purposes.forEach(({id}) => this.vendorConsentData.selectedPurposeIds[operation](id));
		this.storeUpdate();
	};

	selectCustomPurpose = (purposeId, isSelected) => {
		const {selectedCustomPurposeIds} = this.publisherConsentData;
		if (isSelected) {
			selectedCustomPurposeIds.add(purposeId);
		}
		else {
			selectedCustomPurposeIds.delete(purposeId);
		}
		this.storeUpdate();
	};

	selectAllCustomPurposes = (isSelected) => {
		const {purposes = []} = this.customPurposeList || {};
		const operation = isSelected ? 'add' : 'delete';
		purposes.forEach(({id}) => this.publisherConsentData.selectedCustomPurposeIds[operation](id));
		this.storeUpdate();
	};

	toggleConsentToolShowing = (isShown) => {
		this.isConsentToolShowing = typeof isShown === 'boolean' ? isShown : !this.isConsentToolShowing;
		this.isFooterShowing = false;
		this.storeUpdate();
	};

	toggleFooterShowing = (isShown) => {
		const vendorConsentsObject = this.getVendorConsentsObject();
		if (this.isAllSetTrue(vendorConsentsObject.purposeConsents)) {
			let vendorConsents;
			if (this.vendorList) {
				const {vendors = {}} = this.vendorList;
				const vendorIds = new Set(vendors.map(({id}) => id));
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

	toogleDetailViewAsDefault = (isDefault) => {
		this.isDetailViewAsDefault = typeof isDefault === 'boolean' ? isDefault : !this.isDetailViewAsDefault;
		this.storeUpdate();
	};

	updateVendorList = vendorList => {
		const {
			pubVendorsList = {},
			allowedVendorIds
		} = this;

		const {
			created,
			maxVendorId = 0
		} = this.vendorConsentData;

		if (vendorList) {
			// Filter vendors in vendorList by allowedVendorIds
			if (vendorList.vendors && allowedVendorIds.size) {
				vendorList.vendors = vendorList.vendors.filter(({id}) => allowedVendorIds.has(id));
			}

			// If a pubVendorList is applied make the vendor list version = 0
			const { publisherVendorsVersion } = pubVendorsList;
			vendorList.vendorListVersion = publisherVendorsVersion ? 0 : vendorList.vendorListVersion;
		}

		const {
			vendors = [],
			purposes = [],
		} = vendorList || {};

		//collection of global and local vendor ids [global id, local id]
		this.globalVendorIdsPresentOnList = new Map(vendors.filter(vendor => vendor.external_id).map(vendor => {
			return [vendor.external_id, vendor.id];
		}));

		// If vendor consent data has never been persisted set default selected status
		if (!created) {
			this.vendorConsentData.selectedPurposeIds = new Set(purposes.map(p => p.id));
			this.vendorConsentData.selectedVendorIds = new Set(vendors.map(v => v.id));
		}

		// If vendor consent data has already been persisted set default selected status only for new vendors
		else {
			vendors.forEach(v => {
				if (v.id > this.persistedVendorConsentData.maxVendorId) {
					this.vendorConsentData.selectedVendorIds.add(v.id);
				}
			});
		}


		const {selectedVendorIds = new Set()} = this.vendorConsentData;
		const {
			selectedVendorIds : selectedGlobalVendorIds = new Set(),
			maxVendorId : maxGlobalVendorId = 0 } = this.globalVendorConsentData;

		//Find the maxVendorId for globalVendor
		this.globalVendorConsentData.maxVendorId = Math.max(maxGlobalVendorId,
			...vendors.map(({external_id}) => external_id || 0),
			...arrayFrom(selectedGlobalVendorIds));

		// Find the maxVendorId out of the vendor list and selectedVendorIds
		this.vendorConsentData.maxVendorId = Math.max(maxVendorId,
			...vendors.map(({id}) => id),
			...arrayFrom(selectedVendorIds));
		this.vendorList = vendorList;
		this.storeUpdate();
	};

	updateCustomPurposeList = customPurposeList => {
		const {created} = this.publisherConsentData;

		// If publisher consent has never been persisted set the default selected status
		if (!created) {
			const {purposes = [],} = customPurposeList || {};
			this.publisherConsentData.selectedCustomPurposeIds = new Set(purposes.map(p => p.id));
		}

		const {version = 1} = customPurposeList || {};
		this.publisherConsentData.publisherPurposeVersion = version;

		this.customPurposeList = customPurposeList;
		this.storeUpdate();
	};

	mergeVendorConsentsFromGlobalCookie = () => {
		let selectedLocalIdsOfGlobalVendorInGlobalCookie = new Set();
		let selectedLocalIdsOfGlobalVendorInLocalCookie = new Set();
		const globalCookieMaxVendorId = this.persistedGlobalVendorConsentData.maxVendorId;

		this.globalVendorIdsPresentOnList.forEach( (localId, globalId) => {
			if (this.vendorConsentData.selectedVendorIds.has(localId) && globalId <= globalCookieMaxVendorId) {
				selectedLocalIdsOfGlobalVendorInLocalCookie.add(localId);
			}
			if (this.globalVendorConsentData.selectedVendorIds.has(globalId)) {
				selectedLocalIdsOfGlobalVendorInGlobalCookie.add(localId);
				this.vendorConsentData.selectedVendorIds.add(localId);
			}
		});

		selectedLocalIdsOfGlobalVendorInLocalCookie.forEach( localId => {
			const isNewVendorOnList = this.persistedVendorConsentData && localId > this.persistedVendorConsentData.maxVendorId;

			if (!isNewVendorOnList && !selectedLocalIdsOfGlobalVendorInGlobalCookie.has(localId)) {
				this.vendorConsentData.selectedVendorIds.delete(localId);
			}
		});
	};

	mergeVendorConsentsToGlobalCookie = () => {
		this.globalVendorIdsPresentOnList.forEach( (localId, globalId) => {
			if (this.vendorConsentData.selectedVendorIds.has(localId)) {
				this.globalVendorConsentData.selectedVendorIds.add(globalId);
			} else {
				this.globalVendorConsentData.selectedVendorIds.delete(globalId);
			}
		});
	};

	mergePurposeConsentsFromGlobalCookie = () => {
		const selectedPurposeIds = Array.from(this.vendorConsentData.selectedPurposeIds);
		this.vendorConsentData.selectedPurposeIds = new Set(selectedPurposeIds.filter( id => (
			this.globalVendorConsentData.selectedPurposeIds.has(id) || config.legIntPurposeIds.includes(id)
		)));
	};

	mergePurposeConsentsToGlobalCookie = () => {
		this.globalVendorConsentData.selectedPurposeIds = new Set(...this.vendorConsentData.selectedPurposeIds);
	};
}
