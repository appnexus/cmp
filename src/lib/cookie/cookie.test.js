/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';

import {
	writeCookie,
	decodeConsentData,
	encodeConsentData,
	writeConsentCookie,
	readConsentCookie,
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
} from "../../../test/constants"

import { GVL, TCModel } from "@iabtcf/core";
import Promise from "promise-polyfill";

jest.mock('../portal');
const mockPortal = require('../portal');

describe('cookie', () => {
	beforeEach(() => {
		// Remove all cookies
		const value = document.cookie.split(';');
		value.forEach(cookie => {
			const parts = cookie.trim().split('=');
			if (parts.length === 2) {
				writeCookie(parts[0], '', 0);
			}
		});
		mockPortal.sendPortalCommand = jest.fn().mockImplementation(() => Promise.resolve());
	});

	it('encodes and decodes the vendor cookie object back to original value', (done) => {
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
			tcModel.specialFeatureOptIns.set(SPECIAL_FEATURE_OPT_INS);

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
				specialFeatureOptIns
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
			expect(specialFeatureOptIns.maxId).to.equal(Math.max(...SPECIAL_FEATURE_OPT_INS));
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
			tcModel.specialFeatureOptIns.set(SPECIAL_FEATURE_OPT_INS);

			const encoded = encodeConsentData(tcModel);

			return writeConsentCookie(encoded).then(() => {
				return readConsentCookie().then(fromCookie => {
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
						specialFeatureOptIns
					} = fromCookie;

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
					expect(specialFeatureOptIns.maxId).to.equal(Math.max(...SPECIAL_FEATURE_OPT_INS));
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
});
