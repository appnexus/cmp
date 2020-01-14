import { expect } from 'chai';
import customPurposeList from '../docs/assets/purposes.json';

import Store from './store';


const vendorList = {
	"version": 1,
	"origin": "http://ib.adnxs.com/vendors.json",
	"purposes": [
		{
			"id": 1,
			"name": "Accessing a Device or Browser"
		},
		{
			"id": 2,
			"name": "Advertising Personalisation"
		},
		{
			"id": 3,
			"name": "Analytics"
		},
		{
			"id": 4,
			"name": "Content Personalisation"
		}
	],
	"vendors": [
		{
			"id": 1,
			"external_id": 1,
			"name": "Globex"
		},
		{
			"id": 2,
			"external_id": 2,
			"name": "Initech"
		},
		{
			"id": 3,
			"external_id": 3,
			"name": "CRS"
		},
		{
			"id": 4,
			"external_id": 4,
			"name": "Umbrella"
		},
		{
			"id": 5,
			"external_id": 5,
			"name": "Aperture"
		},
		{
			"id": 6,
			"external_id": 6,
			"name": "Pierce and Pierce"
		}
	]
};

describe('store', () => {

	it('initializes with default data', () => {

		const store = new Store();

		expect(store.isConsentToolShowing).to.equal(false);

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
				created: new Date(),
				selectedVendorIds,
				selectedPurposeIds
			}
		});

		expect(store.vendorConsentData.selectedVendorIds).to.deep.equal(selectedVendorIds);
		expect(store.vendorConsentData.selectedPurposeIds).to.deep.equal(selectedPurposeIds);
	});

	it('initializes with new vendor list', () => {
		const expected = new Set(vendorList.vendors.map(v => v.id));
		const selectedVendorIds = new Set([1, 2]);
		const store = new Store({
			vendorConsentData: {
				created: new Date(),
				selectedVendorIds,
				maxVendorId:2
			}
		});
		store.updateVendorList(vendorList);
		expect(store.vendorConsentData.selectedVendorIds).to.deep.equal(expected);
	});

	it('build correct vendor consents object', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				selectedVendorIds: new Set([4, 5]),
				selectedPurposeIds: new Set([1, 4])
			}
		});

		const vendorObject = store.getVendorConsentsObject();
		const noConsentVendorCount = Object.keys(vendorObject.vendorConsents).filter(key => !vendorObject.vendorConsents[key]).length;

		expect(noConsentVendorCount).to.equal(vendorList.vendors.length - 2);
		expect(vendorObject.vendorConsents['4']).to.be.true;
		expect(vendorObject.vendorConsents['5']).to.be.true;

		expect(vendorObject.purposeConsents['1']).to.be.true;
		expect(vendorObject.purposeConsents['4']).to.be.true;
	});

	it('returns consent=false for vendors that are not in the allowedVendors', () => {
		const store = new Store({
			vendorList,
			allowedVendorIds: [1,2,3,4,5,6],
			vendorConsentData: {
				selectedVendorIds: new Set([4, 5, 7, 8]),
				selectedPurposeIds: new Set([1, 4])
			}
		});

		const vendorObject = store.getVendorConsentsObject();


		expect(vendorObject.vendorConsents['4']).to.be.true;
		expect(vendorObject.vendorConsents['5']).to.be.true;

		expect(vendorObject.vendorConsents['7']).to.be.false;
		expect(vendorObject.vendorConsents['8']).to.be.false;
	});

	it('selects vendor IDs', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				created: new Date(),
				selectedVendorIds: new Set([2, 4]),
			}
		});

		store.selectVendor(2, false);
		store.selectVendor(3, true);
		store.persist();

		const vendorObject = store.getVendorConsentsObject();
		const selectedVendorIds = Object.keys(vendorObject.vendorConsents).filter(key => vendorObject.vendorConsents[key]);

		expect(selectedVendorIds).to.deep.equal(['3', '4']);
	});

	it('selects ALL vendor IDs', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				created: new Date(),
				selectedVendorIds: new Set([2, 4]),
			}
		});

		store.selectAllVendors(true);
		store.persist();

		const vendorObject = store.getVendorConsentsObject();
		const selectedVendorIds = Object.keys(vendorObject.vendorConsents).filter(key => vendorObject.vendorConsents[key]);

		expect(selectedVendorIds.length).to.equal(vendorList.vendors.length);
	});

	it('selects purpose IDs', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				created: new Date(),
				selectedPurposeIds: new Set([0, 1, 2]),
			}
		});


		store.selectPurpose(0, false);
		store.selectPurpose(4, true);
		store.persist();

		const vendorObject = store.getVendorConsentsObject();
		const selectedPurposeIds = Object.keys(vendorObject.purposeConsents).filter(key => vendorObject.purposeConsents[key]);

		expect(selectedPurposeIds).to.deep.equal(['1', '2', '4']);
	});

	it('selects ALL purpose IDs', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				created: new Date(),
				selectedPurposeIds: new Set([0, 1, 2]),
			}
		});


		store.selectAllPurposes(true);
		store.persist();

		const vendorObject = store.getVendorConsentsObject();
		const selectedPurposeIds = Object.keys(vendorObject.purposeConsents).filter(key => vendorObject.purposeConsents[key]);

		expect(selectedPurposeIds.length).to.equal(vendorList.purposes.length);
	});

	it('selects standard purpose IDs', () => {
		const store = new Store({
			vendorList,
			publisherConsentData: {
				created: new Date(),
				selectedStandardPurposeIds: new Set([0, 2]),
			}
		});

		store.selectStandardPurpose(0, false);
		store.selectStandardPurpose(3, true);
		store.persist();

		const publisherObject = store.getPublisherConsentsObject();
		const selectedStandardPurposeIds = Object.keys(publisherObject.standardPurposes).filter(key => publisherObject.standardPurposes[key]);

		expect(selectedStandardPurposeIds).to.deep.equal(['2', '3']);
	});

	it('selects ALL standard purpose IDs', () => {
		const store = new Store({
			vendorList,
			publisherConsentData: {
				created: new Date(),
				selectedStandardPurposeIds: new Set([0, 2]),
			}
		});

		store.selectAllStandardPurposes(true);
		store.persist();

		const publisherObject = store.getPublisherConsentsObject();
		const selectedStandardPurposeIds = Object.keys(publisherObject.standardPurposes).filter(key => publisherObject.standardPurposes[key]);

		expect(selectedStandardPurposeIds.length).to.equal(vendorList.purposes.length);
	});

	it('selects custom purpose IDs', () => {
		const store = new Store({
			customPurposeList,
			publisherConsentData: {
				created: new Date(),
				selectedCustomPurposeIds: new Set([0, 2]),
			}
		});

		store.selectCustomPurpose(0, false);
		store.selectCustomPurpose(3, true);
		store.persist();

		const publisherObject = store.getPublisherConsentsObject();
		const selectedCustomPurposeIds = Object.keys(publisherObject.customPurposes).filter(key => publisherObject.customPurposes[key]);

		expect(selectedCustomPurposeIds).to.deep.equal(['2', '3']);
	});

	it('selects ALL custom purpose IDs', () => {
		const store = new Store({
			customPurposeList,
			publisherConsentData: {
				created: new Date(),
				selectedCustomPurposeIds: new Set([0, 2]),
			}
		});

		store.selectAllCustomPurposes(true);
		store.persist();

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

	it('merge vendor consent from global cookie when consents are same', () => {
		const store = new Store({
			vendorConsentData: {
				selectedVendorIds: new Set([1, 2, 3, 4, 5, 6]),
			},
			globalVendorConsentData: {
				maxVendorId: 6,
				selectedVendorIds: new Set([1, 2, 3, 4, 5, 6]),
			},
		});
		store.globalVendorIdsPresentOnList = new Map([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]]);

		store.mergeVendorConsentsFromGlobalCookie();
		expect(Array.from(store.vendorConsentData.selectedVendorIds)).to.deep.equal(Array.from(store.globalVendorConsentData.selectedVendorIds));
	});

	it('merge vendor consent from global cookie when consents differ', () => {
		const store = new Store({
			vendorConsentData: {
				selectedVendorIds: new Set([1, 2, 3]),
			},
			globalVendorConsentData: {
				maxVendorId: 6,
				selectedVendorIds: new Set([3, 4, 5, 6]),
			},
		});
		store.globalVendorIdsPresentOnList = new Map([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]]);

		store.mergeVendorConsentsFromGlobalCookie();
		expect(Array.from(store.vendorConsentData.selectedVendorIds)).to.deep.equal(Array.from(store.globalVendorConsentData.selectedVendorIds));
	});

	it('merge vendor consent to global cookie', () => {
		const store = new Store({
			vendorConsentData: {
				selectedVendorIds: new Set([1, 2, 3, 4, 5]),
			},
			globalVendorConsentData: {
				selectedVendorIds: new Set([1, 2]),
			},
		});
		store.globalVendorIdsPresentOnList = new Map([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]]);

		store.mergeVendorConsentsToGlobalCookie();
		expect(Array.from(store.globalVendorConsentData.selectedVendorIds)).to.deep.equal(Array.from(store.vendorConsentData.selectedVendorIds));
	});

	it('merge purpose consent from global cookie when consents are same', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				selectedPurposeIds: new Set([1, 2, 3, 4]),
			},
			globalVendorConsentData: {
				selectedPurposeIds: new Set([1, 2, 3, 4]),
			},
		});

		store.mergePurposeConsentsFromGlobalCookie();
		expect(Array.from(store.vendorConsentData.selectedPurposeIds)).to.deep.equal(Array.from(store.globalVendorConsentData.selectedPurposeIds));
	});

	it('merge purpose consent from global cookie when consents differ', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				selectedPurposeIds: new Set([1, 2]),
			},
			globalVendorConsentData: {
				selectedPurposeIds: new Set([2, 3, 4]),
			},
		});

		store.mergePurposeConsentsFromGlobalCookie();
		expect(Array.from(store.vendorConsentData.selectedPurposeIds)).to.deep.equal(Array.from(store.globalVendorConsentData.selectedPurposeIds));
	});

	it('merge purpose consent to global cookie', () => {
		const store = new Store({
			vendorList,
			vendorConsentData: {
				selectedPurposeIds: new Set([1, 2, 4]),
			},
			globalVendorConsentData: {
				selectedPurposeIds: new Set([2, 3]),
			},
		});

		store.mergePurposeConsentsToGlobalCookie();
		expect(Array.from(store.globalVendorConsentData.selectedPurposeIds)).to.deep.equal(Array.from(store.vendorConsentData.selectedPurposeIds));	});
});
