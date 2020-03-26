/* eslint-disable max-nested-callbacks */
import {expect} from 'chai';
import CmpManager from "./cmpManager";

describe('cmpManager', () => {

	let cmpManager;

	beforeEach(() => {
		cmpManager = new CmpManager();
	});

	describe('addEventListener', () => {
		it('only adds the callback instance once', () => {
			const callback = () => {};

			cmpManager.addEventListener('isLoaded', callback);

			expect(cmpManager.eventListeners.isLoaded.size).to.equal(1);
		});
	});

	describe('removeEventListener', () => {

		it('removes a specific callback instance', () => {
			const callback = () => {};

			cmpManager.addEventListener('isLoaded', callback);
			expect(cmpManager.eventListeners.isLoaded.size).to.equal(1);

			cmpManager.removeEventListener('isLoaded', callback);

			expect(cmpManager.eventListeners.isLoaded.size).to.equal(0);
		});

		it('removes all listeners of specific event', () => {
			cmpManager.addEventListener('isLoaded', () => {});
			cmpManager.addEventListener('isLoaded', () => {});
			expect(cmpManager.eventListeners.isLoaded.size).to.equal(2);

			cmpManager.removeEventListener('isLoaded');

			expect(cmpManager.eventListeners.isLoaded.size).to.equal(0);
		});

		it('removes all listeners for all events', () => {

			cmpManager.addEventListener('isLoaded', () => {});
			cmpManager.addEventListener('onSubmit', () => {});
			expect(cmpManager.eventListeners.isLoaded.size).to.equal(1);
			expect(cmpManager.eventListeners.onSubmit.size).to.equal(1);

			cmpManager.removeEventListener();

			expect(cmpManager.eventListeners).to.deep.equal({});
		});
	});
});
