import { TCModel, GVL, TCString } from "@iabtcf/core";
import config from "./config";

const COOKIE_VERSION = 2;
const CMP_ID = 280;
const CMP_VERSION = 2;

const createCommands = (store) => {
	let vendorList;

	const getVendorList = (callback) => {
		if (vendorList) {
			callback(vendorList);
		} else if (store.vendorList && Object.keys(store.vendorList).length) {
			vendorList = JSON.parse(JSON.stringify(store.vendorList));
			callback(vendorList);
		} else {
			const {getVendorList} = config;

			if (getVendorList) {
				getVendorList((err, data) => {
					if (err) {
						callback({}, err)
					} else {
						vendorList = data;
						callback(vendorList)
					}
				})
			}
		}
	};

	const vectorToObject = (set) => {
		let obj = {};

		set.forEach((hasConsent, id) => {
			obj[id] = hasConsent
		});

		return obj;
	};

	const getConsentObject = (callback, consents) => {
		getVendorList((vendorList, err) => {
			if (err) {
				callback({}, false)
			}
			if (vendorList) {
				vendorList = JSON.parse(JSON.stringify(vendorList));
				const {
					vendorListVersion: consentsVendorListVersion,
					...tcModelFields
				} = consents;
				const {persistedConsentData} = store;
				const {vendors} = vendorList;
				const globalVendorsObject = {};

				for (let vendor of Object.values(vendors)) {
					if (!vendor.globalId) {
						continue;
					}

					globalVendorsObject[vendor.globalId] = {
						id: vendor.globalId,
						name: vendor.name,
						policyUrl: vendor.policyUrl,
						purposes: vendor.purposes,
						specialPurposes: vendor.specialPurposes,
						legIntPurposes: vendor.legIntPurposes,
						features: vendor.features,
						specialFeatures: vendor.specialFeatures
					}
				}

				vendorList.vendors = globalVendorsObject;
				vendorList.vendorListVersion = consentsVendorListVersion;

				const tcModel = new TCModel(new GVL(vendorList));
				tcModel.cookieVersion = COOKIE_VERSION;
				tcModel.cmpId = CMP_ID;
				tcModel.cmpVersion = CMP_VERSION;
				tcModel.created = persistedConsentData && persistedConsentData.created || new Date();
				tcModel.lastUpdated = persistedConsentData && persistedConsentData.lastUpdated || new Date();
				tcModel.vendorListVersion = tcModel.vendorListVersion_ = consentsVendorListVersion;
				tcModel.isServiceSpecific = true;
				tcModel.supportOOB = false;

				for (let key of Object.keys(tcModelFields)) {
					tcModel[key] && tcModel[key].set(consents[key]);
				}

				const encoded = TCString.encode(tcModel);
				const decoded = TCString.decode(encoded);

				const {
					cmpId_: cmpId,
					cmpVersion_: cmpVersion,
					policyVersion_: tcfPolicyVersion,
					supportOOB_: supportOOB,
					vendorListVersion_: vendorListVersion,
					isServiceSpecific_: isServiceSpecific,
					useNonStandardStacks_: useNonStandardStacks,
					publisherCountryCode_: publisherCC,
					purposeConsents,
					purposeLegitimateInterests,
					publisherConsents,
					publisherLegitimateInterests,
					vendorConsents,
					vendorLegitimateInterests,
					vendorsDisclosed,
					vendorsAllowed,
					specialFeatureOptIns,
					created,
					lastUpdated
				} = decoded;


				callback({
					tcString: encoded,
					cmpId,
					cmpVersion,
					tcfPolicyVersion,
					supportOOB,
					vendorListVersion,
					isServiceSpecific,
					useNonStandardStacks,
					publisherCC,
					created,
					lastUpdated,
					outOfBand: {
						allowedVendors: vectorToObject(vendorsAllowed),
						disclosedVendors: vectorToObject(vendorsDisclosed)
					},
					purpose: {
						consents: vectorToObject(purposeConsents),
						legitimateInterests: vectorToObject(purposeLegitimateInterests)
					},
					vendor: {
						consents: vectorToObject(vendorConsents),
						legitimateInterests: vectorToObject(vendorLegitimateInterests)
					},
					specialFeatureOptins: vectorToObject(specialFeatureOptIns),
					publisher: {
						consents: vectorToObject(publisherConsents),
						legitimateInterests: vectorToObject(publisherLegitimateInterests)
					}
				}, true);
			}
		})
	};

	return {
		getConsentObject
	}
};

export default createCommands;
