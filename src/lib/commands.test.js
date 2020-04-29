/* eslint-disable max-nested-callbacks */
import {expect, use} from 'chai';
import Store, {SECTION_DETAILS, SECTION_VENDORS} from './store';
import createCommands from "./commands";
import {
	PUBLISHER_CONSENTS, PUBLISHER_LEGITIMATE_INTERESTS,
	PURPOSE_CONSENTS,
	PURPOSE_LEGITIMATE_INTERESTS, SPECIAL_FEATURE_OPT_INS,
	VENDOR_CONSENTS,
	VENDOR_LEGITIMATE_INTERESTS,
	VENDOR_LIST
} from "../../test/constants";
import {decodeConsentData, encodeConsentData} from "./cookie/cookie";
import {CMP_ID, CMP_VERSION} from "./init";
import {GVL, TCModel} from "@iabtcf/core";
import {CmpApi} from "@iabtcf/cmpapi";
import datetime from "chai-datetime";
import CmpManager from "./cmpManager";

use(datetime);

const filter = (object) => {
	return Object.keys(object).filter(key => object[key]);
};

describe('commands', () => {
	let store, commands, cmpManager;

	beforeEach(() => {
		store = new Store({
			cmpId: CMP_ID
		});
		cmpManager = new CmpManager();
		commands = createCommands(store, cmpManager);
	});

	describe('getConsentObject', () => {
		it('should return empty object and false when invoked without vendor list', (done) => {
			const consents = {};

			commands.getConsentObject((tcData, success) => {
				expect(tcData).to.deep.equal({});
				expect(success).to.be.false;
				done();
			}, consents);
		});

		it('should return empty object and false when invoked with undefined', (done) => {
			commands.getConsentObject((tcData, success) => {
				expect(tcData).to.deep.equal({});
				expect(success).to.be.false;
				done();
			}, undefined, VENDOR_LIST);
		});

		it('should return consent object with no consent and no legitimate interest for every vendor on list when invoked with empty object', (done) => {
			const consents = {};

			const vendors = {};
			for (let id = 1, maxId = Math.max(...Object.keys(VENDOR_LIST.vendors)); id <= maxId; id++) {
				vendors[id] = false;
			}
			const blueprint = {
				cmpId: 280,
				cmpVersion: 2,
				tcfPolicyVersion: 2,
				supportOOB: false,
				vendorListVersion: 100,
				isServiceSpecific: true,
				useNonStandardStacks: false,
				publisherCC: 'AA',
				gdprApplies: true,
				outOfBand: { allowedVendors: {}, disclosedVendors: {} },
				purpose: { consents: {}, legitimateInterests: {} },
				vendor: { consents: vendors, legitimateInterests: vendors },
				specialFeatureOptins: {},
				publisher: {
					consents: {},
					legitimateInterests: {},
					customPurposes: { purposes: {}, legitimateInterests: {} },
					restrictions: {}
				},
				listenerId: undefined
			};

			commands.getConsentObject((tcData, success) => {
				const {
					tcString,
					created,
					lastUpdated,
					...rest
				} = tcData;

				expect(success).to.be.true;
				expect(tcString).not.to.be.undefined;
				expect(decodeConsentData(tcString)).not.to.be.undefined;
				expect(created).not.to.be.undefined;
				expect(lastUpdated).not.to.be.undefined;
				expect(rest).to.deep.equal(blueprint);
				done();
			}, consents, VENDOR_LIST);
		});

		it('should return consent object with corresponded values when invoked with proper object but without any consents', (done) => {
			const consents = {
				vendorConsents: [],
				vendorLegitimateInterests: [],
				specialFeatureOptins: [],
				purposeConsents: [],
				purposeLegitimateInterests: [],
				publisherConsents: [],
				publisherLegitimateInterests: []
			};

			commands.getConsentObject((tcData, success) => {
				expect(success).to.be.true;
				expect(tcData.tcString).not.to.be.undefined;
				expect(decodeConsentData(tcData.tcString)).not.to.be.undefined;
				expect(tcData.cmpId).to.equal(CMP_ID);
				expect(tcData.cmpVersion).to.equal(CMP_VERSION);
				expect(tcData.tcfPolicyVersion).to.equal(2);
				expect(tcData.isServiceSpecific).to.be.true;
				expect(tcData.vendorListVersion).to.equal(VENDOR_LIST.vendorListVersion);
				expect(tcData.created).not.to.be.undefined;
				expect(tcData.lastUpdated).not.to.be.undefined;
				expect(Object.keys(tcData.outOfBand.allowedVendors).length).to.equal(0);
				expect(Object.keys(tcData.outOfBand.disclosedVendors).length).to.equal(0);

				// vendors section
				const purposeConsents = filter(tcData.purpose.consents);
				const purposeLegInt = filter(tcData.purpose.legitimateInterests);
				const vendorConsents = filter(tcData.vendor.consents);
				const vendorLegInt = filter(tcData.vendor.legitimateInterests);
				const specialFeatureOptins = filter(tcData.specialFeatureOptins);

				expect(purposeConsents.length).to.equal(consents.purposeConsents.length);
				expect(purposeLegInt.length).to.equal(consents.purposeLegitimateInterests.length);
				expect(vendorConsents.length).to.equal(consents.vendorConsents.length);
				expect(vendorLegInt.length).to.equal(consents.vendorLegitimateInterests.length);
				expect(specialFeatureOptins.length).to.equal(consents.specialFeatureOptins.length);

				// publisher section
				const publisherConsents = filter(tcData.publisher.consents);
				const publisherLegInt = filter(tcData.publisher.legitimateInterests);
				expect(publisherConsents.length).to.equal(consents.publisherConsents.length);
				expect(publisherLegInt.length).to.equal(consents.publisherLegitimateInterests.length);
				done();
			}, consents, VENDOR_LIST);
		});

		it('should return consent object with corresponded values when invoked with proper object', (done) => {
			const consents = {
				vendorListVersion: 27,
				vendorConsents: [1, 2],
				vendorLegitimateInterests: [1, 2],
				specialFeatureOptins: [1, 2],
				purposeConsents: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				purposeLegitimateInterests: [1, 2, 3, 4, 6, 7, 9, 10],
				publisherConsents: [6, 7, 8, 9, 10],
				publisherLegitimateInterests: [1, 2, 3, 4, 5]
			};

			commands.getConsentObject((tcData, success) => {
				expect(success).to.be.true;
				expect(tcData.tcString).not.to.be.undefined;
				expect(decodeConsentData(tcData.tcString)).not.to.be.undefined;
				expect(tcData.cmpId).to.equal(CMP_ID);
				expect(tcData.cmpVersion).to.equal(CMP_VERSION);
				expect(tcData.tcfPolicyVersion).to.equal(2);
				expect(tcData.isServiceSpecific).to.be.true;
				expect(tcData.vendorListVersion).to.equal(VENDOR_LIST.vendorListVersion);
				expect(tcData.created).not.to.be.undefined;
				expect(tcData.lastUpdated).not.to.be.undefined;
				expect(Object.keys(tcData.outOfBand.allowedVendors).length).to.equal(0);
				expect(Object.keys(tcData.outOfBand.disclosedVendors).length).to.equal(0);

				// vendors section
				const purposeConsents = filter(tcData.purpose.consents);
				const purposeLegInt = filter(tcData.purpose.legitimateInterests);
				const vendorConsents = filter(tcData.vendor.consents);
				const vendorLegInt = filter(tcData.vendor.legitimateInterests);
				const specialFeatureOptins = filter(tcData.specialFeatureOptins);

				expect(purposeConsents.length).to.equal(consents.purposeConsents.length);
				expect(purposeLegInt.length).to.equal(consents.purposeLegitimateInterests.length);
				expect(vendorConsents.length).to.equal(consents.vendorConsents.length);
				expect(vendorLegInt.length).to.equal(consents.vendorLegitimateInterests.length);
				expect(specialFeatureOptins.length).to.equal(consents.specialFeatureOptins.length);

				// publisher section
				const publisherConsents = filter(tcData.publisher.consents);
				const publisherLegInt = filter(tcData.publisher.legitimateInterests);
				expect(publisherConsents.length).to.equal(consents.publisherConsents.length);
				expect(publisherLegInt.length).to.equal(consents.publisherLegitimateInterests.length);
				done();
			}, consents, VENDOR_LIST);
		});

		it('should return consent object with corresponded values when invoked with proper object also when consent was persisted before', (done) => {
			const consents = {
				vendorConsents: [1, 2],
				vendorLegitimateInterests: [1, 2],
				specialFeatureOptins: [1, 2],
				purposeConsents: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				purposeLegitimateInterests: [1, 2, 3, 4, 6, 7, 9, 10],
				publisherConsents: [6, 7, 8, 9, 10],
				publisherLegitimateInterests: [1, 2, 3, 4, 5]
			};

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
				tcModel.specialFeatureOptins.set(SPECIAL_FEATURE_OPT_INS);

				// creating consent
				const encoded = encodeConsentData(tcModel);
				const localStore = new Store({
					cmpId: CMP_ID,
					consentString: encoded
				});
				const localCommands = createCommands(localStore);
				const cmpApi = new CmpApi(280, 2, localCommands);
				store.setCmpApi(cmpApi);
				store.updateVendorList(VENDOR_LIST);

				setTimeout(() => {
					const now = new Date();
					localCommands.getConsentObject((tcData, success) => {
						expect(success).to.be.true;
						expect(tcData.tcString).not.to.be.undefined;
						expect(decodeConsentData(tcData.tcString)).not.to.be.undefined;
						expect(tcData.cmpId).to.equal(CMP_ID);
						expect(tcData.cmpVersion).to.equal(CMP_VERSION);
						expect(tcData.tcfPolicyVersion).to.equal(2);
						expect(tcData.isServiceSpecific).to.be.true;
						expect(tcData.vendorListVersion).to.equal(VENDOR_LIST.vendorListVersion);
						expect(tcData.created).to.be.beforeTime(now);
						expect(tcData.lastUpdated).to.be.beforeTime(now);
						done();
					}, consents, VENDOR_LIST);
				}, 100);

			}, 0);
		});
	});

	describe('getConsentFieldsV1', () => {
		it('should return empty object and false when invoked without vendor list', (done) => {
			const consents = {};

			commands.getConsentFieldsV1((tcData, success) => {
				expect(tcData).to.deep.equal({});
				expect(success).to.be.false;
				done();
			}, consents);
		});


		it('should return empty object and false when invoked with undefined', (done) => {
			commands.getConsentFieldsV1((tcData, success) => {
				expect(tcData).to.deep.equal({});
				expect(success).to.be.false;
				done();
			}, undefined);
		});

		it('should return consent object without any consents when invoked with proper object but without any consents', (done) => {
			const consents = {
				"selectedPurposeIds": [],
				"selectedVendorIds": [],
				"vendorListVersion": 179,
				"cookieVersion": 1,
				"cmpVersion": 1
			};

			commands.getConsentFieldsV1((tcData, success) => {
				expect(tcData.metadata).not.to.be.undefined;
				expect(success).to.be.true;
				expect(tcData.gdprApplies).to.be.true;
				expect(tcData.hasGlobalScope).to.be.false;
				expect(tcData.cmpId).to.be.equal(CMP_ID);
				expect(tcData.cmpVersion).to.be.equal(CMP_VERSION);
				expect(tcData.created).to.be.undefined;
				expect(tcData.lastUpdated).to.be.undefined;
				expect(tcData.cookieVersion).to.equal(1);
				expect(tcData.vendorListVersion).to.equal(consents.vendorListVersion);
				done();
			}, consents);
		});

		it('should return consent object without any consents when invoked with proper object', (done) => {
			const consents = {
				"maxVendorId": 200,
				"selectedPurposeIds": [1, 2, 3, 4, 5],
				"selectedVendorIds": [2,3,4,100, 157],
				"vendorListVersion": 179,
				"cookieVersion": 1,
				"cmpVersion": 1
			};

			commands.getConsentFieldsV1((tcData, success) => {
				expect(tcData.metadata).not.to.be.undefined;
				expect(success).to.be.true;
				expect(tcData.gdprApplies).to.be.true;
				expect(tcData.hasGlobalScope).to.be.false;
				expect(tcData.cmpId).to.be.equal(CMP_ID);
				expect(tcData.cmpVersion).to.be.equal(CMP_VERSION);
				expect(tcData.created).to.be.undefined;
				expect(tcData.lastUpdated).to.be.undefined;
				expect(tcData.cookieVersion).to.equal(1);
				expect(tcData.vendorListVersion).to.equal(consents.vendorListVersion);
				done();
			}, consents);
		});

		it('should return consent object with corresponded values when invoked with proper object also when consent was persisted before', (done) => {
			const consents = {
				"maxVendorId": 200,
				"selectedPurposeIds": [1, 2, 3, 4, 5],
				"selectedVendorIds": [2,3,4,100, 157],
				"vendorListVersion": 179,
				"cookieVersion": 1,
				"cmpVersion": 1
			};

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
				tcModel.specialFeatureOptins.set(SPECIAL_FEATURE_OPT_INS);

				// creating consent
				const encoded = encodeConsentData(tcModel);
				const localStore = new Store({
					cmpId: CMP_ID,
					consentString: encoded
				});
				const localCommands = createCommands(localStore);
				const cmpApi = new CmpApi(280, 2, localCommands);
				store.setCmpApi(cmpApi);
				store.updateVendorList(VENDOR_LIST);

				setTimeout(() => {
					const now = new Date();
					localCommands.getConsentFieldsV1((tcData, success) => {
						expect(tcData.metadata).not.to.be.undefined;
						expect(success).to.be.true;
						expect(tcData.gdprApplies).to.be.true;
						expect(tcData.hasGlobalScope).to.be.false;
						expect(tcData.cmpId).to.be.equal(CMP_ID);
						expect(tcData.cmpVersion).to.be.equal(CMP_VERSION);
						expect(tcData.created).not.to.be.undefined;
						expect(tcData.lastUpdated).not.to.be.undefined;
						expect(tcData.cookieVersion).to.equal(1);
						expect(tcData.vendorListVersion).to.equal(consents.vendorListVersion);
						expect(tcData.created).to.be.beforeTime(now);
						expect(tcData.lastUpdated).to.be.beforeTime(now);
						done();
					}, consents, VENDOR_LIST);
				}, 100);

			}, 0);
		});


		it('getVendorListVersion - should return null if transparency was not established', () => {
			commands.getVendorListVersion((vendorListVersion) => {
				expect(vendorListVersion).to.be.null;
			});
		});

		it('getVendorListVersion - should return vendor list version if transparency was established', () => {
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
				tcModel.specialFeatureOptins.set(SPECIAL_FEATURE_OPT_INS);

				// creating consent
				const encoded = encodeConsentData(tcModel);
				const localStore = new Store({
					cmpId: CMP_ID,
					consentString: encoded
				});

				const localCommands = createCommands(localStore);
				const cmpApi = new CmpApi(280, 2, localCommands);
				store.setCmpApi(cmpApi);
				store.updateVendorList(VENDOR_LIST);

				localCommands.getVendorListVersion((vendorListVersion) => {
					expect(vendorListVersion).to.equal(100);
				});
			}, 0);
		});
	});

	describe('additional functions', () => {
		let callbackExecuted, store, cmpManager, commands;

		beforeEach(() => {
			store = new Store({
				cmpId: CMP_ID
			});
			cmpManager = new CmpManager();
			commands = createCommands(store, cmpManager);
			callbackExecuted = false;
		});

		afterEach(() => {
			callbackExecuted = false;
		});

		it('showConsentTool - should execute all inner methods', () => {
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback();
			});
			store.updateSection = jest.fn();
			store.toggleConsentToolShowing = jest.fn();
			cmpManager.notify = jest.fn();

			commands.showConsentTool(() => {
				callbackExecuted = true;
			});

			expect(store.updateSection.mock.calls.length).to.equal(1);
			expect(store.toggleConsentToolShowing.mock.calls[0][0]).to.be.true;
			expect(cmpManager.openConsentTool).to.be.true;
			expect(cmpManager.notify.mock.calls[0][0]).to.equal('openConsentTool');
			expect(cmpManager.notify.mock.calls[0][1]).to.deep.equal({section: 'intro'});
			expect(callbackExecuted).to.be.true;
		});

		it('showConsentDetailView - should execute all inner methods', () => {
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback();
			});
			store.updateSection = jest.fn();
			store.toggleConsentToolShowing = jest.fn();
			cmpManager.notify = jest.fn();

			commands.showConsentDetailView(() => {
				callbackExecuted = true;
			});

			expect(store.updateSection.mock.calls[0][0]).to.equal(SECTION_DETAILS);
			expect(store.toggleConsentToolShowing.mock.calls[0][0]).to.be.true;
			expect(cmpManager.openConsentTool).to.be.true;
			expect(cmpManager.notify.mock.calls[0][0]).to.equal('openConsentTool');
			expect(cmpManager.notify.mock.calls[0][1]).to.deep.equal({section: 'details'});
			expect(callbackExecuted).to.be.true;
		});

		it('showVendors - should execute all inner methods', () => {
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback();
			});
			store.updateSection = jest.fn();
			store.toggleConsentToolShowing = jest.fn();
			cmpManager.notify = jest.fn();

			commands.showVendors(() => {
				callbackExecuted = true;
			});

			expect(store.updateSection.mock.calls[0][0]).to.equal(SECTION_DETAILS);
			expect(store.updateSection.mock.calls[0][0]).to.equal(SECTION_VENDORS);
			expect(store.toggleConsentToolShowing.mock.calls[0][0]).to.be.true;
			expect(cmpManager.openConsentTool).to.be.true;
			expect(cmpManager.notify.mock.calls[0][0]).to.equal('openConsentTool');
			expect(cmpManager.notify.mock.calls[0][1]).to.deep.equal({section: 'details'});
			expect(callbackExecuted).to.be.true;
		});

		it('showFooter - should show footer', () => {
			let footerShown = false;
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback();
			});
			commands.showFooter((result) => {
				footerShown = result;
				callbackExecuted = true;
			});
			expect(callbackExecuted).to.be.true;
			expect(footerShown).to.be.true;
		});

		it('showFooter - should not show footer because tool is showing', () => {
			let footerShown = false;
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback();
			});
			store.isConsentToolShowing = true;
			commands.showFooter((result) => {
				footerShown = result;
				callbackExecuted = true;
			});
			expect(callbackExecuted).to.be.true;
			expect(footerShown).to.be.false;
		});

		it('registerEventListener - should execute all inner methods', () => {
			cmpManager.addEventListener = jest.fn();

			const callback = () => {
				callbackExecuted = true;
			};

			commands.registerEventListener(callback, {
				event: 'isLoaded'
			});

			expect(cmpManager.addEventListener.mock.calls[0][0]).to.equal('isLoaded');
			expect(cmpManager.addEventListener.mock.calls[0][1]).to.equal(callback);
		});

		it('unregisterEventListener - should execute all inner methods', () => {
			cmpManager.removeEventListener = jest.fn();
			const callback = () => {
				callbackExecuted = true;
			};

			commands.unregisterEventListener(callback, {
				event: 'isLoaded'
			});

			expect(cmpManager.removeEventListener.mock.calls[0][0]).to.equal('isLoaded');
			expect(cmpManager.removeEventListener.mock.calls[0][1]).to.equal(callback);
		});
	});
});
