/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';
import config from './config';


jest.mock('./portal');
const mockPortal = require('./portal');

import { fetchPubVendorList, fetchGlobalVendorList, fetchPurposeList } from './vendor';

describe('vendor', () => {

	let xhr;

	beforeEach(() => {
		mockPortal.sendPortalCommand = jest.fn().mockImplementation(() => Promise.resolve());
		xhr = {
			responseText: '{}',
			open: jest.fn(),
			send: () => {
				this.onload();
			}
		};
		window.XMLHttpRequest = jest.fn(() => xhr);
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
		xhr.send = () => {
			this.onerror();
		};
		fetchGlobalVendorList()
			.then(() => {
				expect(mockPortal.sendPortalCommand.mock.calls[0][0]).to.deep.equal({ command: 'readVendorList' });
				done();
			});
	});

	it('fetchPurposeList returns nothing if there is no customPurposeListLocation', (done) => {
		config.update({
			customPurposeListLocation: undefined
		});

		fetchPurposeList().then(() => {
			expect(window.XMLHttpRequest.mock.calls).to.be.empty;
			done();
		});
	});

	it('fetchPurposeList returns nothing if storePublisherData = false', (done) => {
		config.update({
			storePublisherData: true
		});

		fetchPurposeList().then(() => {
			expect(window.XMLHttpRequest.mock.calls).to.be.empty;
			done();
		});
	});


	it('fetchPurposeList fetches the configured URL', (done) => {
		config.update({
			customPurposeListLocation: 'somepath.json'
		});

		fetchPurposeList().then(() => {
			expect(xhr.open.mock.calls[0][0]).to.equal('GET', 'somepath.json', true);
			done();
		});
	});
});
