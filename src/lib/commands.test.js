/* eslint-disable max-nested-callbacks */
import { expect, use } from 'chai';
import Store, { SECTION_DETAILS, SECTION_VENDORS } from './store';
import createCommands from './commands';
import { CMP_ID } from './init';
import datetime from 'chai-datetime';
import CmpManager from './cmpManager';

use(datetime);

describe('commands', () => {
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
				callback({ event, data: true });
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
			expect(cmpManager.notify.mock.calls[0][1]).to.deep.equal({ section: 'intro' });
			expect(callbackExecuted).to.be.true;
		});

		it('showConsentTool - should not show consent tool because cmpReady has failed', () => {
			let shown = false;
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback({ event, data: false });
			});
			store.isConsentToolShowing = true;
			commands.showConsentTool((result) => {
				shown = result;
				callbackExecuted = true;
			});
			expect(callbackExecuted).to.be.true;
			expect(shown).to.be.false;
		});

		it('showConsentDetailView - should execute all inner methods', () => {
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback({ event, data: true });
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
			expect(cmpManager.notify.mock.calls[0][1]).to.deep.equal({ section: 'details' });
			expect(callbackExecuted).to.be.true;
		});

		it('showConsentDetailView - should not show consent tool detail view because cmpReady has failed', () => {
			let shown = false;
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback({ event, data: false });
			});
			store.isConsentToolShowing = true;
			commands.showConsentDetailView((result) => {
				shown = result;
				callbackExecuted = true;
			});
			expect(callbackExecuted).to.be.true;
			expect(shown).to.be.false;
		});

		it('showVendors - should execute all inner methods', () => {
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback({ event, data: true });
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
			expect(cmpManager.notify.mock.calls[0][1]).to.deep.equal({ section: 'details' });
			expect(callbackExecuted).to.be.true;
		});

		it('showVendors - should not show vendors because cmpReady has failed', () => {
			let shown = false;
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback({ event, data: false });
			});
			store.isConsentToolShowing = true;
			commands.showVendors((result) => {
				shown = result;
				callbackExecuted = true;
			});
			expect(callbackExecuted).to.be.true;
			expect(shown).to.be.false;
		});

		it('showFooter - should show footer', () => {
			let shown = false;
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback({ event, data: true });
			});
			commands.showFooter((result) => {
				shown = result;
				callbackExecuted = true;
			});
			expect(callbackExecuted).to.be.true;
			expect(shown).to.be.true;
		});

		it('showFooter - should show footer cmpReady has failed', () => {
			let shown = false;
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback({ event, data: false });
			});
			commands.showFooter((result) => {
				shown = result;
				callbackExecuted = true;
			});
			expect(callbackExecuted).to.be.true;
			expect(shown).to.be.false;
		});

		it('showFooter - should not show footer because tool is showing', () => {
			let footerShown = false;
			cmpManager.addEventListener = jest.fn().mockImplementation((event, callback) => {
				callback({ event, data: true });
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
