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

	it('should render all standard, special purposes for publisher and purposes and features for vendors', () => {
		let persistedConsentData = {};
		const selectPurpose = jest.fn();
		const purposes = render(<Purposes
			selectPurposeLegitimateInterests={jest.fn()}
			selectPublisherPurpose ={jest.fn()}
			initialVendorsRejection = {jest.fn()}
			selectSpecialFeatureOptins = {jest.fn()}
			selectedPublisherLegitimateInterests = {new Set()}
			selectedPurposeLegitimateInterests = {new Set()}
			specialFeatureOptins = {new Set()}
			purposes = {[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			features = {[
				{ id: 1, name: 'Feature 1' },
				{ id: 2, name: 'Feature 2' }
			]}
			specialPurposes = {[
				{ id: 1, name: 'Special Purpose 1' },
			]}
			specialFeatures = {[
				{ id: 1, name: 'Special Feature 1' }
			]}
			persistedConsentData={persistedConsentData}
			selectPurpose={selectPurpose}
			handleSelectTab={()=> {}}
			selectedTab={1}
		/>, scratch);

		const purposesAndFeatures = purposes.querySelectorAll(`.${style.detailHeader}`);
		expect(purposesAndFeatures.length).to.equal(8);
	});

	it('should select a standard purpose', () => {
		const selectPurpose = jest.fn();
		const selectCustomPurpose = jest.fn();
		let persistedConsentData = {};
		let purposes;
		render(<Purposes
			ref={ref => purposes = ref}
			purposes={[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			selectPurpose={selectPurpose}
			selectCustomPurpose={selectCustomPurpose}
			persistedConsentData={persistedConsentData}
			handleSelectTab={()=> {}}
			selectedTab={0}
		/>, scratch);

		purposes.handleSelectPurpose({isSelected: true, dataId: 0});

		expect(selectPurpose.mock.calls[0][0]).to.equal(1);
		expect(selectPurpose.mock.calls[0][1]).to.equal(true);
		expect(selectCustomPurpose.mock.calls).to.be.empty;
	});

	it('after selecting group of purposes with index 1, consent for those purposes should be withdrawn', () => {
		const selectPurpose = jest.fn();

		render(<Purposes
			selectPurposeLegitimateInterests={jest.fn()}
			selectPublisherPurpose ={jest.fn()}
			initialVendorsRejection = {jest.fn()}
			selectedPublisherLegitimateInterests = {new Set()}
			selectedPurposeLegitimateInterests = {new Set()}
			specialFeatureOptins = {new Set()}
			purposes={[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			selectPurpose={selectPurpose}
			handleSelectTab={()=> {}}
			selectedTab={1}

		/>, scratch);

		expect(selectPurpose.mock.calls[1][0]).to.equal(2);
		expect(selectPurpose.mock.calls[1][1]).to.equal(false);
	});

	it('should deselect default selection of legitimate interest', () => {
		const isLegitimateInterestActive = true;
		const onToggleLegitInterest = jest.fn();
		const selectPurposeLegitimateInterests = jest.fn();
		let persistedConsentData = {};

		let purposes;
		render(<Purposes
			ref={ref => purposes = ref}
			purposes={[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			isLegitimateInterestActive={isLegitimateInterestActive}
			onToggleLegitInterest={onToggleLegitInterest}
			selectPurposeLegitimateInterests={selectPurposeLegitimateInterests}
			persistedConsentData={persistedConsentData}
			handleSelectTab={()=> {}}
			selectedTab={0}

		/>, scratch);

		purposes.handleSelectLegitInterest({isSelected: false, dataId: 2});
		purposes.handleSelectLegitInterest({isSelected: false, dataId: 1});

		expect(selectPurposeLegitimateInterests.mock.calls[0][1]).to.equal(false);
		expect(selectPurposeLegitimateInterests.mock.calls[1][1]).to.equal(false);
	});

	it('should deselect default selection of publisher\'s legitimate interest', () => {
		const isPublisherLegIntActive = true;
		const onTogglePublisherLegitInterest = jest.fn();
		const selectPublisherLegitimateInterests = jest.fn();
		let persistedConsentData = {};

		let purposes;
		render(<Purposes
			ref={ref => purposes = ref}
			purposes={[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			isLegitimateInterestActive={isPublisherLegIntActive}
			onToggleLegitInterest={onTogglePublisherLegitInterest}
			persistedConsentData={persistedConsentData}
			selectPublisherLegitimateInterests={selectPublisherLegitimateInterests}
			handleSelectTab={()=> {}}
			selectedTab={0}
		/>, scratch);

		purposes.handleSelectPublisherLegitimateInterest({isSelected: false, dataId: 1});
		purposes.handleSelectPublisherLegitimateInterest({isSelected: false, dataId: 2});


		expect(selectPublisherLegitimateInterests.mock.calls[0][0]).to.equal(2);
		expect(selectPublisherLegitimateInterests.mock.calls[0][1]).to.equal(false);
		expect(selectPublisherLegitimateInterests.mock.calls[1][0]).to.equal(3);
		expect(selectPublisherLegitimateInterests.mock.calls[1][1]).to.equal(false);
	});

	it('should render special features and select its consent', () => {
		let persistedConsentData = {};
		let selectSpecialFeatureOptins = jest.fn();

		let purposes;
		render(<Purposes
			ref={ref => purposes = ref}
			purposes={[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			specialFeatures={[
				{ id: 1, name: 'Special feature 1' },
				{ id: 2, name: 'Special feature 2' }
			]}
			selectSpecialFeatureOptins={selectSpecialFeatureOptins}
			persistedConsentData={persistedConsentData}
			handleSelectTab={()=> {}}
			selectedTab={0}

		/>, scratch);

		purposes.handleSelectSpecialFeatureOptins({isSelected: true, dataId: 2});
		purposes.handleSelectSpecialFeatureOptins({isSelected: true, dataId: 1});

		expect(selectSpecialFeatureOptins.mock.calls[0][1]).to.equal(true);
		expect(selectSpecialFeatureOptins.mock.calls[1][1]).to.equal(true);
	});
});
