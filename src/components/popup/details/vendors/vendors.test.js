/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import { expect } from 'chai';
import style from './vendors.less';

import Vendors from './vendors';

describe('Vendors', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('should render the vendor list', () => {
		const selectAllVendors = jest.fn();

		const vendors = render(<Vendors
			vendors={[
				{id: 1, name: 'Vendor 1', purposeIds: [1], legIntPurposeIds: [2], featureIds: []},
				{id: 2, name: 'Vendor 2', purposeIds: [], legIntPurposeIds: [1], featureIds: []},
				{id: 3, name: 'Vendor 3', purposeIds: [1], legIntPurposeIds: [2], featureIds: [1]},
				{id: 4, name: 'Vendor 4', purposeIds: [2], legIntPurposeIds: [1], featureIds: [1, 2]}
			]}
			purposes={[
				{id: 1, name: 'Purpose 1'},
				{id: 2, name: 'Purpose 2'},
			]}
			features={[
				{id: 1, name: 'Feature 1'},
				{id: 2, name: 'Feature 2'},
			]}
			selectAllVendors={selectAllVendors}
		/>, scratch);

		const vendorRows = vendors.querySelectorAll(`.${style.vendorContent} tr`);
		const firstVendorAttributes = vendorRows[0].querySelectorAll(`.${style.vendorDescription} span`);
		const secondVendorAttributes = vendorRows[1].querySelectorAll(`.${style.vendorDescription} span`);
		expect(vendorRows.length).to.equal(4);
		expect(firstVendorAttributes.length).to.equal(6);
		expect(secondVendorAttributes.length).to.equal(3);
		expect(selectAllVendors.mock.calls.length).to.equal(1);
		expect(selectAllVendors.mock.calls[0][0]).to.equal(false);
	});

	it('should handle selecting a vendor', () => {
		const selectVendor = jest.fn();
		const selectAllVendors = jest.fn();

		let vendors;
		render(<Vendors
			ref={ref => vendors = ref}
			vendors={[
				{id: 1, name: 'Vendor 1', purposeIds: [1], legIntPurposeIds: [2], featureIds: []},
				{id: 2, name: 'Vendor 2', purposeIds: [], legIntPurposeIds: [1], featureIds: []},
				{id: 3, name: 'Vendor 3', purposeIds: [1], legIntPurposeIds: [2], featureIds: [1]},
				{id: 4, name: 'Vendor 4', purposeIds: [2], legIntPurposeIds: [1], featureIds: [1, 2]}
			]}
			purposes={[
				{id: 1, name: 'Purpose 1'},
				{id: 2, name: 'Purpose 2'},
			]}
			features={[
				{id: 1, name: 'Feature 1'},
				{id: 2, name: 'Feature 2'},
			]}
			selectVendor={selectVendor}
			selectAllVendors={selectAllVendors}
		/>, scratch);

		vendors.handleSelectVendor({dataId: 2, isSelected: true});
		expect(selectAllVendors.mock.calls.length).to.equal(1);
		expect(selectAllVendors.mock.calls[0][0]).to.equal(false);
		expect(selectVendor.mock.calls[0][0]).to.equal(2);
		expect(selectVendor.mock.calls[0][1]).to.equal(true);
	});

	it('should handle accepting all vendors', () => {
		const selectAllVendors = jest.fn();

		let vendors;
		render(<Vendors
			ref={ref => vendors = ref}
			vendors={[
				{id: 1, name: 'Vendor 1', purposeIds: [1], legIntPurposeIds: [2], featureIds: []},
				{id: 2, name: 'Vendor 2', purposeIds: [], legIntPurposeIds: [1], featureIds: []},
				{id: 3, name: 'Vendor 3', purposeIds: [1], legIntPurposeIds: [2], featureIds: [1]},
				{id: 4, name: 'Vendor 4', purposeIds: [2], legIntPurposeIds: [1], featureIds: [1, 2]}
			]}
			purposes={[
				{id: 1, name: 'Purpose 1'},
				{id: 2, name: 'Purpose 2'},
			]}
			features={[
				{id: 1, name: 'Feature 1'},
				{id: 2, name: 'Feature 2'},
			]}
			selectAllVendors={selectAllVendors}
		/>, scratch);

		vendors.handleAcceptAll();
		expect(selectAllVendors.mock.calls.length).to.equal(2);
		expect(selectAllVendors.mock.calls[0][0]).to.equal(false);
		expect(selectAllVendors.mock.calls[1][0]).to.equal(true);
	});

	it('should handle rejecting all vendors', () => {
		const selectAllVendors = jest.fn();

		let vendors;
		render(<Vendors
			ref={ref => vendors = ref}
			vendors={[
				{id: 1, name: 'Vendor 1', purposeIds: [1], legIntPurposeIds: [2], featureIds: []},
				{id: 2, name: 'Vendor 2', purposeIds: [], legIntPurposeIds: [1], featureIds: []},
				{id: 3, name: 'Vendor 3', purposeIds: [1], legIntPurposeIds: [2], featureIds: [1]},
				{id: 4, name: 'Vendor 4', purposeIds: [2], legIntPurposeIds: [1], featureIds: [1, 2]}
			]}
			purposes={[
				{id: 1, name: 'Purpose 1'},
				{id: 2, name: 'Purpose 2'},
			]}
			features={[
				{id: 1, name: 'Feature 1'},
				{id: 2, name: 'Feature 2'},
			]}
			selectAllVendors={selectAllVendors}
		/>, scratch);

		vendors.handleRejectAll();
		expect(selectAllVendors.mock.calls.length).to.equal(2);
		expect(selectAllVendors.mock.calls[0][0]).to.equal(false);
		expect(selectAllVendors.mock.calls[1][0]).to.equal(false);
	});
});
