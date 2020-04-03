/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import { expect } from 'chai';
import Store from '../../../lib/store';
import purposesStyle from './purposes/purposes';

import Details from './details';
import {CMP_ID} from "../../../lib/init";
import {VENDOR_LIST} from "../../../../test/constants";

describe('Details', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('should render with purpose panel initially', () => {
		const store = new Store({
			cmpId: CMP_ID,
			vendorList: {
				purposes: [
					{ id: 1, name: 'Purpose 1' },
					{ id: 2, name: 'Purpose 2' }
				]
			}
		});
		store.updateVendorList(VENDOR_LIST);
		store.isConsentToolShowing = false;
		const details = <Details store={store} />;
		expect(details).to.contain(purposesStyle.allPurposes);
	});


	it('should switch between panel states', () => {
		const store = new Store({
			cmpId: CMP_ID,
			vendorList: {
				purposes: [
					{ id: 1, name: 'Purpose 1' },
					{ id: 2, name: 'Purpose 2' }
				]
			}
		});
		store.updateVendorList(VENDOR_LIST);

		let details;
		render(<Details
			store={store}
			ref={ref => details = ref}
		/>, scratch);

		expect(details.props.store.subsection).to.equal(0);
		details.handleShowVendors();
		expect(details.props.store.subsection).to.equal(1);
	});

});
