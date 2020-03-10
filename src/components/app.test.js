/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import { expect } from 'chai';
import style from './app.less';
import Store from '../lib/store';

import App from './app';

describe('App', () => {
	let scratch;

	beforeAll(() => {
		scratch = document.createElement('div');
		(document.body || document.documentElement).appendChild(scratch);
	});

	beforeEach(() => {
		scratch.innerHTML = '';
	});

	afterAll(() => {
		scratch.parentNode.removeChild(scratch);
		scratch = null;
	});


	it('should render app content', () => {
		render(<App store={new Store({cmpId: 280, cmpApi: {}})} />, scratch);
		expect(scratch.innerHTML).to.contain(style.gdpr);
	});

	it('add a listener to the store to receive updates', () => {
		const store = new Store({cmpId: 280, cmpApi: {}});
		render(<App store={store} />, scratch);
		expect(store.listeners.size).to.equal(1);
	});

	it('persist state on save', () => {
		const store = new Store({cmpId: 280, cmpApi: {}});
		const notify = jest.fn();
		store.persist = jest.fn();
		store.toggleConsentToolShowing = jest.fn();

		let app;
		render(<App
			store={store}
			notify={notify}
			ref={ref => app = ref}
		/>, scratch);

		app.onSave();

		expect(notify.mock.calls[0][0]).to.equal('onSubmit');
		expect(store.persist.mock.calls.length).to.equal(1);
		expect(store.toggleConsentToolShowing.mock.calls[0][0]).to.equal(false);
	});

	it('updates local state when store changes', () => {
		const store = new Store({cmpId: 280, cmpApi: {}});

		let app;
		render(<App
			store={store}
			notify={() => {}}
			ref={ref => app = ref}
		/>, scratch);

		expect(app.state.store.tcModel.vendorConsents.maxId).to.equal(0);
		store.selectVendor(1, true);
		expect(app.state.store.tcModel.vendorConsents.maxId).to.equal(1);
	});
});
