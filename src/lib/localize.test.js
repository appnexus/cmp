/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';
import {Localize} from './localize';
import config from './config';

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

		expect(result).to.deep.equal({
			'one.prop1': 'prop1',
			'one.two.prop2': 'prop2',
			'one.two.prop3': 'prop3',
			'one.prop4': 'prop4',
			'prop5': 'prop5'
		});
	});


	it('applies specific locale', () => {
		config.update({
			forceLocale: 'es-es'
		});
		const localization = {
			'es-es': {
				prop1: 'new prop1',
			}
		};
		const localize = new Localize(localization);
		expect(localize.localizedValues).deep.equal({
			'prop1': 'new prop1',
		});
	});

	it('ignores locale casing', () => {
		config.update({
			forceLocale: 'es'
		});
		const localization = {
			ES: {
				prop1: 'new prop1',
			}
		};
		const localize = new Localize(localization);
		expect(localize.localizedValues).deep.equal({
			'prop1': 'new prop1',
		});
	});


});
