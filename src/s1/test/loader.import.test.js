/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';
import { init } from '../../lib/init';

const fakeScriptSrc = "./fake-loader-src.js";
let cmpLoader;

describe('cmpLoader as import', () => {
	beforeEach(() => {
		window.fetch = jest.fn().mockImplementation(src => {
			// TODO: import mocked versions of configured json dependencies
			return Promise.resolve(src);
		});
		cmpLoader = require("../loader");
	});

	afterEach(() => {
		window.fetch.mockRestore();
		cmpLoader = null;
		global.cmp = null;
		jest.resetModules();
	});

	it('requires initialization', done => {
		expect(cmpLoader).to.not.be.undefined;
		expect(typeof cmpLoader).to.equal('function');
		// expect commandQueue to not exist
		done();
	});

	it('allows you to use cmpLoader as API shim to CMP', done => {
		init({}, cmpLoader).then(() => {
			cmpLoader('showConsentTool', null, result => {
				expect(result).to.equal(true);
				done();
			});
		});
	});

	describe("cmpLoader import and scriptLoading", () => {
		global.cmp = cmpLoader;
		let appendChild;

		beforeEach(() => {
			appendChild = window.document.body.appendChild = jest.fn(() => {
				require('../cmp'); // need to require this here because there is no built version that we can script load
			});
		});

		afterEach(() => {
			appendChild.mockRestore();
			jest.resetModules();
			global.cmp = null;
		});

		it('allows you to use scriptloader', done => {
			global.cmp(
				'init',
				{
					scriptSrc: fakeScriptSrc,
					gdprApplies: true
				},
				() => {
					global.cmp('showConsentTool', null, result => {
						expect(result).to.equal(true);
						done();
					});
				}
			);
		});
	});
});
