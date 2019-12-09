/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import { expect } from 'chai';
import style from './vendors.less';

import Vendors from './vendors';
import Vendor from './vendor';
import Label from "../../../label/label";

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
		expect(vendorRows.length).to.equal(4);
	});

	it('should render vendor with all possible attributes', () => {
		const vendor = render(<Vendor
			name={'Vendor 1'}
			policyUrl={'www.example.com'}
			purposes={[<Label localizeKey={'purposes.title'}>Purpose 1</Label>]}
			legIntPurposes={[<Label localizeKey={'purposes.title'}>Purpose 2</Label>]}
			features={[<Label localizeKey={'features.title'}>Feature 1</Label>]}
		/>, scratch);

		const vendorRows = vendor.querySelectorAll(`div`);
		const vendorDescriptionRecords = vendor.querySelectorAll(`div > span > span`);
		expect(vendorRows.length).to.equal(2);
		expect(vendorDescriptionRecords.length).to.equal(6);
	});

	it('should render vendor without features', () => {
		const vendor = render(<Vendor
			name={'Vendor 1'}
			policyUrl={'www.example.com'}
			purposes={[
				<Label localizeKey={'purposes.title'}>Purpose 1</Label>,
				<Label localizeKey={'purposes.title'}>Purpose 1</Label>
			]}
			legIntPurposes={[<Label localizeKey={'purposes.title'}>Purpose 2</Label>]}
			features={[]}
		/>, scratch);

		const vendorRows = vendor.querySelectorAll(`div`);
		const vendorDescriptionRecords = vendor.querySelectorAll(`div > span > span`);
		expect(vendorRows.length).to.equal(2);
		expect(vendorDescriptionRecords.length).to.equal(5);
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

	it('should handle accepting all vendors if some vendors are rejected', () => {
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


		vendors.handleFullConsentChange({isSelected: true});
		expect(selectAllVendors.mock.calls[0][0]).to.equal(true);
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

	it('should handle rejecting all vendors if some vendors are selected', () => {
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


		vendors.handleFullConsentChange({isSelected: false});
		expect(selectAllVendors.mock.calls[0][0]).to.equal(false);
	});

	it('should return true if all vendors are accepted', () => {
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
			selectedVendorIds={new Set([1, 2, 3, 4])}
		/>, scratch);

		const result = vendors.isFullVendorsConsentChosen();
		expect(result).to.equal(true);
	});

	it('should return false if some vendors are rejected', () => {
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
			selectedVendorIds={new Set([1])}
		/>, scratch);

		const result = vendors.isFullVendorsConsentChosen();
		expect(result).to.equal(false);
	});
});
