/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';
import Store from './store';
import createCommands from "./commands";
import {VENDOR_LIST} from "../../test/constants";
import {decodeConsentData} from "./cookie/cookie";

describe('cmp', () => {
	let store, commands;

	beforeEach(() => {
		store = new Store();
		commands = createCommands(store);
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

		it('should return consent object without any consents when invoked with empty object', (done) => {
			const consents = {};

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
				vendor: { consents: {}, legitimateInterests: {} },
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
	});

	describe('getConsentFieldsV1', () => {

	});

	describe('showConsentTool', () => {

	});

	describe('showConsentDetailView', () => {

	});

	describe('showVendors', () => {

	});

	describe('showFooter', () => {

	});

});
