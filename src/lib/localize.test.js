/* eslint-disable max-nested-callbacks */
import {Localize} from './localize';

describe('localize', () => {

	it('flatten objects', () => {
		const localize = new Localize();
		const result = localize.flattenObject({
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

		expect(result).toEqual({
			'one.prop1': 'prop1',
			'one.two.prop2': 'prop2',
			'one.two.prop3': 'prop3',
			'one.prop4': 'prop4',
			'prop5': 'prop5'
		});
	});


	it('keep override', () => {
		const localization = {
			en: {
				prop1: 'prop1',
				two: {
					prop2: 'prop2',
					prop3: 'prop3'
				},
				prop4: 'prop4'
			},
			'en-US': {
				prop1: 'new prop1',
			}
		};
		const localize = new Localize(localization);
		expect(localize.localizedValues).toEqual({
			'prop1': 'new prop1',
			'two.prop2': 'prop2',
			'two.prop3': 'prop3',
			'prop4': 'prop4'
		});
	});

});
