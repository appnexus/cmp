import { expect } from 'chai';
import vendorList from '../docs/assets/vendors.json';
import customPurposeList from '../docs/assets/purposes.json';

import Store from './store';

describe('store', () => {

	it('initializes with default data', () => {

		const store = new Store();

		expect(store.isConsentToolShowing).to.equal(false);

		expect(store.vendorList).to.be.undefined;
		expect(store.customPurposeList).to.be.undefined;

		expect(store.vendorConsentData.cookieVersion).to.equal(1);
		expect(store.vendorConsentData.cmpId).to.equal(1);

		expect(store.publisherConsentData.cookieVersion).to.equal(1);
		expect(store.publisherConsentData.cmpId).to.equal(1);
	});


	it('initializes with vendorList', () => {
		const store = new Store({ vendorList });

		expect(store.vendorList).to.deep.equal(vendorList);
		expect(store.vendorConsentData.selectedVendorIds.size).to.equal(vendorList.vendors.length);
		expect(store.vendorConsentData.selectedPurposeIds.size).to.equal(vendorList.purposes.length);
	});

	it('initializes with customPurposeList', () => {
		const store = new Store({ customPurposeList });
		expect(store.customPurposeList).to.deep.equal(customPurposeList);
		expect(store.publisherConsentData.selectedCustomPurposeIds.size).to.equal(customPurposeList.purposes.length);
	});

	it('initializes with selected IDs', () => {
		const selectedVendorIds = new Set([1, 2]);
		const selectedPurposeIds = new Set([234]);
		const store = new Store({
			vendorList,
			vendorConsentData: {
				selectedVendorIds,
				selectedPurposeIds
			}
		});

		expect(store.vendorConsentData.selectedVendorIds).to.deep.equal(selectedVendorIds);
		expect(store.vendorConsentData.selectedPurposeIds).to.deep.equal(selectedPurposeIds);
	});

	it('build correct vendor consents object', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				selectedVendorIds: new Set([4, 5, 6]),
				selectedPurposeIds: new Set([1, 4])
			}
		});

		const vendorObject = store.getVendorConsentsObject();
		const noConsentVendorCount = Object.keys(vendorObject.vendorConsents).filter(key => !vendorObject.vendorConsents[key]).length;


		expect(noConsentVendorCount).to.equal(vendorList.vendors.length - 3);
		expect(vendorObject.vendorConsents['4']).to.be.true;
		expect(vendorObject.vendorConsents['5']).to.be.true;
		expect(vendorObject.vendorConsents['6']).to.be.true;

		expect(vendorObject.purposes['1']).to.be.true;
		expect(vendorObject.purposes['4']).to.be.true;
	});

	it('selects vendor IDs', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				selectedVendorIds: new Set([8, 10]),
			}
		});

		store.selectVendor(10, false);
		store.selectVendor(12, true);

		const vendorObject = store.getVendorConsentsObject();
		const selectedVendorIds = Object.keys(vendorObject.vendorConsents).filter(key => vendorObject.vendorConsents[key]);

		expect(selectedVendorIds).to.deep.equal(['8', '12']);
	});

	it('selects ALL vendor IDs', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				selectedVendorIds: new Set([8, 10]),
			}
		});

		store.selectAllVendors(true);

		const vendorObject = store.getVendorConsentsObject();
		const selectedVendorIds = Object.keys(vendorObject.vendorConsents).filter(key => vendorObject.vendorConsents[key]);

		expect(selectedVendorIds.length).to.equal(vendorList.vendors.length);
	});

	it('selects purpose IDs', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				selectedPurposeIds: new Set([0, 1, 2]),
			}
		});


		store.selectPurpose(0, false);
		store.selectPurpose(4, true);

		const vendorObject = store.getVendorConsentsObject();
		const selectedPurposeIds = Object.keys(vendorObject.purposes).filter(key => vendorObject.purposes[key]);

		expect(selectedPurposeIds).to.deep.equal(['1', '2', '4']);
	});

	it('selects ALL purpose IDs', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				selectedPurposeIds: new Set([0, 1, 2]),
			}
		});


		store.selectAllPurposes(true);

		const vendorObject = store.getVendorConsentsObject();
		const selectedPurposeIds = Object.keys(vendorObject.purposes).filter(key => vendorObject.purposes[key]);

		expect(selectedPurposeIds.length).to.equal(vendorList.purposes.length);
	});

	it('selects custom purpose IDs', () => {
		const store = new Store({
			customPurposeList,
			publisherConsentData: {
				selectedCustomPurposeIds: new Set([0, 2]),
			}
		});

		store.selectCustomPurpose(0, false);
		store.selectCustomPurpose(3, true);

		const publisherObject = store.getPublisherConsentsObject();
		const selectedCustomPurposeIds = Object.keys(publisherObject.customPurposes).filter(key => publisherObject.customPurposes[key]);

		expect(selectedCustomPurposeIds).to.deep.equal(['2', '3']);
	});

	it('selects ALL custom purpose IDs', () => {
		const store = new Store({
			customPurposeList,
			publisherConsentData: {
				selectedCustomPurposeIds: new Set([0, 2]),
			}
		});

		store.selectAllCustomPurposes(true);

		const publisherObject = store.getPublisherConsentsObject();
		const selectedCustomPurposeIds = Object.keys(publisherObject.customPurposes).filter(key => publisherObject.customPurposes[key]);

		expect(selectedCustomPurposeIds.length).to.equal(customPurposeList.purposes.length);
	});

	it('toggle the consent modal', () => {
		const store = new Store();

		expect(store.isConsentToolShowing).to.be.false;
		store.toggleConsentToolShowing();
		expect(store.isConsentToolShowing).to.be.true;
	});

	it('calls event listeners on update', (done) => {
		const store = new Store();

		store.subscribe(() => {
			done();
		});
		store.storeUpdate();
	});

	it('removes event listeners', () => {
		const store = new Store();

		const event = () => {};
		store.subscribe(event);
		store.unsubscribe(event);

		expect(store.listeners).to.be.empty;
	});

	it('updates timestamps on persist', () => {
		const created = new Date('2018-01-01');
		const lastUpdated = created;

		const store = new Store({
			vendorConsentData: {
				created,
				lastUpdated
			},
			publisherConsentData: {
				created,
				lastUpdated
			}
		});

		store.persist();

		expect(store.vendorConsentData.created).to.equal(created);
		expect(store.vendorConsentData.lastUpdated).to.be.above(lastUpdated);
	});
});
