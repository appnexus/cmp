import { expect } from 'chai';
import replaceMacros from './macros';

describe('macros', () => {
	it('replace macros in text - macros is defined for given translation code', () => {
		const text = 'test _PUBLISHER_ and _PUBLISHER_';

		expect(replaceMacros(text, 'de_blick')).to.equal('test Ringier and Ringier');
	});

	it('don\'t replace macro - macro is not exist', () => {
		const text = 'test _NOT_EXIST_';

		expect(replaceMacros(text, 'de_blick')).to.equal(text);
	});

	it('return text without changes - macros is not defined for given translation code', () => {
		const text = 'test _PUBLISHER_';

		expect(replaceMacros(text, 'test')).to.equal(text);
	});
});
