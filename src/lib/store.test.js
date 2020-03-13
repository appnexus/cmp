import { expect } from 'chai';
import Store from './store';
import { CmpApi } from "@iabtcf/cmpapi";
import { decodeConsentData, encodeConsentData } from "./cookie/cookie";
// import Promise from "promise-polyfill";
import {GVL, TCModel} from "@iabtcf/core";

import {
	PURPOSE_CONSENTS,
	PURPOSE_LEGITIMATE_INTERESTS,
	VENDOR_CONSENTS,
	VENDOR_LEGITIMATE_INTERESTS,
	PUBLISHER_CONSENTS,
	PUBLISHER_LEGITIMATE_INTERESTS,
	SPECIAL_FEATURE_OPT_INS,
	VENDOR_LIST
} from "../../test/constants";

describe('store', () => {
	let cmpApi;

	beforeEach(() => {
		cmpApi = new CmpApi(280, 2);
	});

	afterEach(() => {
		cmpApi = undefined;
	});

	it('initializes with default data', () => {
		const store = new Store({ cmpApi });

		expect(store.isConsentToolShowing).to.equal(false);
		expect(store.tcModel.cookieVersion).to.equal(2);
		expect(store.tcModel.cmpId).to.equal(280);
	});

	it('initializes with vendorList', () => {
		const store = new Store({
			vendorList: VENDOR_LIST,
			cmpApi
		});

		expect(store.vendorList).to.deep.equal(VENDOR_LIST);
		expect(store.tcModel.vendorConsents.size).to.equal(Object.keys(VENDOR_LIST.vendors).length);
		expect(store.tcModel.purposeConsents.size).to.equal(Object.keys(VENDOR_LIST.purposes).length);
	});

	it('initializes with consent data', (done) => {
		const tcModel = new TCModel();
		tcModel.cmpId = 280;
		tcModel.cmpVersion = 2;
		tcModel.gvl = new GVL(VENDOR_LIST);

		setTimeout(() => {
			tcModel.purposeConsents.set(PURPOSE_CONSENTS);
			tcModel.purposeLegitimateInterests.set(PURPOSE_LEGITIMATE_INTERESTS);
			tcModel.vendorConsents.set(VENDOR_CONSENTS);
			tcModel.vendorLegitimateInterests.set(VENDOR_LEGITIMATE_INTERESTS);
			tcModel.publisherConsents.set(PUBLISHER_CONSENTS);
			tcModel.publisherLegitimateInterests.set(PUBLISHER_LEGITIMATE_INTERESTS);
			tcModel.specialFeatureOptIns.set(SPECIAL_FEATURE_OPT_INS);

			const encoded = encodeConsentData(tcModel);

			const store = new Store({
				vendorList: VENDOR_LIST,
				consentData: decodeConsentData(encoded),
				cmpApi
			});

			// check if consents were applied to current state of tcModel
			expect(store.tcModel.purposeConsents.maxId).to.equal(Math.max(...PURPOSE_CONSENTS));
			expect(store.tcModel.purposeLegitimateInterests.maxId).to.equal(Math.max(...PURPOSE_LEGITIMATE_INTERESTS));
			expect(store.tcModel.vendorConsents.maxId).to.equal(Math.max(...VENDOR_CONSENTS));
			expect(store.tcModel.vendorLegitimateInterests.maxId).to.equal(Math.max(...VENDOR_LEGITIMATE_INTERESTS));
			expect(store.tcModel.publisherConsents.maxId).to.equal(Math.max(...PUBLISHER_CONSENTS));
			expect(store.tcModel.publisherLegitimateInterests.maxId).to.equal(Math.max(...PUBLISHER_LEGITIMATE_INTERESTS));
			expect(store.tcModel.specialFeatureOptIns.maxId).to.equal(Math.max(...SPECIAL_FEATURE_OPT_INS));
			done();
		}, 0);
	});

	it('initializes with new vendor list', (done) => {
		const vendorList = JSON.parse(JSON.stringify(VENDOR_LIST));
		vendorList.vendorListVersion = 101;
		const deprecated = JSON.parse(JSON.stringify(VENDOR_LIST));
		delete deprecated.vendors["10"];

		const tcModel = new TCModel();
		tcModel.cmpId = 280;
		tcModel.cmpVersion = 2;
		tcModel.gvl = new GVL(deprecated);
		const deprecatedVendorConsents = [...VENDOR_CONSENTS].slice(0,-1);

		setTimeout(() => {
			tcModel.purposeConsents.set(PURPOSE_CONSENTS);
			tcModel.purposeLegitimateInterests.set(PURPOSE_LEGITIMATE_INTERESTS);
			tcModel.vendorConsents.set(deprecatedVendorConsents);
			tcModel.vendorLegitimateInterests.set(VENDOR_LEGITIMATE_INTERESTS);
			tcModel.publisherConsents.set(PUBLISHER_CONSENTS);
			tcModel.publisherLegitimateInterests.set(PUBLISHER_LEGITIMATE_INTERESTS);
			tcModel.specialFeatureOptIns.set(SPECIAL_FEATURE_OPT_INS);


			const encoded = encodeConsentData(tcModel);
			const decoded = decodeConsentData(encoded);

			const store = new Store({
				consentData: decoded,
				cmpApi
			});

			store.updateVendorList(vendorList);

			expect(store.tcModel.vendorConsents.size).to.equal(6);
			expect(store.tcModel.vendorConsents.maxId).to.equal(10);
			expect(store.tcModel.vendorConsents.has(10)).to.be.true;
			done();
		}, 0);
	});

	it('build correct vendor consents object', (done) => {
		const tcModel = new TCModel();
		tcModel.cmpId = 280;
		tcModel.cmpVersion = 2;
		tcModel.gvl = new GVL(VENDOR_LIST);

		setTimeout(() => {
			tcModel.purposeConsents.set(PURPOSE_CONSENTS);
			tcModel.purposeLegitimateInterests.set(PURPOSE_LEGITIMATE_INTERESTS);
			tcModel.vendorConsents.set(VENDOR_CONSENTS);
			tcModel.vendorLegitimateInterests.set(VENDOR_LEGITIMATE_INTERESTS);
			tcModel.publisherConsents.set(PUBLISHER_CONSENTS);
			tcModel.publisherLegitimateInterests.set(PUBLISHER_LEGITIMATE_INTERESTS);
			tcModel.specialFeatureOptIns.set(SPECIAL_FEATURE_OPT_INS);

			const encoded = encodeConsentData(tcModel);
			const decoded = decodeConsentData(encoded);

			const store = new Store({
				vendorList: VENDOR_LIST,
				consentData: decoded,
				cmpApi
			});

			const vendorConsentsObject = store.getVendorConsentsObject();
			const vendorsWithoutConsentCount = Object.values(vendorConsentsObject.vendorConsents).filter(consent => !consent).length;

			expect(vendorsWithoutConsentCount).to.equal(Object.keys(VENDOR_LIST.vendors).length - 2);
			expect(vendorConsentsObject.vendorConsents['4']).to.be.true;
			expect(vendorConsentsObject.vendorConsents['5']).to.be.false;

			expect(vendorConsentsObject.purposeConsents['1']).to.be.true;
			expect(vendorConsentsObject.purposeConsents['3']).to.be.true;
			expect(vendorConsentsObject.purposeConsents['2']).to.be.false;
			expect(vendorConsentsObject.purposeConsents['4']).to.be.false;

			expect(vendorConsentsObject.purposeLegitimateInterests['2']).to.be.true;
			expect(vendorConsentsObject.purposeLegitimateInterests['4']).to.be.true;
			expect(vendorConsentsObject.purposeLegitimateInterests['1']).to.be.false;
			expect(vendorConsentsObject.purposeLegitimateInterests['3']).to.be.false;

			done();
		});
	});

	it('selects vendor IDs', (done) => {
		const tcModel = new TCModel();
		tcModel.cmpId = 280;
		tcModel.cmpVersion = 2;
		tcModel.gvl = new GVL(VENDOR_LIST);

		setTimeout(() => {
			const store = new Store({
				vendorList: VENDOR_LIST,
				cmpApi
			});

			store.selectVendor(2, false);
			store.selectVendor(3, true);
			store.persist();

			const vendorConsentObject = store.getVendorConsentsObject();
			expect(vendorConsentObject.vendorConsents['3']).to.be.true;
			done();
		}, 0);
	});
	//
	// it('selects ALL vendor IDs', () => {
	// 	const store = new Store({
	// 		vendorList,
	// 		vendorConsentData: {
	// 			created: new Date(),
	// 			selectedVendorIds: new Set([2, 4]),
	// 		}
	// 	});
	//
	// 	store.selectAllVendors(true);
	// 	store.persist();
	//
	// 	const vendorObject = store.getVendorConsentsObject();
	// 	const selectedVendorIds = Object.keys(vendorObject.vendorConsents).filter(key => vendorObject.vendorConsents[key]);
	//
	// 	expect(selectedVendorIds.length).to.equal(vendorList.vendors.length);
	// });
	//
	// it('selects purpose IDs', () => {
	// 	const store = new Store({
	// 		vendorList,
	// 		vendorConsentData: {
	// 			created: new Date(),
	// 			selectedPurposeIds: new Set([0, 1, 2]),
	// 		}
	// 	});
	//
	//
	// 	store.selectPurpose(0, false);
	// 	store.selectPurpose(4, true);
	// 	store.persist();
	//
	// 	const vendorObject = store.getVendorConsentsObject();
	// 	const selectedPurposeIds = Object.keys(vendorObject.purposeConsents).filter(key => vendorObject.purposeConsents[key]);
	//
	// 	expect(selectedPurposeIds).to.deep.equal(['1', '2', '4']);
	// });
	//
	// it('selects ALL purpose IDs', () => {
	// 	const store = new Store({
	// 		vendorList,
	// 		vendorConsentData: {
	// 			created: new Date(),
	// 			selectedPurposeIds: new Set([0, 1, 2]),
	// 		}
	// 	});
	//
	//
	// 	store.selectAllPurposes(true);
	// 	store.persist();
	//
	// 	const vendorObject = store.getVendorConsentsObject();
	// 	const selectedPurposeIds = Object.keys(vendorObject.purposeConsents).filter(key => vendorObject.purposeConsents[key]);
	//
	// 	expect(selectedPurposeIds.length).to.equal(vendorList.purposes.length);
	// });
	//
	// it('selects standard purpose IDs', () => {
	// 	const store = new Store({
	// 		vendorList,
	// 		publisherConsentData: {
	// 			created: new Date(),
	// 			selectedStandardPurposeIds: new Set([0, 2]),
	// 		}
	// 	});
	//
	// 	store.selectStandardPurpose(0, false);
	// 	store.selectStandardPurpose(3, true);
	// 	store.persist();
	//
	// 	const publisherObject = store.getPublisherConsentsObject();
	// 	const selectedStandardPurposeIds = Object.keys(publisherObject.standardPurposes).filter(key => publisherObject.standardPurposes[key]);
	//
	// 	expect(selectedStandardPurposeIds).to.deep.equal(['2', '3']);
	// });
	//
	// it('selects ALL standard purpose IDs', () => {
	// 	const store = new Store({
	// 		vendorList,
	// 		publisherConsentData: {
	// 			created: new Date(),
	// 			selectedStandardPurposeIds: new Set([0, 2]),
	// 		}
	// 	});
	//
	// 	store.selectAllStandardPurposes(true);
	// 	store.persist();
	//
	// 	const publisherObject = store.getPublisherConsentsObject();
	// 	const selectedStandardPurposeIds = Object.keys(publisherObject.standardPurposes).filter(key => publisherObject.standardPurposes[key]);
	//
	// 	expect(selectedStandardPurposeIds.length).to.equal(vendorList.purposes.length);
	// });
	//
	// it('selects custom purpose IDs', () => {
	// 	const store = new Store({
	// 		customPurposeList,
	// 		publisherConsentData: {
	// 			created: new Date(),
	// 			selectedCustomPurposeIds: new Set([0, 2]),
	// 		}
	// 	});
	//
	// 	store.selectCustomPurpose(0, false);
	// 	store.selectCustomPurpose(3, true);
	// 	store.persist();
	//
	// 	const publisherObject = store.getPublisherConsentsObject();
	// 	const selectedCustomPurposeIds = Object.keys(publisherObject.customPurposes).filter(key => publisherObject.customPurposes[key]);
	//
	// 	expect(selectedCustomPurposeIds).to.deep.equal(['2', '3']);
	// });
	//
	// it('selects ALL custom purpose IDs', () => {
	// 	const store = new Store({
	// 		customPurposeList,
	// 		publisherConsentData: {
	// 			created: new Date(),
	// 			selectedCustomPurposeIds: new Set([0, 2]),
	// 		}
	// 	});
	//
	// 	store.selectAllCustomPurposes(true);
	// 	store.persist();
	//
	// 	const publisherObject = store.getPublisherConsentsObject();
	// 	const selectedCustomPurposeIds = Object.keys(publisherObject.customPurposes).filter(key => publisherObject.customPurposes[key]);
	//
	// 	expect(selectedCustomPurposeIds.length).to.equal(customPurposeList.purposes.length);
	// });
	//
	// it('toggle the consent modal', () => {
	// 	const store = new Store();
	//
	// 	expect(store.isConsentToolShowing).to.be.false;
	// 	store.toggleConsentToolShowing();
	// 	expect(store.isConsentToolShowing).to.be.true;
	// });
	//
	// it('calls event listeners on update', (done) => {
	// 	const store = new Store();
	//
	// 	store.subscribe(() => {
	// 		done();
	// 	});
	// 	store.storeUpdate();
	// });
	//
	// it('removes event listeners', () => {
	// 	const store = new Store();
	//
	// 	const event = () => {};
	// 	store.subscribe(event);
	// 	store.unsubscribe(event);
	//
	// 	expect(store.listeners).to.be.empty;
	// });
	//
	// it('updates timestamps on persist', () => {
	// 	const created = new Date('2018-01-01');
	// 	const lastUpdated = created;
	//
	// 	const store = new Store({
	// 		vendorConsentData: {
	// 			created,
	// 			lastUpdated
	// 		},
	// 		publisherConsentData: {
	// 			created,
	// 			lastUpdated
	// 		}
	// 	});
	//
	// 	store.persist();
	//
	// 	expect(store.vendorConsentData.created).to.equal(created);
	// 	expect(store.vendorConsentData.lastUpdated).to.be.above(lastUpdated);
	// });
	//
	// it('merge vendor consent from global cookie when consents are same', () => {
	// 	const store = new Store({
	// 		vendorConsentData: {
	// 			selectedVendorIds: new Set([1, 2, 3, 4, 5, 6]),
	// 		},
	// 		globalVendorConsentData: {
	// 			maxVendorId: 6,
	// 			selectedVendorIds: new Set([1, 2, 3, 4, 5, 6]),
	// 		},
	// 	});
	// 	store.globalVendorIdsPresentOnList = new Map([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]]);
	//
	// 	store.mergeVendorConsentsFromGlobalCookie();
	// 	expect(Array.from(store.vendorConsentData.selectedVendorIds)).to.deep.equal(Array.from(store.globalVendorConsentData.selectedVendorIds));
	// });
	//
	// it('merge vendor consent from global cookie when consents differ', () => {
	// 	const store = new Store({
	// 		vendorConsentData: {
	// 			selectedVendorIds: new Set([1, 2, 3]),
	// 		},
	// 		globalVendorConsentData: {
	// 			maxVendorId: 6,
	// 			selectedVendorIds: new Set([3, 4, 5, 6]),
	// 		},
	// 	});
	// 	store.globalVendorIdsPresentOnList = new Map([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]]);
	//
	// 	store.mergeVendorConsentsFromGlobalCookie();
	// 	expect(Array.from(store.vendorConsentData.selectedVendorIds)).to.deep.equal(Array.from(store.globalVendorConsentData.selectedVendorIds));
	// });
	//
	// it('merge vendor consent to global cookie', () => {
	// 	const store = new Store({
	// 		vendorConsentData: {
	// 			selectedVendorIds: new Set([1, 2, 3, 4, 5]),
	// 		},
	// 		globalVendorConsentData: {
	// 			selectedVendorIds: new Set([1, 2]),
	// 		},
	// 	});
	// 	store.globalVendorIdsPresentOnList = new Map([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]]);
	//
	// 	store.mergeVendorConsentsToGlobalCookie();
	// 	expect(Array.from(store.globalVendorConsentData.selectedVendorIds)).to.deep.equal(Array.from(store.vendorConsentData.selectedVendorIds));
	// });
	//
	// it('merge purpose consent from global cookie when consents are same', () => {
	// 	const store = new Store({
	// 		vendorList,
	// 		vendorConsentData: {
	// 			selectedPurposeIds: new Set([1, 2, 3, 4]),
	// 		},
	// 		globalVendorConsentData: {
	// 			selectedPurposeIds: new Set([1, 2, 3, 4]),
	// 		},
	// 	});
	//
	// 	store.mergePurposeConsentsFromGlobalCookie();
	// 	expect(Array.from(store.vendorConsentData.selectedPurposeIds)).to.deep.equal(Array.from(store.globalVendorConsentData.selectedPurposeIds));
	// });
	//
	// it('merge purpose consent from global cookie when consents differ', () => {
	// 	const store = new Store({
	// 		vendorList,
	// 		vendorConsentData: {
	// 			selectedPurposeIds: new Set([1, 2]),
	// 		},
	// 		globalVendorConsentData: {
	// 			selectedPurposeIds: new Set([2, 3, 4]),
	// 		},
	// 	});
	//
	// 	store.mergePurposeConsentsFromGlobalCookie();
	// 	expect(Array.from(store.vendorConsentData.selectedPurposeIds)).to.deep.equal(Array.from(store.globalVendorConsentData.selectedPurposeIds));
	// });
	//
	// it('merge purpose consent to global cookie', () => {
	// 	const store = new Store({
	// 		vendorList,
	// 		vendorConsentData: {
	// 			selectedPurposeIds: new Set([1, 2, 4]),
	// 		},
	// 		globalVendorConsentData: {
	// 			selectedPurposeIds: new Set([2, 3]),
	// 		},
	// 	});
	//
	// 	store.mergePurposeConsentsToGlobalCookie();
	// 	expect(Array.from(store.globalVendorConsentData.selectedPurposeIds)).to.deep.equal(Array.from(store.vendorConsentData.selectedPurposeIds));	});
});
