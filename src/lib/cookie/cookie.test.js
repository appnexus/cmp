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
import { GVL, TCModel } from "@iabtcf/core";
import Promise from "promise-polyfill";
import vendorList from "../../../test/vendorListMock.json";

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
		tcModel.gvl = new GVL(vendorList);

		setTimeout(() => {
			tcModel.purposeConsents.set([1, 3, 5, 7, 9]);
			tcModel.purposeLegitimateInterests.set([2, 4, 6, 8, 10]);
			tcModel.vendorConsents.set([1, 2, 3, 4, 8, 10]);
			tcModel.vendorLegitimateInterests.set([1, 2, 3, 4]);
			tcModel.publisherConsents.set([2, 4, 6, 8, 10]);
			tcModel.publisherLegitimateInterests.set([1, 3, 5, 7, 9]);
			tcModel.specialFeatureOptIns.set([1, 2, 3]);

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
			expect(purposeConsents.maxId).to.equal(9);
			expect(purposeLegitimateInterests.maxId).to.equal(10);
			expect(vendorConsents.maxId).to.equal(10);
			expect(vendorLegitimateInterests.maxId).to.equal(4);
			expect(publisherConsents.maxId).to.equal(10);
			expect(publisherLegitimateInterests.maxId).to.equal(9);
			expect(specialFeatureOptIns.maxId).to.equal(3);
			done();
		}, 0);
	});

	it('writes and reads the local cookie when globalConsent = false', (done) => {
		const tcModel = new TCModel();
		tcModel.cmpId = 280;
		tcModel.cmpVersion = 2;
		tcModel.gvl = new GVL(vendorList);

		setTimeout(() => {
			tcModel.purposeConsents.set([1, 3, 5, 7, 9]);
			tcModel.purposeLegitimateInterests.set([2, 4, 6, 8, 10]);
			tcModel.vendorConsents.set([1, 2, 3, 4, 8, 10]);
			tcModel.vendorLegitimateInterests.set([1, 2, 3, 4]);
			tcModel.publisherConsents.set([2, 4, 6, 8, 10]);
			tcModel.publisherLegitimateInterests.set([1, 3, 5, 7, 9]);
			tcModel.specialFeatureOptIns.set([1, 2, 3]);

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
					expect(purposeConsents.maxId).to.equal(9);
					expect(purposeLegitimateInterests.maxId).to.equal(10);
					expect(vendorConsents.maxId).to.equal(10);
					expect(vendorLegitimateInterests.maxId).to.equal(4);
					expect(publisherConsents.maxId).to.equal(10);
					expect(publisherLegitimateInterests.maxId).to.equal(9);
					expect(specialFeatureOptIns.maxId).to.equal(3);
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
