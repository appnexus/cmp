import { expect } from 'chai';

import {
	decodeBitsToInt,
	decodeBitsToDate,
	decodeBitsToBool,
	decodeVendorCookieValue,
	decode6BitCharacters
} from './cookieDecodeHelpers';

import {
	encodeIntToBits,
	encodeDateToBits,
	encodeBoolToBits,
	encode6BitCharacters,
} from "./cookieEncodeHelpers";

describe('cookieutils', () => {
	describe('decodeBitsToInt', () => {
		it('decodes a bit string to original encoded value', () => {
			const bitString = encodeIntToBits(123);
			const decoded = decodeBitsToInt(bitString, 0, bitString.length);
			expect(decoded).to.equal(123);
		});
	});

	describe('decodeBitsToDate', () => {
		it('decodes a bit string to original encoded value', () => {
			const now = new Date('2018-07-15 PDT');
			const bitString = encodeDateToBits(now);
			const decoded = decodeBitsToDate(bitString, 0, bitString.length);
			expect(decoded.getTime()).to.equal(now.getTime());
		});
	});

	describe('decodeBitsToBool', () => {
		it('decodes a bit string to original encoded "true" value', () => {
			const bitString = encodeBoolToBits(true);
			const decoded = decodeBitsToBool(bitString, 0, bitString.length);
			expect(decoded).to.equal(true);
		});
		it('decodes a bit string to original encoded "false" value', () => {
			const bitString = encodeBoolToBits(false);
			const decoded = decodeBitsToBool(bitString, 0, bitString.length);
			expect(decoded).to.equal(false);
		});
	});

	describe('decode6BitCharacters', () => {
		it('decodes a bit string to original encoded value', () => {
			const string = 'STUFF';
			const bitString = encode6BitCharacters(string);
			const decoded = decode6BitCharacters(bitString, 0, bitString.length);
			expect(decoded).to.equal(string);
		});
		it('decodes a bit string that is longer than length', () => {
			const string = 'STUFF';
			const bitString = encode6BitCharacters(string);
			const decoded = decode6BitCharacters(bitString, 0, 12);
			expect(decoded).to.equal('ST');
		});
	});

	it('fails to decode an invalid cookie version', () => {
		const bitString = encodeIntToBits(999, 6);
		const decoded = decodeVendorCookieValue(bitString);
		expect(decoded).to.be.empty;
	});
});
