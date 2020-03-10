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
			specialPurposes={[
				{id: 1, name: 'Special Purpose 1'},
				{id: 2, name: 'Special Purpose 2'},
			]}
			specialFeatures={[
				{id: 1, name: 'Special Feature 1'},
				{id: 2, name: 'Special Feature 2'},
			]}
		/>, scratch);

		const vendorRows = vendors.querySelectorAll(`.${style.vendorContent} tr`);
		expect(vendorRows.length).to.equal(4);
	});

	it('should render vendor with purposes, special purposes, legIntPurposes, features and special features', () => {
		const vendor = render(<Vendor
			name={'Vendor 1'}
			policyUrl={'www.example.com'}
			purposes={[<Label localizeKey={'purposes.title'}>Purpose 1</Label>]}
			legIntPurposes={[<Label localizeKey={'purposes.title'}>Purpose 2</Label>]}
			features={[<Label localizeKey={'features.title'}>Feature 1</Label>]}
			specialPurposes={[<Label localizeKey={'specialPurposes.title'}>Purpose 1</Label>]}
			specialFeatures={[<Label localizeKey={'specialFeatures.title'}>Feature 1</Label>]}
		/>, scratch);

		const vendorRows = vendor.querySelectorAll(`div`);
		const vendorDescriptionRecords = vendor.querySelectorAll(`div > span > span`);
		expect(vendorRows.length).to.equal(2);
		expect(vendorDescriptionRecords.length).to.equal(10);
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
		const initialVendorsRejection = jest.fn();

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
			specialPurposes={[
				{id: 1, name: 'sPurpose 1'},
				{id: 2, name: 'sPurpose 2'},
			]}
			specialFeatures={[
				{id: 1, name: 'sFeature 1'},
				{id: 2, name: 'sFeature 2'},
			]}
			selectVendor={selectVendor}
			initialVendorsRejection={initialVendorsRejection}
		/>, scratch);

		vendors.handleMoreChoices();
		vendors.handleSelectVendor({dataId: 2, isSelected: true});
		expect(initialVendorsRejection.mock.calls.length).to.equal(1);
		expect(selectVendor.mock.calls[0][0]).to.equal(2);
		expect(selectVendor.mock.calls[0][1]).to.equal(true);
	});

	it('should handle accepting all vendors', () => {
		const selectVendors = jest.fn();
		const initialVendorsRejection = jest.fn();

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
			specialPurposes={[
				{id: 1, name: 'sPurpose 1'},
				{id: 2, name: 'sPurpose 2'},
			]}
			specialFeatures={[
				{id: 1, name: 'sFeature 1'},
				{id: 2, name: 'sFeature 2'},
			]}
			selectVendors={selectVendors}
			initialVendorsRejection={initialVendorsRejection}
		/>, scratch);

		vendors.handleMoreChoices();
		vendors.handleAcceptAll();
		expect(initialVendorsRejection.mock.calls.length).to.equal(1);
		expect(selectVendors.mock.calls[0][0]).to.deep.equal([1, 2, 3, 4]);
		expect(selectVendors.mock.calls[0][1]).to.equal(true);
	});

	it('should handle accepting all vendors if some vendors are rejected', () => {
		const initialVendorsRejection = jest.fn();
		const selectVendors = jest.fn();

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
			specialPurposes={[
				{id: 1, name: 'sPurpose 1'},
				{id: 2, name: 'sPurpose 2'},
			]}
			specialFeatures={[
				{id: 1, name: 'sFeature 1'},
				{id: 2, name: 'sFeature 2'},
			]}
			initialVendorsRejection={initialVendorsRejection}
			selectVendors={selectVendors}
		/>, scratch);

		vendors.handleMoreChoices();
		vendors.handleFullConsentChange({isSelected: true});
		expect(initialVendorsRejection.mock.calls.length).to.equal(1);
		expect(selectVendors.mock.calls[0][0]).to.deep.equal([1, 2, 3, 4]);
		expect(selectVendors.mock.calls[0][1]).to.equal(true);
	});

	it('should handle rejecting all vendors', () => {
		const initialVendorsRejection = jest.fn();
		const selectVendors = jest.fn();

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
			specialPurposes={[
				{id: 1, name: 'sPurpose 1'},
				{id: 2, name: 'sPurpose 2'},
			]}
			specialFeatures={[
				{id: 1, name: 'sFeature 1'},
				{id: 2, name: 'sFeature 2'},
			]}
			initialVendorsRejection={initialVendorsRejection}
			selectVendors={selectVendors}
		/>, scratch);

		vendors.handleMoreChoices();
		vendors.handleRejectAll();
		expect(initialVendorsRejection.mock.calls.length).to.equal(1);
		expect(selectVendors.mock.calls[0][0]).to.deep.equal([1, 2, 3, 4]);
		expect(selectVendors.mock.calls[0][1]).to.equal(false);
	});

	it('should handle rejecting all vendors if some vendors are selected', () => {
		const initialVendorsRejection = jest.fn();
		const selectVendors = jest.fn();

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
			specialPurposes={[
				{id: 1, name: 'sPurpose 1'},
				{id: 2, name: 'sPurpose 2'},
			]}
			specialFeatures={[
				{id: 1, name: 'sFeature 1'},
				{id: 2, name: 'sFeature 2'},
			]}
			initialVendorsRejection={initialVendorsRejection}
			selectVendors={selectVendors}
		/>, scratch);

		vendors.handleMoreChoices();
		vendors.handleFullConsentChange({isSelected: false});
		expect(initialVendorsRejection.mock.calls.length).to.equal(1);
		expect(selectVendors.mock.calls[0][0]).to.deep.equal([1, 2, 3, 4]);
		expect(selectVendors.mock.calls[0][1]).to.equal(false);
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
			specialPurposes={[
				{id: 1, name: 'sPurpose 1'},
				{id: 2, name: 'sPurpose 2'},
			]}
			specialFeatures={[
				{id: 1, name: 'sFeature 1'},
				{id: 2, name: 'sFeature 2'},
			]}
			selectedVendorIds={new Set([1, 2, 3, 4])}
			initialVendorsRejection={jest.fn()}
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
			specialPurposes={[
				{id: 1, name: 'sPurpose 1'},
				{id: 2, name: 'sPurpose 2'},
			]}
			specialFeatures={[
				{id: 1, name: 'sFeature 1'},
				{id: 2, name: 'sFeature 2'},
			]}
			selectedVendorIds={new Set([1])}
			initialVendorsRejection={jest.fn()}
		/>, scratch);

		const result = vendors.isFullVendorsConsentChosen();
		expect(result).to.equal(false);
	});
});
