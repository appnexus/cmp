import { expect } from 'chai';
import replaceMacros from './macros';

describe('macros', () => {
	it('replace macros in text - macros is defined for given translation code', () => {
		const text = 'test _PUBLISHER_ and _POLICY_URL_';

		expect(replaceMacros(text, 'de')).to.equal('test Ringier and https://www.blick.ch/services/datenschutzbestimmungen-id151553.html');
	});

	it('don\'t replace macro - macro is not exist', () => {
		const text = 'test _NOT_EXIST_';

		expect(replaceMacros(text, 'de')).to.equal(text);
	});

	it('return text without changes - macros is not defined for given translation code', () => {
		const text = 'test _PUBLISHER_ and _POLICY_URL_';

		expect(replaceMacros(text, 'test')).to.equal(text);
	});
});
