import { writePublisherConsentCookie, writeVendorConsentCookie } from "./cookie/cookie";
import config from './config';

export default class Store {
	constructor({ vendorConsentData, publisherConsentData, vendorList, customPurposeList }={}) {
		// Keep track of data that has already been persisted
		this.persistedVendorConsentData = vendorConsentData;
		this.persistedPublisherConsentData = publisherConsentData;

		const {
			vendors = [],
			purposes: vendorPurposes = [],
			version: vendorListVersion = 1
		} = vendorList || {};
		const {
			purposes: customPurposes = [],
			version: publisherPurposeVersion = 1,
		} = customPurposeList || {};

		this.vendorConsentData = Object.assign({
			cookieVersion: 1,
			cmpId: 1,
			vendorListVersion,
			publisherPurposeVersion,
			selectedPurposeIds: new Set(vendorPurposes.map(p => p.id)),
			selectedVendorIds: new Set(vendors.map(v => v.id)),
		}, vendorConsentData);

		this.publisherConsentData = Object.assign({
			cookieVersion: 1,
			cmpId: 1,
			publisherPurposeVersion,
			selectedCustomPurposeIds: new Set(customPurposes.map(p => p.id))
		}, publisherConsentData);

		this.vendorList = vendorList;
		this.customPurposeList = customPurposeList;
		this.isConsentToolShowing = false;
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
			maxVendorId,
			selectedVendorIds = new Set(),
			selectedPurposeIds = new Set()
		} = persistedVendorConsentData;

		const { purposes = [], vendors = []} = vendorList;

		// If no vendor ID list is supplied return all vendors
		const vendorIdList = vendors
			.map(({ id }) => id)
			.filter(id => !vendorIds || vendorIds.indexOf(id) > -1);

		return {
			cookieVersion,
			created,
			lastUpdated,
			cmpId,
			vendorListVersion,
			maxVendorId,
			purposes: purposes.reduce((acc, { id }) => ({
				...acc,
				[id]: selectedPurposeIds.has(id)
			}), {}),
			vendorConsents: vendorIdList.reduce((acc, vendorId) => ({
				...acc,
				[vendorId]: selectedVendorIds.has(vendorId)
			}), {})
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

		const { selectedPurposeIds = new Set() } = persistedVendorConsentData;
		const { purposes = [] } = vendorList;
		const { purposes: customPurposes = []} = customPurposeList;

		return {
			cookieVersion,
			created,
			lastUpdated,
			cmpId,
			vendorListVersion,
			publisherPurposeVersion,
			standardPurposes: purposes.reduce((acc, { id }) => ({
				...acc,
				[id]: selectedPurposeIds.has(id)
			}), {}),
			customPurposes: customPurposes.reduce((acc, { id }) => ({
				...acc,
				[id]: selectedCustomPurposeIds.has(id)
			}), {})
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
		writeVendorConsentCookie({ ...vendorConsentData, vendorList });

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
		const { selectedVendorIds } = this.vendorConsentData;
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
		const { selectedPurposeIds } = this.vendorConsentData;
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
		const { selectedCustomPurposeIds } = this.publisherConsentData;
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
		this.storeUpdate();
	};

}
