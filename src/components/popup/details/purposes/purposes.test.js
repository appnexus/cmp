/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import { expect } from 'chai';
import style from './purposes.less';

import Purposes from './purposes';

describe('Purposes', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('should render links for vendors and all standard and custom purposes', () => {
		let store = {};

		const purposes = render(<Purposes
			purposes={[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			customPurposes={[
				{ id: 1, name: 'Custom Purpose 1' },
			]}
			store={store}
		/>, scratch);

		const purposeLinks = purposes.querySelectorAll(`.${style.purposeItem}`);
		expect(purposeLinks.length).to.equal(3);
	});

	it('should select a standard purpose', () => {
		const selectPurpose = jest.fn();
		const selectCustomPurpose = jest.fn();
		let store = {};
		let purposes;
		render(<Purposes
			ref={ref => purposes = ref}
			purposes={[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			selectPurpose={selectPurpose}
			selectCustomPurpose={selectCustomPurpose}
			store={store}
		/>, scratch);

		purposes.handleSelectPurposeDetail(1)();
		purposes.handleSelectPurpose({isSelected: true});

		expect(selectPurpose.mock.calls[0][0]).to.equal(2);
		expect(selectPurpose.mock.calls[0][1]).to.equal(true);
		expect(selectCustomPurpose.mock.calls).to.be.empty;
	});

	it('should select a custom purpose', () => {
		const selectPurpose = jest.fn();
		const selectCustomPurpose = jest.fn();

		let purposes;
		let store = {};
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
			store={store}
		/>, scratch);

		purposes.handleSelectPurposeDetail(2)();
		purposes.handleSelectPurpose({isSelected: true});

		expect(selectCustomPurpose.mock.calls[0][0]).to.equal(1);
		expect(selectCustomPurpose.mock.calls[0][1]).to.equal(true);
		expect(selectPurpose.mock.calls).to.be.empty;
	});

	it('after selecting group of purposes with index 1, consent for those purposes should be withdrawn', done => {
		const selectPurpose = jest.fn();
		const selectCustomPurpose = jest.fn();

		let purposes;
		let store = {};
		render(<Purposes
			ref={ref => purposes = ref}
			purposes={[
				{ id: 1, name: 'Purpose 1' },
				{ id: 2, name: 'Purpose 2' }
			]}
			selectPurpose={selectPurpose}
			selectCustomPurpose={selectCustomPurpose}
			store={store}
		/>, scratch);

		purposes.componentDidUpdate = (prevProps, prevState) => {
			if (purposes.state.selectedPurposeIndex === prevState.selectedPurposeIndex) {
				expect(selectPurpose.mock.calls[0][0]).to.equal(2);
				expect(selectPurpose.mock.calls[0][1]).to.equal(false);
				expect(selectCustomPurpose.mock.calls).to.be.empty;
				done();
			}
		};
		purposes.handleSelectPurposeDetail(1)();
	});
});
