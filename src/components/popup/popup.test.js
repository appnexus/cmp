/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import { expect } from 'chai';
import Store from '../../lib/store';

import Popup from './popup';
import {VENDOR_LIST} from "../../../test/constants";
import {CmpApi} from "@iabtcf/cmpapi";
import {CMP_ID, CMP_VERSION} from "../../lib/init";

describe('Popup', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('should render with overlay hidden', () => {
		const store = new Store({
			cmpId: CMP_ID
		});
		store.isConsentToolShowing = false;
		const popup = <Popup store={store} />;
		expect(popup).to.contain('display: none');
	});

	it('should render with overlay visible', () => {
		const store = new Store({
			cmpId: CMP_ID
		});
		store.isConsentToolShowing = true;
		const popup = <Popup store={store} />;
		expect(popup).to.contain('display: flex');
	});

	it('should handle accept all', (done) => {
		const cmpApi = new CmpApi(CMP_ID, CMP_VERSION);
		const store = new Store({
			cmpId: CMP_ID
		});
		store.setCmpApi(cmpApi);
		store.updateVendorList(VENDOR_LIST);
		store.selectAllVendors = jest.fn();

		store.selectAllPurposes = jest.fn();
		store.selectAllVendorLegitimateInterests = jest.fn();
		store.selectAllPurposes = jest.fn();
		store.selectAllPurposesLegitimateInterests = jest.fn();
		store.selectAllSpecialFeatureOptins = jest.fn();
		store.selectAllPublisherPurposes = jest.fn();


		let popup;
		render(<Popup
			store={store}
			ref={ref => popup = ref}
			onSave={() => {
				expect(store.selectAllVendors.mock.calls[0][0]).to.equal(true);
				expect(store.selectAllVendorLegitimateInterests.mock.calls[0][0]).to.equal(true);
				expect(store.selectAllPurposes.mock.calls[0][0]).to.equal(true);
				expect(store.selectAllPurposesLegitimateInterests.mock.calls[0][0]).to.equal(true);
				expect(store.selectAllSpecialFeatureOptins.mock.calls[0][0]).to.equal(true);
				expect(store.selectAllPublisherPurposes.mock.calls[0][0]).to.equal(true);
				done();
			}}
		/>, scratch);

		popup.onAcceptAll();
	});

	it('should switch between panel states', () => {
		const store = new Store({
			cmpId: CMP_ID,
		});

		let popup;
		render(<Popup
			store={store}
			ref={ref => popup = ref}
		/>, scratch);

		expect(popup.props.store.section).to.equal(0);
		popup.handleShowDetails();
		expect(popup.props.store.section).to.equal(1);
		popup.onCancel();
		expect(popup.props.store.section).to.equal(0);
	});
});
