/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';
import config from './config';


jest.mock('./portal');
const mockPortal = require('./portal');

import { fetchPubVendorList, fetchGlobalVendorList, fetchPurposeList } from './vendor';

describe('vendor', () => {

	beforeEach(() => {
		mockPortal.sendPortalCommand = jest.fn().mockImplementation(() => Promise.resolve());
		window.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: () => {}}));
	});


	it('fetchPubVendorList fetches from `.well-known` URL', (done) => {

		fetchPubVendorList().then(() => {
			expect(window.fetch.mock.calls[0][0]).to.equal('/.well-known/pubvendors.json');
			done();
		});
	});

	it('fetchGlobalVendorList fetches from configured globalVendorListLocation', (done) => {
		config.update({
			globalVendorListLocation: 'globalpath.json',
			storeConsentGlobally: true
		});

		fetchGlobalVendorList().then(() => {
			expect(window.fetch.mock.calls[0][0]).to.equal('globalpath.json');
			done();
		});
	});

	it('fetchGlobalVendorList returns nothing if globalVendorListLocation is empty', (done) => {
		config.update({
			globalVendorListLocation: null,
			storeConsentGlobally: true
		});

		fetchGlobalVendorList().then(() => {
			expect(window.fetch.mock.calls).to.be.empty;
			done();
		});
	});

	it('fetchPurposeList returns nothing if there is no customPurposeListLocation', (done) => {
		config.update({
			customPurposeListLocation: undefined
		});

		fetchPurposeList().then(() => {
			expect(window.fetch.mock.calls).to.be.empty;
			done();
		});
	});

	it('fetchPurposeList returns nothing if storePublisherData = false', (done) => {
		config.update({
			storePublisherData: true
		});

		fetchPurposeList().then(() => {
			expect(window.fetch.mock.calls).to.be.empty;
			done();
		});
	});


	it('fetchPurposeList fetches the configured URL', (done) => {
		config.update({
			customPurposeListLocation: 'somepath.json'
		});

		fetchPurposeList().then(() => {
			expect(window.fetch.mock.calls[0][0]).to.equal('somepath.json');
			done();
		});
	});
});
