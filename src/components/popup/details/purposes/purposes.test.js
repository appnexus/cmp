/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import { expect } from 'chai';
import style from './purposes.less';

import Purposes from './purposes';

describe('Purposes and Features', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('should render all standard, custom purposes for publisher and purposes and features for vendors', () => {
		let persistedVendorConsentData = {};
		let persistedPublisherConsentData = {};
		const selectPurpose = jest.fn();
		let purposesRef;
		const purposes = render(<Purposes
			ref = {ref => purposesRef = ref}
			purposes = {[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			features = {[
				{ id: 1, name: 'Feature 1' },
				{ id: 2, name: 'Feature 2' }
			]}
			customPurposes = {[
				{ id: 1, name: 'Custom Purpose 1' },
			]}
			persistedVendorConsentData={persistedVendorConsentData}
			persistedPublisherConsentData={persistedPublisherConsentData}
			selectPurpose={selectPurpose}
		/>, scratch);

		purposesRef.componentDidUpdate = () => {
			const purposesAndFeatures = purposes.querySelectorAll(`.${style.purposeDetail}`);
			expect(purposesAndFeatures.length).to.equal(7);
		};

		purposesRef.handleSelectTab(1)();
	});

	it('should select a standard purpose', () => {
		const selectPurpose = jest.fn();
		const selectCustomPurpose = jest.fn();
		let persistedVendorConsentData = {};
		let persistedPublisherConsentData = {};
		let purposes;
		render(<Purposes
			ref={ref => purposes = ref}
			purposes={[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			selectPurpose={selectPurpose}
			selectCustomPurpose={selectCustomPurpose}
			persistedVendorConsentData={persistedVendorConsentData}
			persistedPublisherConsentData={persistedPublisherConsentData}
		/>, scratch);

		purposes.handleSelectPurpose({isSelected: true, dataId: 0});

		expect(selectPurpose.mock.calls[0][0]).to.equal(1);
		expect(selectPurpose.mock.calls[0][1]).to.equal(true);
		expect(selectCustomPurpose.mock.calls).to.be.empty;
	});

	it('should select a custom purpose', () => {
		const selectPurpose = jest.fn();
		const selectCustomPurpose = jest.fn();

		let purposes;
		let persistedVendorConsentData = {};
		let persistedPublisherConsentData = {};
		render(<Purposes
			ref={ref => purposes = ref}
			purposes={[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			customPurposes={[
				{ id: 1, name: 'Custom Purpose 1' },
			]}
			selectPurpose={selectPurpose}
			selectCustomPurpose={selectCustomPurpose}
			persistedVendorConsentData={persistedVendorConsentData}
			persistedPublisherConsentData={persistedPublisherConsentData}
		/>, scratch);

		purposes.handleSelectPurpose({isSelected: true, dataId: 2});
		purposes.handleSelectPurpose({isSelected: true, dataId: 1});

		expect(selectCustomPurpose.mock.calls[0][0]).to.equal(1);
		expect(selectCustomPurpose.mock.calls[0][1]).to.equal(true);
		expect(selectPurpose.mock.calls).not.to.be.empty;
	});

	it('after selecting group of purposes with index 1, consent for those purposes should be withdrawn', () => {
		const selectPurpose = jest.fn();
		const selectCustomPurpose = jest.fn();

		let purposes;
		let persistedVendorConsentData = {};
		let persistedPublisherConsentData = {};
		render(<Purposes
			ref={ref => purposes = ref}
			purposes={[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			selectPurpose={selectPurpose}
			selectCustomPurpose={selectCustomPurpose}
			persistedVendorConsentData={persistedVendorConsentData}
			persistedPublisherConsentData={persistedPublisherConsentData}
		/>, scratch);

		purposes.componentDidUpdate = () => {
			expect(selectPurpose.mock.calls[1][0]).to.equal(2);
			expect(selectPurpose.mock.calls[1][1]).to.equal(false);
			expect(selectCustomPurpose.mock.calls).to.be.empty;
		};
		purposes.handleSelectTab(1)();
	});

	it('should deselect default selection of legitimate interest', () => {
		const isLegitimateInterestActive = true;
		const onToggleLegitInterest = jest.fn();
		let persistedVendorConsentData = {};
		let persistedPublisherConsentData = {};

		let purposes;
		render(<Purposes
			ref={ref => purposes = ref}
			purposes={[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			isLegitimateInterestActive={isLegitimateInterestActive}
			onToggleLegitInterest={onToggleLegitInterest}
			persistedVendorConsentData={persistedVendorConsentData}
			persistedPublisherConsentData={persistedPublisherConsentData}
		/>, scratch);

		purposes.handleSelectLegitInterest({isSelected: false, dataId: 2});
		purposes.handleSelectLegitInterest({isSelected: false, dataId: 1});

		expect(purposes.state.legitInterestList[1]).to.equal(false);
		expect(purposes.state.legitInterestList[2]).to.equal(false);
	});
});
