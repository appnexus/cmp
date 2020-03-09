import { TCModel, GVL, TCString } from "@iabtcf/core";

const COOKIE_VERSION = 2;
const CMP_ID = 280;
const CMP_VERSION = 2;

const createCommands = (store) => {
	const getConsentObject = (callback, data) => {
		const {
			vendorListVersion,
			...tcModelFields
		} = data;

		const { vendorList, persistedConsentData } = store;
		const { vendors } = vendorList;
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
		vendorList.vendorListVersion = vendorListVersion;

		const tcModel = new TCModel(new GVL(vendorList));
		tcModel.cookieVersion = COOKIE_VERSION;
		tcModel.cmpId = CMP_ID;
		tcModel.cmpVersion = CMP_VERSION;
		tcModel.created = persistedConsentData && persistedConsentData.created || new Date();
		tcModel.lastUpdated = persistedConsentData && persistedConsentData.lastUpdated || new Date();
		tcModel.vendorListVersion = tcModel.vendorListVersion_ = vendorListVersion;
		tcModel.isServiceSpecific = true;
		tcModel.supportOOB = false;

		for (let key of Object.keys(tcModelFields)) {
			tcModel[key] && tcModel[key].set(data[key]);
		}

		const encoded = TCString.encode(tcModel);
		const decoded = TCString.decode(encoded);

		callback({
			tcString: encoded,
			...decoded
		}, true);
	};

	return {
		getConsentObject
	}
};

export default createCommands;
