import { expect } from 'chai';

import {
	encodeIntToBits,
	encodeBoolToBits,
	encodeDateToBits,
	encode6BitCharacters,
	encodeVendorCookieValue,
} from './cookieEncodeHelpers';

describe('cookieutils', () => {
	describe('encodeIntToBits', () => {
		it('encodes an integer to a bit string', () => {
			const bitString = encodeIntToBits(123);
			expect(bitString).to.equal('1111011');
		});
		it('encodes an integer to a bit string with padding', () => {
			const bitString = encodeIntToBits(123, 12);
			expect(bitString).to.equal('000001111011');
		});

	});

	describe('encodeBoolToBits', () => {
		it('encodes a "true" boolean to a bit string', () => {
			const bitString = encodeBoolToBits(true);
			expect(bitString).to.equal('1');
		});
		it('encode a "false" boolean to a bit string', () => {
			const bitString = encodeBoolToBits(false);
			expect(bitString).to.equal('0');
		});
	});

	describe('encodeDateToBits', () => {
		it('encode a date to a bit string', () => {
			const date = new Date(1512661975200);
			const bitString = encodeDateToBits(date);
			expect(bitString).to.equal('1110000101100111011110011001101000');
		});
		it('encode a date to a bit string with padding', () => {
			const date = new Date(1512661975200);
			const bitString = encodeDateToBits(date, 36);
			expect(bitString).to.equal('001110000101100111011110011001101000');
		});
	});

	describe('encode6BitCharacters', () => {
		it('encode a 6bitchar string to a bit string', () => {
			const bitString = encode6BitCharacters('hello');
			expect(bitString).to.equal('000111000100001011001011001110');
		});
	});

	it('fails to encode a cookie version that does not exist', () => {
		const aDate = new Date('2018-07-15 PDT');

		const consentData = {
			cookieVersion: 999,
			created: aDate,
			lastUpdated: aDate,
			cmpId: 1,
			vendorListVersion: 1,
		};

		const bitString = encodeVendorCookieValue(consentData);
		expect(bitString).to.be.undefined;
	});

	it('fails to encode an invalid cookie version', () => {
		const aDate = new Date('2018-07-15 PDT');

		const consentData = {
			cookieVersion: 'hello',
			created: aDate,
			lastUpdated: aDate,
			cmpId: 1,
			vendorListVersion: 1,
		};

		const bitString = encodeVendorCookieValue(consentData);
		expect(bitString).to.be.undefined;
	});
});
