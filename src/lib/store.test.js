/* eslint-disable max-nested-callbacks */
import { expect, use } from 'chai';
import datetime from 'chai-datetime';
import Store from './store';
import { CmpApi } from "@iabtcf/cmpapi";
import { encodeConsentData } from "./cookie/cookie";
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
import {CMP_ID} from "./init";

use(datetime);

describe('store', () => {
	let cmpApi;

	beforeEach(() => {
		cmpApi = new CmpApi(280, 2);
	});

	afterEach(() => {
		cmpApi = undefined;
	});

	it('initializes with default data', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		expect(store.isConsentToolShowing).to.equal(false);
		expect(store.tcModel.version).to.equal(2);
		expect(store.tcModel.cmpId).to.equal(280);
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
			expect(store.tcModel.vendorConsents.maxId).to.equal(Math.max(...VENDOR_CONSENTS));
			expect(store.tcModel.vendorLegitimateInterests.maxId).to.equal(Math.max(...VENDOR_LEGITIMATE_INTERESTS));
			expect(store.tcModel.publisherConsents.maxId).to.equal(Math.max(...PUBLISHER_CONSENTS));
			expect(store.tcModel.publisherLegitimateInterests.maxId).to.equal(Math.max(...PUBLISHER_LEGITIMATE_INTERESTS));
			expect(store.tcModel.specialFeatureOptins.maxId).to.equal(Math.max(...SPECIAL_FEATURE_OPT_INS));
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

			const encoded = encodeConsentData(tcModel);

			const store = new Store({
				cmpId: CMP_ID,
				consentString: encoded,
			});

			store.setCmpApi(cmpApi);
			store.updateVendorList(vendorList);

			expect(store.tcModel.vendorConsents.size).to.equal(6);
			expect(store.tcModel.vendorConsents.maxId).to.equal(10);
			expect(store.tcModel.vendorConsents.has(10)).to.be.true;
			expect(store.tcModel.vendorLegitimateInterests.has(10)).to.be.true;
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

			const encoded = encodeConsentData(tcModel);

			const store = new Store({
				cmpId: 280,
				consentString: encoded,
			});

			store.setCmpApi(cmpApi);
			store.updateVendorList(VENDOR_LIST);

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

	it('selects vendor IDs', () => {
		const store = new Store({
			cmpId: CMP_ID,
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectVendor(2, false);
		store.selectVendor(3, true);
		store.persist();

		const vendorConsentObject = store.getVendorConsentsObject();
		expect(vendorConsentObject.vendorConsents['3']).to.be.true;

	});

	it('selects ALL vendor IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectAllVendors(true);
		store.persist();

		const vendorConsentObject = store.getVendorConsentsObject();
		const vendorConsents = Object.keys(vendorConsentObject.vendorConsents).filter(key => vendorConsentObject.vendorConsents[key]);

		expect(vendorConsents.length).to.equal(Object.values(VENDOR_LIST.vendors).length);
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

		const vendorConsentObject = store.getVendorConsentsObject();
		const purposeConsents = Object.keys(vendorConsentObject.purposeConsents).filter(key => vendorConsentObject.purposeConsents[key]);

		expect(purposeConsents.length).to.equal(Object.values(VENDOR_LIST.purposes).length - 2);
	});

	it('selects ALL purpose IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectAllPurposes(false);
		store.persist();

		const vendorConsentObject = store.getVendorConsentsObject();
		const purposeConsents = Object.keys(vendorConsentObject.purposeConsents).filter(key => vendorConsentObject.purposeConsents[key]);

		expect(purposeConsents.length).to.equal(0);
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

		const vendorConsentObject = store.getVendorConsentsObject();
		const legIntConsents = Object.keys(vendorConsentObject.purposeLegitimateInterests).filter(key => vendorConsentObject.purposeLegitimateInterests[key]);

		expect(legIntConsents.length).to.equal(Object.values(VENDOR_LIST.purposes).length - 2);
	});

	it('selects ALL legitimate interests IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectAllPurposesLegitimateInterests(false);
		store.persist();

		const vendorConsentObject = store.getVendorConsentsObject();
		const legIntConsents = Object.keys(vendorConsentObject.purposeLegitimateInterests).filter(key => vendorConsentObject.purposeLegitimateInterests[key]);

		expect(legIntConsents.length).to.equal(0);
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

		const vendorConsentsObject = store.getVendorConsentsObject();
		const specialFeatureConsents = Object.keys(vendorConsentsObject.specialFeatureOptins).filter(key => vendorConsentsObject.specialFeatureOptins[key]);

		expect(specialFeatureConsents.length).to.equal(Object.keys(VENDOR_LIST.specialFeatures).length - 1);
		expect(vendorConsentsObject.specialFeatureOptins['2']).to.be.false;
	});

	it('selects ALL special feature opt ins IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectAllSpecialFeatureOptins(false);
		store.persist();

		const vendorConsentsObject = store.getVendorConsentsObject();
		const specialFeatureConsents = Object.keys(vendorConsentsObject.specialFeatureOptins).filter(key => vendorConsentsObject.specialFeatureOptins[key]);

		expect(specialFeatureConsents.length).to.equal(0);
	});

	it('selects publisher purpose IDs', () => {
		const store = new Store({
			cmpId: CMP_ID
		});

		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);

		store.selectPublisherPurpose(1, false);
		store.selectPublisherPurpose(3, false);

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

		store.selectAllPublisherPurposes(true);
		store.persist();

		expect(store.persistedConsentData.publisherConsents.size).to.equal(Object.keys(VENDOR_LIST.purposes).length);
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
