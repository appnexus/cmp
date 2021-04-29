/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';
import { translations } from './translations';

describe('localize', () => {
	it('flatten objects', () => {
		const result = translations.flattenObject({
			one: {
				prop1: 'prop1',
				two: {
					prop2: 'prop2',
					prop3: 'prop3'
				},
				prop4: 'prop4'
			},
			prop5: 'prop5'
		});

		expect(result).to.deep.equal({
			'one.prop1': 'prop1',
			'one.two.prop2': 'prop2',
			'one.two.prop3': 'prop3',
			'one.prop4': 'prop4',
			'prop5': 'prop5'
		});
	});
});
