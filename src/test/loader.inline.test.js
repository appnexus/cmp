/* eslint-disable max-nested-callbacks */
/* eslint-disable no-eval */

import { expect } from 'chai';
import fs from 'fs';
import vendorlist from '../docs/assets/vendorlist.json';
import { getCookieDomain } from '../lib/cookie/cookie';
import { deleteAllCookies, setCookie, oldEuconsentCookie } from './helpers';

const fakeScriptSrc = './fake-loader-src.js';

describe('cmpLoader as script tag', () => {
	let appendChild;

	beforeEach(() => {
		appendChild = window.document.body.appendChild = jest.fn(() => {});
		const content = fs.readFileSync('./src/loader.js');
		eval(content + '; global.cmp = cmp');
	});

	afterEach(() => {
		deleteAllCookies(getCookieDomain());
		eval('; global.cmp = null; cmp = null;');
		jest.restoreAllMocks();
		appendChild.mockRestore();
	});

	it('loads cmp as script tag', done => {
		expect(global.cmp).to.not.be.undefined;
		expect(typeof global.cmp).to.equal('function');
		done();
	});

	it('warns when no scriptSrc provided', done => {
		const log = jest.spyOn(window.console, 'log');

		global.cmp('init', {
			logging: true
		});
		expect(log.mock.calls).to.have.length(1);
		expect(log.mock.calls[0][0]).to.contain('Provide src');
		log.mockRestore();
		done();
	});

	it('warns when gdprApplies is false', done => {
		const log = jest.spyOn(window.console, 'log');
		global.cmp('init', {
			scriptSrc: fakeScriptSrc,
			gdprApplies: false,
			logging: true
		});

		expect(log.mock.calls).to.have.length(1);
		expect(log.mock.calls[0][0]).to.contain('gdprApplies turned off so no CMP');

		log.mockRestore();
		done();
	});

	it('appends scriptSrc if gdprApplies and scriptSrc provided', done => {
		const createElement = jest.spyOn(window.document, 'createElement');

		global.cmp('init', {
			scriptSrc: fakeScriptSrc,
			gdprApplies: true
		});

		expect(createElement.mock.calls).to.have.length(1);
		expect(createElement.mock.calls[0][0]).to.contain('script');
		expect(appendChild.mock.calls).to.have.length(1);

		createElement.mockRestore();
		done();
	});

	it('warns on multiple init calls', done => {
		const log = jest.spyOn(window.console, 'log');
		global.cmp('init', {
			scriptSrc: fakeScriptSrc,
			gdprApplies: true,
			logging: true
		});

		global.cmp('init', {
			scriptSrc: fakeScriptSrc,
			gdprApplies: true,
			logging: true
		});

		expect(log.mock.calls).to.have.length(1);
		expect(log.mock.calls[0][0]).to.contain('Only call init once');

		log.mockRestore();
		done();
	});

	describe('Complete CMP loading with reimport of loader shim', () => {
		let appendChild;

		beforeEach(() => {
			window.fetch = jest.fn().mockImplementation(src => {
				if (src === 'https://vendorlist.consensu.org/vendorlist.json') {
					return Promise.resolve({
						json: () => {
							return vendorlist;
						}
					});
				}
				return Promise.resolve(src);
			});
			appendChild = window.document.body.appendChild = jest.fn(() => {
				require('../s1/cmp'); // need to require this here because there is no built version that we can script load
			});
		});

		afterEach(() => {
			appendChild.mockRestore();
			jest.resetModules();
		});

		it('triggers isLoaded after loading complete CMP', done => {
			global.cmp('init', {
				scriptSrc: fakeScriptSrc,
				gdprApplies: true
			});

			global.cmp('addEventListener', 'isLoaded', result => {
				expect(result.event).to.equal('isLoaded');
				done();
			});
		});

		it('triggers callback on init after loading complete CMP', done => {
			global.cmp(
				'init',
				{
					scriptSrc: fakeScriptSrc,
					gdprApplies: true
				},
				() => {
					const init = global.cmp.commandQueue.find(({ command }) => {
						return command === 'init';
					});
					expect(init).to.be.undefined;
					done();
				}
			);
		});

		it('triggers callback on init and isLoaded after loading complete CMP', done => {
			let count = 0;
			const callback = () => {
				count++;
				if (count === 2) {
					done();
				}
			};

			global.cmp(
				'init',
				{
					scriptSrc: fakeScriptSrc,
					gdprApplies: true
				},
				callback
			);

			global.cmp('addEventListener', 'isLoaded', callback);
		});

		it('auto accepts consents', done => {
			global.cmp(
				'init',
				{
					scriptSrc: fakeScriptSrc,
					gdprApplies: true,
					shouldAutoConsent: true
				},
				result => {
					expect(result.consentRequired).to.be.true;
					expect(result.errorMsg).to.be.empty;
					expect(document.cookie.indexOf('gdpr_opt_in=1')).to.be.above(1);
					done();
				}
			);
		});

		it('auto accepts consents and shows banner', done => {
			expect(document.cookie.indexOf('euconsent')).to.be.below(0);

			let toggleConsentToolShowing;

			global.cmp('addEventListener', 'isLoaded', () => {
				const store = global.cmp.store;
				toggleConsentToolShowing = jest.spyOn(store, 'toggleConsentToolShowing');
			});

			global.cmp(
				'init',
				{
					scriptSrc: fakeScriptSrc,
					gdprApplies: true,
					shouldAutoConsentWithFooter: true
				},
				result => {
					expect(result.consentRequired).to.be.true;
					expect(result.errorMsg).to.be.empty;
					expect(document.cookie.indexOf('gdpr_opt_in=1')).to.be.above(1);
					expect(toggleConsentToolShowing.mock.calls).to.have.length(1);
					toggleConsentToolShowing.mockRestore();
					done();
				}
			);
		});

		it('triggers onConsentChanged with autoconsent', done => {
			expect(document.cookie.indexOf('euconsent')).to.equal(-1);

			global.cmp('addEventListener', 'onConsentChanged', () => {
				expect(document.cookie.indexOf('gdpr_opt_in=1')).to.be.above(1);
				done();
			});

			global.cmp(
				'init',
				{
					scriptSrc: fakeScriptSrc,
					gdprApplies: true,
					shouldAutoConsentWithFooter: true
				},
				result => {
					expect(result.consentRequired).to.be.true;
					expect(result.errorMsg).to.be.empty;
				}
			);
		});

		it('auto upgrades consent and does not trigger onConsentChanged when consent found with correctable error', done => {
			expect(document.cookie.indexOf('euconsent')).to.equal(-1);
			expect(document.cookie.indexOf('gdpr_opt_in')).to.equal(-1);
			setCookie('euconsent', oldEuconsentCookie);
			setCookie('gdpr_opt_in', '1');
			expect(document.cookie.indexOf('euconsent')).to.be.above(-1);
			expect(document.cookie.indexOf('gdpr_opt_in')).to.be.above(-1);

			const onConsentChanged = jest.fn();
			global.cmp('addEventListener', 'onConsentChanged', onConsentChanged);

			global.cmp(
				'init',
				{
					scriptSrc: fakeScriptSrc,
					gdprApplies: true
				},
				result => {
					expect(result.consentRequired).to.be.true;
					expect(result.errorMsg).to.be.empty;
					expect(result.warningMsg).to.equal(
						'Consent found for version 165, but received vendor list version 5. Consent upgraded, show consent notice'
					);
					expect(document.cookie.indexOf('gdpr_opt_in=1')).to.be.above(1);

					setTimeout(() => {
						// notification happens after init callback, so wait a tick
						expect(onConsentChanged.mock.calls).to.have.length(0);
						onConsentChanged.mockRestore();
						done();
					}, 0);
				}
			);
		});

		it('auto upgrades consent and triggers onConsentChanged when gdpr_opt_in_cookie is reset', done => {
			expect(document.cookie.indexOf('euconsent')).to.equal(-1);
			expect(document.cookie.indexOf('gdpr_opt_in')).to.equal(-1);
			setCookie('euconsent', oldEuconsentCookie);
			expect(document.cookie.indexOf('euconsent')).to.be.above(-1);

			global.cmp('addEventListener', 'onConsentChanged', () => {
				expect(document.cookie.indexOf('gdpr_opt_in=1')).to.be.above(-1);
				done();
			});

			global.cmp(
				'init',
				{
					scriptSrc: fakeScriptSrc,
					gdprApplies: true
				},
				result => {
					expect(result.consentRequired).to.be.true;
					expect(result.errorMsg).to.be.empty;
					expect(result.warningMsg).to.equal(
						'Consent found for version 165, but received vendor list version 5. Consent upgraded, show consent notice'
					);
					expect(document.cookie.indexOf('gdpr_opt_in=1')).to.be.above(1);
				}
			);
		});

		it('does not trigger onConsentChanged when errorMsg present and consent exists', done => {
			expect(document.cookie.indexOf('euconsent')).to.equal(-1);
			setCookie('euconsent', oldEuconsentCookie);
			expect(document.cookie.indexOf('euconsent')).to.equal(0);

			const onConsentChanged = jest.fn();
			global.cmp('addEventListener', 'onConsentChanged', onConsentChanged);

			global.cmp(
				'init',
				{
					scriptSrc: fakeScriptSrc,
					gdprApplies: true,
					shouldAutoUpgradeConsent: false
				},
				result => {
					expect(result.consentRequired).to.be.true;
					expect(result.errorMsg).to.equal(
						'Consent found for version 165, but received vendor list version 5. Show consent tool'
					);
					expect(result.warningMsg).to.be.empty;
					expect(document.cookie.indexOf('gdpr_opt_in=1')).to.be.above(1);

					setTimeout(() => {
						// notification happens after init callback, so wait a tick
						expect(onConsentChanged.mock.calls).to.have.length(0);
						onConsentChanged.mockRestore();
						done();
					}, 0);
				}
			);
		});

		it('does not autoconsent or trigger onConsentChanged when autoconsent is off', done => {
			expect(document.cookie.indexOf('euconsent')).to.equal(-1);

			const onConsentChanged = jest.fn();
			global.cmp('addEventListener', 'onConsentChanged', onConsentChanged);

			global.cmp(
				'init',
				{
					scriptSrc: fakeScriptSrc,
					gdprApplies: true
				},
				result => {
					expect(result.consentRequired).to.be.true;
					expect(result.errorMsg).to.equal('No consent data found. Show consent tool');
					expect(result.hasConsented).to.be.false;

					setTimeout(() => {
						// notification happens after init callback, so wait a tick
						expect(onConsentChanged.mock.calls).to.have.length(0);
						onConsentChanged.mockRestore();
						done();
					}, 0);
				}
			);
		});

		it('triggers onConsentChanged when flipping gdpr_opt_in bit', done => {
			setCookie('gdpr_opt_in', '0'); // tests that we convert gdpr_opt_in cookie to boolean correctly
			const onConsentChanged = jest.fn();
			global.cmp('addEventListener', 'onConsentChanged', onConsentChanged);
			global.cmp(
				'init',
				{
					scriptSrc: fakeScriptSrc,
					gdprApplies: true,
					shouldAutoConsentWithFooter: true
				},
				result => {
					expect(result.consentRequired).to.be.true;
					expect(result.hasConsented).to.be.true;

					setTimeout(() => {
						// notification happens after init callback, so wait a tick
						expect(onConsentChanged.mock.calls).to.have.length(1);
						onConsentChanged.mockRestore();
						done();
					}, 0);
				}
			);
		});

		it('defaults to correct cookie domain', done => {
			global.cmp(
				'init',
				{
					scriptSrc: fakeScriptSrc,
					gdprApplies: true,
					shouldAutoConsentWithFooter: true,
					cookieDomain: 'localhost'
				},
				result => {
					expect(result.consentRequired).to.be.true;
					expect(result.hasConsented).to.be.true;
					const cookieDomain = getCookieDomain();
					expect(cookieDomain).to.equal('');
					expect(document.cookie.indexOf('gdpr_opt_in=1')).to.be.above(1);
					done();
				}
			);
		});
	});
});
