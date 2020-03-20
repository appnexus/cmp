import {vendorVersionMap, publisherVersionMap} from "./definitions";
import log from "../log";

const SIX_BIT_ASCII_OFFSET = 65;

const repeat = (count, string='0') => {
	let padString = '';
	for (let i = 0; i < count; i++) {
		padString += string;
	}
	return padString;
};

const padRight = (string, padding) => string + repeat(Math.max(0, padding));

const padLeft = (string, padding) => repeat(Math.max(0, padding)) + string;

const encodeIntToBits = (number, numBits) => {
	let bitString = '';
	if (typeof number === 'number' && !isNaN(number)) {
		bitString = parseInt(number, 10).toString(2);
	}

	// Pad the string if not filling all bits
	if (numBits >= bitString.length) {
		bitString = padLeft(bitString, numBits - bitString.length);
	}

	// Truncate the string if longer than the number of bits
	if (bitString.length > numBits) {
		bitString = bitString.substring(0, numBits);
	}
	return bitString;
};

/**
 * Encodes each character of a string in 6 bits starting
 * with [aA]=0 through [zZ]=25
 */
const encode6BitCharacters = (string, numBits) => {
	const encoded = typeof string !== 'string' ? '' : string.split('').map(char => {
		const int = Math.max(0, char.toUpperCase().charCodeAt(0) - SIX_BIT_ASCII_OFFSET);
		return encodeIntToBits(int > 25 ? 0 : int, 6);
	}).join('');
	return padRight(encoded, numBits).substr(0, numBits);
};

const encodeBoolToBits = (value) => encodeIntToBits(value === true ? 1 : 0, 1);

const encodeDateToBits = (date, numBits) => {
	if (date instanceof Date) {
		return encodeIntToBits(date.getTime() / 100, numBits);
	}
	return encodeIntToBits(date, numBits);
};

const encodeField = ({ input, field }) => {
	const { name, type, numBits, encoder, validator } = field;
	if (typeof validator === 'function') {
		if (!validator(input)) {
			return '';
		}
	}
	if (typeof encoder === 'function') {
		return encoder(input);
	}

	const bitCount = typeof numBits === 'function' ? numBits(input) : numBits;

	const inputValue = input[name];
	const fieldValue = inputValue === null || inputValue === undefined ? '' : inputValue;
	switch (type) {
		case 'int':
			return encodeIntToBits(fieldValue, bitCount);
		case 'bool':
			return encodeBoolToBits(fieldValue);
		case 'date':
			return encodeDateToBits(fieldValue, bitCount);
		case 'bits':
			return padRight(fieldValue, bitCount - fieldValue.length).substring(0, bitCount);
		case '6bitchar':
			return encode6BitCharacters(fieldValue, bitCount);
		case 'list':
			return fieldValue.reduce((acc, listValue) => acc + encodeFields({
				input: listValue,
				fields: field.fields
			}), '');
		default:
			log.warn(`Cookie definition field found without encoder or type: ${name}`);
			return '';
	}
};

const encodeFields = ({ input, fields }) => {
	return fields.reduce((acc, field) => {
		acc += encodeField({ input, field });
		return acc;
	}, '');
};

/**
 * Encode the data properties to a bit string. Encoding will encode
 * either `selectedVendorIds` or the `vendorRangeList` depending on
 * the value of the `isRange` flag.
 */
const encodeDataToBits = (data, definitionMap) => {
	const { cookieVersion } = data;

	if (typeof cookieVersion !== 'number') {
		log.error('Could not find cookieVersion to encode');
	}
	else if (!definitionMap[cookieVersion]) {
		log.error(`Could not find definition to encode cookie version ${cookieVersion}`);
	}
	else {
		const cookieFields = definitionMap[cookieVersion].fields;
		return encodeFields({ input: data, fields: cookieFields });
	}
};

/**
 * Take all fields required to encode the cookie and produce the
 * URL safe Base64 encoded value.
 */
const encodeCookieValue = (data, definitionMap) => {
	const binaryValue = encodeDataToBits(data, definitionMap);
	if (binaryValue) {

		// Pad length to multiple of 8
		const paddedBinaryValue = padRight(binaryValue, 7 - (binaryValue.length + 7) % 8);

		// Encode to bytes
		let bytes = '';
		for (let i = 0; i < paddedBinaryValue.length; i += 8) {
			bytes += String.fromCharCode(parseInt(paddedBinaryValue.substr(i, 8), 2));
		}

		// Make base64 string URL friendly
		return btoa(bytes)
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
	}
};

const encodeVendorCookieValue = (vendorData) => encodeCookieValue(vendorData, vendorVersionMap);

const encodePublisherCookieValue = (publisherData) => encodeCookieValue(publisherData, publisherVersionMap);

export {
	padRight,
	padLeft,
	encodeVendorCookieValue,
	encodePublisherCookieValue,
	encodeIntToBits,
	encodeBoolToBits,
	encodeDateToBits,
	encode6BitCharacters,
	SIX_BIT_ASCII_OFFSET
};
