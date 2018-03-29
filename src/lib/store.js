import { writePublisherConsentCookie, writeVendorConsentCookie } from "./cookie/cookie";
import config from './config';

export default class Store {
	constructor({vendorConsentData, publisherConsentData, vendorList, customPurposeList} = {}) {
		// Keep track of data that has already been persisted
		this.persistedVendorConsentData = vendorConsentData;
		this.persistedPublisherConsentData = publisherConsentData;

		this.vendorConsentData = Object.assign({
			cookieVersion: 1,
			cmpId: 1,
		}, vendorConsentData);

		this.publisherConsentData = Object.assign({
			cookieVersion: 1,
			cmpId: 1,
		}, publisherConsentData);

		this.isConsentToolShowing = false;
		this.isFooterShowing = false;

		this.updateVendorList(vendorList);
		this.updateCustomPurposeList(customPurposeList);
	}

	/**
	 * Build vendor consent object from data that has already been persisted.
	 */
	getVendorConsentsObject = (vendorIds) => {
		const {
			vendorList = {},
			persistedVendorConsentData = {}
		} = this;

		const {
			cookieVersion,
			created,
			lastUpdated,
			cmpId,
			vendorListVersion,
			maxVendorId = 0,
			selectedVendorIds = new Set(),
			selectedPurposeIds = new Set()
		} = persistedVendorConsentData;

		const {purposes = [], vendors = []} = vendorList;


		// Map requested vendorIds
		const vendorMap = {};
		if (vendorIds && vendorIds.length) {
			vendorIds.forEach(id => vendorMap[id] = selectedVendorIds.has(id));
		}
		else {
			// In case the vendor list has not been loaded yet find the highest
			// vendor ID to map any consent data we already have
			const lastVendorId = Math.max(maxVendorId,
				...vendors.map(({id}) => id),
				...Array.from(selectedVendorIds));

			// Map all IDs up to the highest vendor ID found
			for (let i = 1; i <= lastVendorId; i++) {
				vendorMap[i] = selectedVendorIds.has(i);
			}
		}

		// Map all purpose IDs
		const lastPurposeId = Math.max(
			...purposes.map(({id}) => id),
			...Array.from(selectedPurposeIds));

		const purposeMap = {};
		for (let i = 1; i <= lastPurposeId; i++) {
			purposeMap[i] = selectedPurposeIds.has(i);
		}

		return {
			cookieVersion,
			created,
			lastUpdated,
			cmpId,
			vendorListVersion,
			maxVendorId,
			purposes: purposeMap,
			vendorConsents: vendorMap
		};
	};

	/**
	 * Build publisher consent object from data that has already been persisted
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
			...Array.from(selectedPurposeIds));

		const lastCustomPurposeId = Math.max(
			...customPurposes.map(({id}) => id),
			...Array.from(selectedPurposeIds));

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

	persist = () => {
		const {
			vendorConsentData,
			publisherConsentData,
			vendorList,
			customPurposeList
		} = this;

		// Update modification dates and write the cookies
		const now = new Date();
		vendorConsentData.created = vendorConsentData.created || now;
		vendorConsentData.lastUpdated = now;

		publisherConsentData.created = publisherConsentData.created || now;
		publisherConsentData.lastUpdated = now;

		// Write vendor cookie to appropriate domain
		writeVendorConsentCookie({...vendorConsentData, vendorList});

		// Write publisher cookie if enabled
		if (config.storePublisherData) {
			writePublisherConsentCookie({
				...vendorConsentData, ...publisherConsentData,
				vendorList,
				customPurposeList
			});
		}

		// Store the persisted data
		this.persistedVendorConsentData = {...vendorConsentData};
		this.persistedPublisherConsentData = {...publisherConsentData};

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
		this.isFooterShowing = typeof isShown === 'boolean' ? isShown : !this.isFooterShowing;
		this.isConsentToolShowing = false;
		this.storeUpdate();
	};

	updateVendorList = vendorList => {

		const { created } = this.vendorConsentData;

		// If vendor consent data has never been persisted set default selected status
		if (!created) {
			const {
				vendors = [],
				purposes = [],
			} = vendorList || {};
			this.vendorConsentData.selectedPurposeIds = new Set(purposes.map(p => p.id));
			this.vendorConsentData.selectedVendorIds = new Set(vendors.map(v => v.id));
		}

		const {version = 1} = vendorList || {};

		this.vendorConsentData.vendorListVersion = version;
		this.vendorList = vendorList;
		this.storeUpdate();
	};

	updateCustomPurposeList = customPurposeList => {
		const { created } = this.publisherConsentData;

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
}
