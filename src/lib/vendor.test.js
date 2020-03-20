/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';
import config from './config';


jest.mock('./portal');
const mockPortal = require('./portal');

import { fetchGlobalVendorList } from './vendor';

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

	it('fetchGlobalVendorList fetches from configured globalVendorListLocation', (done) => {
		config.update({
			globalVendorListLocation: 'globalpath.json',
			storeConsentGlobally: true
		});

		fetchGlobalVendorList().then(() => {
			expect(xhr.open.mock.calls[0][1]).to.equal('globalpath.json');
			done();
		});
	});
});
