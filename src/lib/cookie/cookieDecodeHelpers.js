import log from '../log';
import {
	NUM_BITS_VERSION,
	vendorVersionMap,
	publisherVersionMap
} from './definitions';

import {
	padRight,
	padLeft, SIX_BIT_ASCII_OFFSET,
} from "./cookieEncodeHelpers";

const decodeBitsToInt = (bitString, start, length) => parseInt(bitString.substr(start, length), 2);

const decodeBitsToDate = (bitString, start, length) => new Date(decodeBitsToInt(bitString, start, length) * 100);

const decodeBitsToBool = (bitString, start) => parseInt(bitString.substr(start, 1), 2) === 1;

const decode6BitCharacters = (bitString, start, length) => {
	let decoded = '';
	let decodeStart = start;
	while (decodeStart < start + length) {
		decoded += String.fromCharCode(SIX_BIT_ASCII_OFFSET + decodeBitsToInt(bitString, decodeStart, 6));
		decodeStart += 6;
	}
	return decoded;
};

const decodeField = ({ input, output, startPosition, field }) => {
	const { type, numBits, decoder, validator, listCount } = field;
	if (typeof validator === 'function') {
		if (!validator(output)) {
			// Not decoding this field so make sure we start parsing the next field at
			// the same point
			return {newPosition: startPosition};
		}
	}
	if (typeof decoder === 'function') {
		return decoder(input, output, startPosition);
	}

	const bitCount = typeof numBits === 'function' ? numBits(output) : numBits;
	const listEntryCount = typeof listCount === 'function' ?
		listCount(output) : typeof listCount === 'number' ? listCount : 0;

	switch (type) {
		case 'int':
			return { fieldValue: decodeBitsToInt(input, startPosition, bitCount) };
		case 'bool':
			return { fieldValue: decodeBitsToBool(input, startPosition) };
		case 'date':
			return { fieldValue: decodeBitsToDate(input, startPosition, bitCount) };
		case 'bits':
			return { fieldValue: input.substr(startPosition, bitCount) };
		case '6bitchar':
			return { fieldValue: decode6BitCharacters(input, startPosition, bitCount) };
		case 'list':
			return new Array(listEntryCount).fill().reduce((acc) => {
				const { decodedObject, newPosition } = decodeFields({
					input,
					fields: field.fields,
					startPosition: acc.newPosition
				});
				return {
					fieldValue: [...acc.fieldValue, decodedObject],
					newPosition
				};
			}, { fieldValue: [], newPosition: startPosition });
		default:
			log.warn(`Cookie definition field found without decoder or type: ${name}`);
			return {};
	}
};

const decodeFields = ({ input, fields, startPosition = 0 }) => {
	let position = startPosition;
	const decodedObject = fields.reduce((acc, field) => {
		const { name, numBits } = field;
		const { fieldValue, newPosition } = decodeField({
			input,
			output: acc,
			startPosition: position,
			field
		});
		if (fieldValue !== undefined) {
			acc[name] = fieldValue;
		}
		if (newPosition !== undefined) {
			position = newPosition;
		}
		else if (typeof numBits === 'number') {
			position += numBits;
		}
		return acc;
	}, {});
	return {
		decodedObject,
		newPosition: position
	};
};

/**
 * Decode the (URL safe Base64) value of a cookie into an object.
 */
const decodeCookieValue = (cookieValue, definitionMap) => {

	// Replace safe characters
	const unsafe = cookieValue
		.replace(/-/g, '+')
		.replace(/_/g, '/') + '=='.substring(0, (3 * cookieValue.length) % 4);

	const bytes = atob(unsafe);

	let inputBits = '';
	for (let i = 0; i < bytes.length; i++) {
		const bitString = bytes.charCodeAt(i).toString(2);
		inputBits += padLeft(bitString, 8 - bitString.length);
	}

	return decodeCookieBitValue(inputBits, definitionMap);
};

const decodeCookieBitValue = (bitString, definitionMap) => {
	const cookieVersion = decodeBitsToInt(bitString, 0, NUM_BITS_VERSION);
	if (typeof cookieVersion !== 'number') {
		log.error('Could not find cookieVersion to decode');
		return {};
	}
	else if (!vendorVersionMap[cookieVersion]) {
		log.error(`Could not find definition to decode cookie version ${cookieVersion}`);
		return {};
	}
	const cookieFields = definitionMap[cookieVersion].fields;
	const { decodedObject } = decodeFields({ input: bitString, fields: cookieFields });
	return decodedObject;
};


const decodeVendorCookieValue = (cookieValue) => {
	return decodeCookieValue(cookieValue, vendorVersionMap);
};

const decodePublisherCookieValue = (cookieValue) => {
	return decodeCookieValue(cookieValue, publisherVersionMap);
};

const decodeBitsToIds = (bitString) => {
	return bitString.split('').reduce((acc, bit, index) => {
		if (bit === '1') {
			acc.add(index + 1);
		}
		return acc;
	}, new Set());
};

export {
	padRight,
	padLeft,
	decodeBitsToInt,
	decodeBitsToDate,
	decodeBitsToBool,
	decodeCookieValue,
	decodeCookieBitValue,
	decodeVendorCookieValue,
	decodePublisherCookieValue,
	decode6BitCharacters,
	decodeBitsToIds,
};
