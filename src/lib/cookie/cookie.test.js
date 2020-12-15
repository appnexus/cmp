/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';
import {
	decodeConsentData,
	encodeConsentData,
	writeConsentCookie,
	readConsentCookie,
	applyDecodeFix,
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
import { GVL, TCModel, VendorVectorEncoder } from "@iabtcf/core";

function vectorToObject(set) {
	let obj = {};
	set.forEach((hasConsent, id) => {
		obj[id] = hasConsent;
	});
	return obj;
}

function arrayToObject(array, maxId) {
	let obj = {};
	for (let id = 1, set = new Set(array); id <= maxId; id++) {
		obj[id] = set.has(id);
	}
	return obj;
}

describe('cookie', () => {
	let decode;

	beforeAll(() => {
		decode = applyDecodeFix();
	});

	afterAll(() => {
		VendorVectorEncoder.decode = decode;
	});

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

			const maxVendorId = Math.max(...Object.keys(VENDOR_LIST.vendors));
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
			expect(vendorConsents.maxId).to.equal(maxVendorId);
			expect(vectorToObject(vendorConsents)).to.deep.equal(arrayToObject(VENDOR_CONSENTS, maxVendorId));
			expect(vendorLegitimateInterests.maxId).to.equal(maxVendorId);
			expect(vectorToObject(vendorLegitimateInterests)).to.deep.equal(arrayToObject(VENDOR_LEGITIMATE_INTERESTS, maxVendorId));
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

					const maxVendorId = Math.max(...Object.keys(VENDOR_LIST.vendors));
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
					expect(vendorConsents.maxId).to.equal(maxVendorId);
					expect(vectorToObject(vendorConsents)).to.deep.equal(arrayToObject(VENDOR_CONSENTS, maxVendorId));
					expect(vendorLegitimateInterests.maxId).to.equal(maxVendorId);
					expect(vectorToObject(vendorLegitimateInterests)).to.deep.equal(arrayToObject(VENDOR_LEGITIMATE_INTERESTS, maxVendorId));
					expect(publisherConsents.maxId).to.equal(Math.max(...PUBLISHER_CONSENTS));
					expect(publisherLegitimateInterests.maxId).to.equal(Math.max(...PUBLISHER_LEGITIMATE_INTERESTS));
					expect(specialFeatureOptins.maxId).to.equal(Math.max(...SPECIAL_FEATURE_OPT_INS));
					done();
				});
			});
		}, 0);
	});
});
