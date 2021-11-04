/* eslint-disable max-nested-callbacks */
import { expect, use } from 'chai';
import datetime from 'chai-datetime';
import Store from './store';
import { CmpApi } from "@iabtcf/cmpapi";
import { encodeConsentData, applyDecodeFix } from "./cookie/cookie";
import { GVL, TCModel, VendorVectorEncoder } from "@iabtcf/core";
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
import {CMP_ID} from "./init";
import config from './config';

use(datetime);

describe('store', () => {
	let cmpApi, decode;

	beforeAll(() => {
		decode = applyDecodeFix();
	});

	afterAll(() => {
		VendorVectorEncoder.decode = decode;
	});

	beforeEach(() => {
		cmpApi = new CmpApi(280, 2);
	});

	afterEach(() => {
		cmpApi = undefined;
	});

	it('cmpApi has required property to decorate them', () => {
		expect(cmpApi).to.have.property('callResponder');
		expect(cmpApi.callResponder).to.be.an('object');
		expect(cmpApi.callResponder).to.have.property('apiCall');
		expect(cmpApi.callResponder.apiCall).to.be.an('function');
	});

	it('initializes with default data', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		expect(store.isConsentToolShowing).to.equal(false);
		expect(store.tcModel.version).to.equal(2);
		expect(store.tcModel.cmpId).to.equal(280);
		expect(store.tcModel.publisherCountryCode).to.equal(config.publisherCountryCode);
	});

	it('initializes with vendorList', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

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
			tcModel.specialFeatureOptins.set(SPECIAL_FEATURE_OPT_INS);
			tcModel.publisherCountryCode = 'AA';

			const maxVendorId = Math.max(...Object.keys(VENDOR_LIST.vendors));
			const encoded = encodeConsentData(tcModel);

			const store = new Store({
				cmpId: CMP_ID,
				consentString: encoded,
			});

			store.setCmpApi(cmpApi);
			store.updateVendorList(VENDOR_LIST);

			// check if consents were applied to current state of tcModel
			expect(store.tcModel.purposeConsents.maxId).to.equal(Math.max(...PURPOSE_CONSENTS));
			expect(store.tcModel.purposeLegitimateInterests.maxId).to.equal(Math.max(...PURPOSE_LEGITIMATE_INTERESTS));
			expect(store.tcModel.vendorConsents.maxId).to.equal(maxVendorId);
			expect(store.tcModel.vendorLegitimateInterests.maxId).to.equal(maxVendorId);
			expect(store.tcModel.publisherConsents.maxId).to.equal(Math.max(...PUBLISHER_CONSENTS));
			expect(store.tcModel.publisherLegitimateInterests.maxId).to.equal(Math.max(...PUBLISHER_LEGITIMATE_INTERESTS));
			expect(store.tcModel.specialFeatureOptins.maxId).to.equal(Math.max(...SPECIAL_FEATURE_OPT_INS));
			expect(store.tcModel.publisherCountryCode).to.equal('PL');
			done();
		}, 0);
	});

	it('initializes with consent string v1.1', (done) => {
		const oldConsentString = 'BOwkm8VOwkm8VEYABAPL89-AAAAzR__7_98t_TlDfLj99f7v_zf37_2___r_BgwV__3v__r_____5_93__-______f_7_________________________________________________________________________4A';

		const tcModel = new TCModel();
		tcModel.cmpId = 280;
		tcModel.cmpVersion = 2;
		tcModel.gvl = new GVL(VENDOR_LIST);

		setTimeout(() => {
			const store = new Store({
				cmpId: CMP_ID,
				consentString: oldConsentString,
			});

			store.setCmpApi(cmpApi);

			expect(store.persistedConsentString.length).to.equal(0);
			expect(store.persistedConsentData).to.deep.equal({});
			expect(store.tcModel.purposeConsents.maxId).to.equal(0);
			expect(store.tcModel.purposeLegitimateInterests.maxId).to.equal(0);
			expect(store.tcModel.vendorConsents.maxId).to.equal(0);
			expect(store.tcModel.vendorLegitimateInterests.maxId).to.equal(0);
			expect(store.tcModel.publisherConsents.maxId).to.equal(0);
			expect(store.tcModel.publisherLegitimateInterests.maxId).to.equal(0);
			expect(store.tcModel.specialFeatureOptins.maxId).to.equal(0);
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
			tcModel.specialFeatureOptins.set(SPECIAL_FEATURE_OPT_INS);

			const maxVendorId = Math.max(...Object.keys(VENDOR_LIST.vendors));
			const encoded = encodeConsentData(tcModel);

			const store = new Store({
				cmpId: CMP_ID,
				consentString: encoded,
			});

			store.setCmpApi(cmpApi);
			store.updateVendorList(vendorList);

			expect(store.tcModel.vendorConsents.size).to.equal(VENDOR_CONSENTS.length);
			expect(store.tcModel.vendorConsents.maxId).to.equal(maxVendorId);
			expect(store.tcModel.vendorConsents.has(10)).to.be.true;
			expect(store.tcModel.vendorLegitimateInterests.has(10)).to.be.false;
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
			tcModel.specialFeatureOptins.set(SPECIAL_FEATURE_OPT_INS);

			const maxVendorId = Math.max(...Object.keys(VENDOR_LIST.vendors));
			const encoded = encodeConsentData(tcModel);

			const store = new Store({
				cmpId: 280,
				consentString: encoded,
			});

			store.setCmpApi(cmpApi);
			store.updateVendorList(VENDOR_LIST);

			const persistedConsentData = store.persistedConsentData;
			let vendorsWithoutConsentCount = 0;
			persistedConsentData.vendorConsents.forEach((consent) => {
				if (!consent) {
					vendorsWithoutConsentCount++;
				}
			});

			expect(vendorsWithoutConsentCount).to.equal(maxVendorId - VENDOR_CONSENTS.length);
			expect(persistedConsentData.vendorConsents.has(4)).to.be.true;
			expect(persistedConsentData.vendorConsents.has(5)).to.be.false;

			expect(persistedConsentData.purposeConsents.has(1)).to.be.true;
			expect(persistedConsentData.purposeConsents.has(3)).to.be.true;
			expect(persistedConsentData.purposeConsents.has(2)).to.be.false;
			expect(persistedConsentData.purposeConsents.has(4)).to.be.false;

			expect(persistedConsentData.purposeLegitimateInterests.has(2)).to.be.true;
			expect(persistedConsentData.purposeLegitimateInterests.has(4)).to.be.true;
			expect(persistedConsentData.purposeLegitimateInterests.has(1)).to.be.false;
			expect(persistedConsentData.purposeLegitimateInterests.has(3)).to.be.false;

			done();
		});
	});

	it('remove consents for vendors removed from current vendor list while user save consent', (done) => {
		const tcModel = new TCModel();
		tcModel.cmpId = 280;
		tcModel.cmpVersion = 2;
		tcModel.gvl = new GVL(VENDOR_LIST);

		setTimeout(() => {
			tcModel.vendorConsents.set([3, 9]);
			tcModel.vendorLegitimateInterests.set([2, 9]);

			const encoded = encodeConsentData(tcModel);

			const store = new Store({
				cmpId: 280,
				consentString: encoded,
			});

			store.setCmpApi(cmpApi);
			store.updateVendorList(VENDOR_LIST);

			const persistedConsentData = store.persistedConsentData;

			expect(persistedConsentData.vendorConsents.has(9)).to.be.true;
			expect(persistedConsentData.vendorLegitimateInterests.has(9)).to.be.true;

			store.persist();

			expect(persistedConsentData.vendorConsents.has(9)).to.be.false;
			expect(persistedConsentData.vendorLegitimateInterests.has(9)).to.be.false;

			done();
		});
	});

	it('selects vendor IDs', () => {
		const store = new Store({
			cmpId: CMP_ID,
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectVendor(2, false);
		store.selectVendor(3, true);
		store.persist();

		const persistedConsentData = store.persistedConsentData;
		expect(persistedConsentData.vendorConsents.has(3)).to.be.true;

	});

	it('selects ALL vendor IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectAllVendors(true);
		store.persist();

		const persistedConsentData = store.persistedConsentData;
		let vendorsWithConsentCount = 0;
		persistedConsentData.vendorConsents.forEach((consent) => {
			if (consent) {
				vendorsWithConsentCount++;
			}
		});

		expect(vendorsWithConsentCount).to.equal(Object.values(VENDOR_LIST.vendors).length);
	});

	it('selects vendor leg ints IDs', () => {
		const store = new Store({
			cmpId: CMP_ID,
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectVendorLegitimateInterests(2, false);
		store.persist();

		const persistedConsentData = store.persistedConsentData;
		expect(persistedConsentData.vendorLegitimateInterests.has(2)).to.be.false;

	});

	it('selects purpose IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectPurpose(1, false);
		store.selectPurpose(2, false);
		store.selectPurpose(3, true);
		store.persist();

		const persistedConsentData = store.persistedConsentData;
		let positiveConsentsCount = 0 ;
		persistedConsentData.purposeConsents.forEach(consent => {
			if (consent) {
				positiveConsentsCount++;
			}
		});

		expect(positiveConsentsCount).to.equal(Object.values(VENDOR_LIST.purposes).length - 2);
	});

	it('selects ALL purpose IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectAllPurposes(false);
		store.persist();

		const persistedConsentData = store.persistedConsentData;
		let positiveConsentsCount = 0 ;
		persistedConsentData.purposeConsents.forEach(consent => {
			if (consent) {
				positiveConsentsCount++;
			}
		});

		expect(positiveConsentsCount).to.equal(0);
	});

	it('selects legitimate interests IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectPurposeLegitimateInterests(1, false);
		store.selectPurposeLegitimateInterests(2, false);
		store.selectPurposeLegitimateInterests(3, true);
		store.persist();

		const persistedConsentData = store.persistedConsentData;
		let positiveConsentsCount = 0 ;
		persistedConsentData.purposeLegitimateInterests.forEach(consent => {
			if (consent) {
				positiveConsentsCount++;
			}
		});

		expect(positiveConsentsCount).to.equal(Object.values(VENDOR_LIST.purposes).length - 2);
	});

	it('selects ALL legitimate interests IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectAllPurposesLegitimateInterests(false);
		store.persist();

		const persistedConsentData = store.persistedConsentData;
		let positiveConsentsCount = 0 ;
		persistedConsentData.purposeLegitimateInterests.forEach(consent => {
			if (consent) {
				positiveConsentsCount++;
			}
		});

		expect(positiveConsentsCount).to.equal(0);
	});

	it('selects special feature opt ins IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectSpecialFeatureOptins(1, true);
		store.selectSpecialFeatureOptins(2, false);
		store.persist();

		const persistedConsentData = store.persistedConsentData;
		let positiveConsentsCount = 0 ;
		persistedConsentData.specialFeatureOptins.forEach(consent => {
			if (consent) {
				positiveConsentsCount++;
			}
		});

		expect(positiveConsentsCount).to.equal(Object.keys(VENDOR_LIST.specialFeatures).length - 1);
		expect(persistedConsentData.specialFeatureOptins.has(2)).to.be.false;
	});

	it('selects ALL special feature opt ins IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectAllSpecialFeatureOptins(false);
		store.persist();

		const persistedConsentData = store.persistedConsentData;
		let positiveConsentsCount = 0 ;
		persistedConsentData.specialFeatureOptins.forEach(consent => {
			if (consent) {
				positiveConsentsCount++;
			}
		});

		expect(positiveConsentsCount).to.equal(0);
	});

	it('selects publisher purpose IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectPublisherConsent(1, false);
		store.selectPublisherConsent(3, false);

		store.persist();

		expect(store.persistedConsentData.publisherConsents.size).to.equal(Object.keys(VENDOR_LIST.purposes).length - 2);
		expect(store.persistedConsentData.publisherConsents.has(1)).to.be.false;
		expect(store.persistedConsentData.publisherConsents.has(3)).to.be.false;
	});

	it('selects ALL publisher purpose IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectAllPublisherPurposes();
		store.persist();

		expect(store.persistedConsentData.publisherConsents.size).to.equal(Object.keys(VENDOR_LIST.purposes).length);
	});

	it('selects ALL vendors legitimate interests', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectAllVendorLegitimateInterests(false);
		store.persist();

		const persistedConsentData = store.persistedConsentData;
		let positiveConsentsCount = 0 ;

		persistedConsentData.vendorLegitimateInterests.forEach(consent => {
			if (consent) {
				positiveConsentsCount++;
			}
		});
		expect(positiveConsentsCount).to.equal(0);
	});

	it('should initialize contract purposes as consent based', () => {
		const store = new Store({
			cmpId: CMP_ID
		});
		config.update({contractPurposeIds: [1, 2], legIntPurposeIds: [3, 4 ,5, 6, 7, 8, 9, 10]});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		expect(Array.from(store.tcModel.publisherConsents)).to.deep.equal([[1, true], [2, true]]);
	});

	it('should not unset contract purpose as publisher purpose when all purposes are rejected (case when user open tab2)', () => {
		const store = new Store({
			cmpId: CMP_ID
		});
		config.update({contractPurposeIds: [1, 2], legIntPurposeIds: [3, 4 ,5, 6, 7, 8, 9, 10]});
		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectAllPurposes(false, true);
		config.contractPurposeIds.concat(config.legIntPurposeIds).forEach(id => store.selectPublisherConsent(id, false));

		expect(Array.from(store.tcModel.publisherConsents)).to.deep.equal([[1, true], [2, true]]);
	});

	it('should not unset contract purposes as vendor purposes when all purposes are rejected (case when user open tab2)', () => {
		const store = new Store({
			cmpId: CMP_ID
		});
		config.update({contractPurposeIds: [1, 2], legIntPurposeIds: [3, 4 ,5, 6, 7, 8, 9, 10]});
		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		config.contractPurposeIds.concat(config.legIntPurposeIds).forEach(id => store.selectPurpose(id, false));

		expect(Array.from(store.tcModel.purposeConsents)).to.deep.equal([[1, true], [2, true]]);
	});

	it('filters vendors to obtain ids of those with legitimate interest', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		const legIntIds = store.getVendorsWithLegIntsIds();

		expect(legIntIds.length).to.equal(3);
		expect(legIntIds[0]).to.equal(1);
	});

	it('toggle the consent modal', () => {
		const store = new Store({
			cmpId: CMP_ID
		});
		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);
		expect(store.isConsentToolShowing).to.be.false;
		store.toggleConsentToolShowing();
		expect(store.isConsentToolShowing).to.be.true;
	});

	it('should toggle the footer', () => {
		const store = new Store({
			cmpId: CMP_ID
		});
		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);
		expect(store.isFooterShowing).to.be.false;
		const footerShown = store.toggleFooterShowing(true);
		expect(store.isFooterShowing).to.be.true;
		expect(footerShown).to.be.true;
	});

	it('should not toggle the footer', () => {
		const store = new Store({
			cmpId: CMP_ID
		});
		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);
		store.isConsentToolShowing = true;
		expect(store.isFooterShowing).to.be.false;
		const footerShown = store.toggleFooterShowing(true);
		expect(store.isFooterShowing).to.be.false;
		expect(footerShown).to.be.false;
	});

	it('calls event listeners on update', (done) => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.subscribe(() => {
			done();
		});
		store.storeUpdate();
	});

	it('removes event listeners', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		const event = () => {};
		store.subscribe(event);
		store.unsubscribe(event);

		expect(store.listeners).to.be.empty;
	});

	it('updates timestamps on persist', (done) => {
		const tcModel = new TCModel();
		tcModel.cmpId = 280;
		tcModel.cmpVersion = 2;
		tcModel.gvl = new GVL(VENDOR_LIST);

		const created = tcModel.created;
		const lastUpdated = created;

		setTimeout(() => {
			tcModel.purposeConsents.set(PURPOSE_CONSENTS);
			tcModel.purposeLegitimateInterests.set(PURPOSE_LEGITIMATE_INTERESTS);
			tcModel.vendorConsents.set(VENDOR_CONSENTS);
			tcModel.vendorLegitimateInterests.set(VENDOR_LEGITIMATE_INTERESTS);
			tcModel.publisherConsents.set(PUBLISHER_CONSENTS);
			tcModel.publisherLegitimateInterests.set(PUBLISHER_LEGITIMATE_INTERESTS);
			tcModel.specialFeatureOptins.set(SPECIAL_FEATURE_OPT_INS);

			const encoded = encodeConsentData(tcModel);

			const store = new Store({
				cmpId: CMP_ID,
				consentString: encoded
			});

			store.setCmpApi(cmpApi);
			store.updateVendorList(VENDOR_LIST);
			store.persist();

			expect(store.persistedConsentData.created).to.equalDate(created);
			expect(store.persistedConsentData.lastUpdated).to.equalDate(lastUpdated);
			done();
		}, 5);
	});
});
