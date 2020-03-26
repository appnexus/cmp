/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';
import {
	decodeConsentData,
	encodeConsentData,
	writeConsentCookie,
	readConsentCookie,
	convertVendorsToRanges,
	encodeVendorConsentData,
	CONSENT_COOKIE
} from './cookie';
import {
	PURPOSE_CONSENTS,
	PURPOSE_LEGITIMATE_INTERESTS,
	VENDOR_CONSENTS,
	VENDOR_LEGITIMATE_INTERESTS,
	PUBLISHER_CONSENTS,
	PUBLISHER_LEGITIMATE_INTERESTS,
	SPECIAL_FEATURE_OPT_INS,
	VENDOR_LIST
} from "../../../test/constants";
import { GVL, TCModel } from "@iabtcf/core";
import {decodeVendorCookieValue, decodeBitsToIds, decodePublisherCookieValue} from "./cookieDecodeHelpers";
import {encodePublisherCookieValue, encodeVendorCookieValue} from "./cookieEncodeHelpers";

function decodeVendorConsentData(cookieValue) {
	const {
		cookieVersion,
		cmpId,
		cmpVersion,
		consentScreen,
		consentLanguage,
		vendorListVersion,
		purposeIdBitString,
		maxVendorId,
		created,
		lastUpdated,
		isRange,
		defaultConsent,
		vendorIdBitString,
		vendorRangeList
	} = decodeVendorCookieValue(cookieValue);

	const cookieData = {
		cookieVersion,
		cmpId,
		cmpVersion,
		consentScreen,
		consentLanguage,
		vendorListVersion,
		selectedPurposeIds: decodeBitsToIds(purposeIdBitString),
		maxVendorId,
		created,
		lastUpdated
	};

	if (isRange) {
		const idMap = vendorRangeList.reduce((acc, {isRange, startVendorId, endVendorId}) => {
			const lastVendorId = isRange ? endVendorId : startVendorId;
			for (let i = startVendorId; i <= lastVendorId; i++) {
				acc[i] = true;
			}
			return acc;
		}, {});

		cookieData.selectedVendorIds = new Set();
		for (let i = 0; i <= maxVendorId; i++) {
			if ((defaultConsent && !idMap[i]) ||
				(!defaultConsent && idMap[i])) {
				cookieData.selectedVendorIds.add(i);
			}
		}
	}
	else {
		cookieData.selectedVendorIds = decodeBitsToIds(vendorIdBitString);
	}

	return cookieData;
}

describe('cookie', () => {
	it('encodes and decodes consent cookie object back to original value', (done) => {
		const tcModel = new TCModel();
		tcModel.cmpId = 280;
		tcModel.cmpVersion = 2;
		tcModel.gvl = new GVL(VENDOR_LIST);

		setTimeout(() => {
			tcModel.purposeConsents.set(PURPOSE_CONSENTS);
			tcModel.purposeLegitimateInterests.set(PURPOSE_LEGITIMATE_INTERESTS);
			tcModel.vendorConsents.set(VENDOR_CONSENTS);
			tcModel.vendorLegitimateInterests.set(VENDOR_LEGITIMATE_INTERESTS);
			tcModel.publisherConsents.set(PUBLISHER_CONSENTS);
			tcModel.publisherLegitimateInterests.set(PUBLISHER_LEGITIMATE_INTERESTS);
			tcModel.specialFeatureOptins.set(SPECIAL_FEATURE_OPT_INS);

			const encoded = encodeConsentData(tcModel);
			const decoded = decodeConsentData(encoded);

			const {
				supportOOB,
				isServiceSpecific,
				useNonStandardStacks,
				purposeOneTreatment,
				publisherCountryCode,
				version,
				consentLanguage,
				cmpId,
				cmpVersion,
				vendorListVersion,
				purposeConsents,
				purposeLegitimateInterests,
				vendorConsents,
				vendorLegitimateInterests,
				publisherConsents,
				publisherLegitimateInterests,
				specialFeatureOptins
			} = decoded;

			expect(supportOOB).to.equal(tcModel.supportOOB);
			expect(isServiceSpecific).to.equal(tcModel.isServiceSpecific);
			expect(useNonStandardStacks).to.equal(tcModel.useNonStandardStacks);
			expect(purposeOneTreatment).to.equal(tcModel.purposeOneTreatment);
			expect(publisherCountryCode).to.equal(tcModel.publisherCountryCode);
			expect(version).to.equal(tcModel.version);
			expect(consentLanguage).to.equal(tcModel.consentLanguage);
			expect(cmpId).to.equal(tcModel.cmpId);
			expect(cmpVersion).to.equal(tcModel.cmpVersion);
			expect(vendorListVersion).to.equal(tcModel.vendorListVersion);
			expect(purposeConsents.maxId).to.equal(Math.max(...PURPOSE_CONSENTS));
			expect(purposeLegitimateInterests.maxId).to.equal(Math.max(...PURPOSE_LEGITIMATE_INTERESTS));
			expect(vendorConsents.maxId).to.equal(Math.max(...VENDOR_CONSENTS));
			expect(vendorLegitimateInterests.maxId).to.equal(Math.max(...VENDOR_LEGITIMATE_INTERESTS));
			expect(publisherConsents.maxId).to.equal(Math.max(...PUBLISHER_CONSENTS));
			expect(publisherLegitimateInterests.maxId).to.equal(Math.max(...PUBLISHER_LEGITIMATE_INTERESTS));
			expect(specialFeatureOptins.maxId).to.equal(Math.max(...SPECIAL_FEATURE_OPT_INS));
			done();
		}, 0);
	});

	it('writes and reads the local cookie when globalConsent = false', (done) => {
		const tcModel = new TCModel();
		tcModel.cmpId = 280;
		tcModel.cmpVersion = 2;
		tcModel.gvl = new GVL(VENDOR_LIST);

		setTimeout(() => {
			tcModel.purposeConsents.set(PURPOSE_CONSENTS);
			tcModel.purposeLegitimateInterests.set(PURPOSE_LEGITIMATE_INTERESTS);
			tcModel.vendorConsents.set(VENDOR_CONSENTS);
			tcModel.vendorLegitimateInterests.set(VENDOR_LEGITIMATE_INTERESTS);
			tcModel.publisherConsents.set(PUBLISHER_CONSENTS);
			tcModel.publisherLegitimateInterests.set(PUBLISHER_LEGITIMATE_INTERESTS);
			tcModel.specialFeatureOptins.set(SPECIAL_FEATURE_OPT_INS);

			const encoded = encodeConsentData(tcModel);

			return writeConsentCookie(encoded).then(() => {
				return readConsentCookie().then(fromCookie => {
					const cookie = decodeConsentData(fromCookie);
					expect(document.cookie).to.contain(CONSENT_COOKIE);

					const {
						supportOOB,
						isServiceSpecific,
						useNonStandardStacks,
						purposeOneTreatment,
						publisherCountryCode,
						version,
						consentLanguage,
						cmpId,
						cmpVersion,
						vendorListVersion,
						purposeConsents,
						purposeLegitimateInterests,
						vendorConsents,
						vendorLegitimateInterests,
						publisherConsents,
						publisherLegitimateInterests,
						specialFeatureOptins
					} = cookie;

					expect(supportOOB).to.equal(tcModel.supportOOB);
					expect(isServiceSpecific).to.equal(tcModel.isServiceSpecific);
					expect(useNonStandardStacks).to.equal(tcModel.useNonStandardStacks);
					expect(purposeOneTreatment).to.equal(tcModel.purposeOneTreatment);
					expect(publisherCountryCode).to.equal(tcModel.publisherCountryCode);
					expect(version).to.equal(tcModel.version);
					expect(consentLanguage).to.equal(tcModel.consentLanguage);
					expect(cmpId).to.equal(tcModel.cmpId);
					expect(cmpVersion).to.equal(tcModel.cmpVersion);
					expect(vendorListVersion).to.equal(tcModel.vendorListVersion);
					expect(purposeConsents.maxId).to.equal(Math.max(...PURPOSE_CONSENTS));
					expect(purposeLegitimateInterests.maxId).to.equal(Math.max(...PURPOSE_LEGITIMATE_INTERESTS));
					expect(vendorConsents.maxId).to.equal(Math.max(...VENDOR_CONSENTS));
					expect(vendorLegitimateInterests.maxId).to.equal(Math.max(...VENDOR_LEGITIMATE_INTERESTS));
					expect(publisherConsents.maxId).to.equal(Math.max(...PUBLISHER_CONSENTS));
					expect(publisherLegitimateInterests.maxId).to.equal(Math.max(...PUBLISHER_LEGITIMATE_INTERESTS));
					expect(specialFeatureOptins.maxId).to.equal(Math.max(...SPECIAL_FEATURE_OPT_INS));
					done();
				});
			});
		}, 0);
	});

	it('It should return undefined when decoding v1 cookie', () => {
		const cookie_v1 = 'BOEFEAyOEFEAyAHABDENAI4AAAB9vABAASA';
		const decoded = decodeConsentData(cookie_v1);
		expect(decoded).to.be.undefined;
	});

	it('encodes and decodes the vendor cookie object back to original value', () => {

		const aDate = new Date('2018-07-15 PDT');
		const vendorConsentData = {
			cookieVersion: 1,
			cmpId: 1,
			cmpVersion: 1,
			consentScreen: 2,
			consentLanguage: 'DE',
			vendorListVersion: 1,
			maxVendorId: Math.max(...Object.values(VENDOR_LIST.vendors).map(vendor => vendor.id)),
			created: aDate,
			lastUpdated: aDate,
			selectedPurposeIds: new Set([1, 2]),
			selectedVendorIds: new Set([1, 2, 4])
		};

		const encodedString = encodeVendorConsentData({...vendorConsentData, VENDOR_LIST});
		const decoded = decodeVendorConsentData(encodedString);

		expect(decoded).to.deep.equal(vendorConsentData);
	});

	it('converts selected vendor list to a range', () => {
		const maxVendorId = Math.max(...Object.values(VENDOR_LIST.vendors).map(vendor => vendor.id));
		const ranges = convertVendorsToRanges(maxVendorId, new Set([2, 3, 4]));

		expect(ranges).to.deep.equal([{
			isRange: true,
			startVendorId: 2,
			endVendorId: 4
		}]);
	});

	it('converts selected vendor list to multiple ranges', () => {
		const maxVendorId = Math.max(...Object.values(VENDOR_LIST.vendors).map(vendor => vendor.id));
		const ranges = convertVendorsToRanges(maxVendorId, new Set([2, 3, 5, 6, 10]));

		expect(ranges).to.deep.equal([
			{
				isRange: true,
				startVendorId: 2,
				endVendorId: 3
			},
			{
				isRange: true,
				startVendorId: 5,
				endVendorId: 6
			},
			{
				isRange: false,
				startVendorId: 10,
				endVendorId: undefined
			}
		]);
	});
});

describe('cookie common', () => {
	it('encodes and decodes the vendor cookie value with ranges back to original value', () => {

		const aDate = new Date('2018-07-15 PDT');

		const consentData = {
			cookieVersion: 1,
			created: aDate,
			lastUpdated: aDate,
			cmpId: 1,
			cmpVersion: 1,
			consentScreen: 1,
			consentLanguage: 'EN',
			vendorListVersion: 1,
			purposeIdBitString: '111000001010101010001101',
			maxVendorId: 5,
			isRange: true,
			defaultConsent: false,
			numEntries: 2,
			vendorRangeList: [
				{
					isRange: true,
					startVendorId: 2,
					endVendorId: 4
				},
				{
					isRange: false,
					startVendorId: 1
				}
			]
		};

		const bitString = encodeVendorCookieValue(consentData);
		const decoded = decodeVendorCookieValue(bitString);

		expect(decoded).to.deep.equal(consentData);
	});

	it('encodes and decodes the vendor cookie value with range ranges back to original value', () => {

		const aDate = new Date('2018-07-15 PDT');

		const consentData = {
			cookieVersion: 1,
			created: aDate,
			lastUpdated: aDate,
			cmpId: 1,
			cmpVersion: 1,
			consentScreen: 1,
			consentLanguage: 'EN',
			vendorListVersion: 1,
			purposeIdBitString: '111000001010101010001101',
			maxVendorId: 5,
			isRange: true,
			defaultConsent: false,
			numEntries: 2,
			vendorRangeList: [
				{
					isRange: false,
					startVendorId: 2
				},
				{
					isRange: false,
					startVendorId: 1
				}
			]
		};

		const bitString = encodeVendorCookieValue(consentData);
		const decoded = decodeVendorCookieValue(bitString);

		expect(decoded).to.deep.equal(consentData);
	});

	it('encodes and decodes the vendor cookie value without ranges back to original value', () => {

		const aDate = new Date('2018-07-15 PDT');

		const consentData = {
			cookieVersion: 1,
			created: aDate,
			lastUpdated: aDate,
			cmpId: 1,
			cmpVersion: 1,
			consentScreen: 1,
			consentLanguage: 'EN',
			vendorListVersion: 1,
			purposeIdBitString: '000000001010101010001100',
			maxVendorId: 5,
			isRange: false,
			vendorIdBitString: '10011',
		};

		const bitString = encodeVendorCookieValue(consentData);
		const decoded = decodeVendorCookieValue(bitString);

		expect(decoded).to.deep.equal(consentData);
	});


	it('encodes and decodes the publisher cookie value without ranges back to original value', () => {

		const aDate = new Date('2018-07-15 PDT');

		const consentData = {
			cookieVersion: 1,
			created: aDate,
			lastUpdated: aDate,
			cmpId: 1,
			cmpVersion: 0,
			consentScreen: 0,
			consentLanguage: 'AA',
			vendorListVersion: 1,
			publisherPurposeVersion: 1,
			numCustomPurposes: 4,
			standardPurposeIdBitString: '000000001010101010001100',
			customPurposeIdBitString: '1011',
		};

		const bitString = encodePublisherCookieValue(consentData);
		const decoded = decodePublisherCookieValue(bitString);

		expect(decoded).to.deep.equal(consentData);
	});
});
