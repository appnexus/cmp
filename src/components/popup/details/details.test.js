/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import { expect } from 'chai';
import Store from '../../../lib/store';
import purposesStyle from './purposes/purposes';

import Details from './details';

describe('Details', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('should render with purpose panel initially', () => {
		const store = new Store({
			vendorList: {
				purposes: [
					{ id: 1, name: 'Purpose 1' },
					{ id: 2, name: 'Purpose 2' }
				]
			}
		});
		store.isConsentToolShowing = false;
		const details = <Details store={store} />;
		expect(details).to.contain(purposesStyle.purposes);
	});


	it('should switch between panel states', () => {
		const store = new Store({
			vendorList: {
				purposes: [
					{ id: 1, name: 'Purpose 1' },
					{ id: 2, name: 'Purpose 2' }
				]
			}
		});

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