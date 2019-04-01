import log from './log';

// These options are documented at https://acdn.adnxs.com/cmp/docs/#/config
// We highly recommend reading the options as the defaults may not fit your goals.
const defaultConfig = {
        // for now we don't use a custom purpose list. Putting this to a falsy value will prevent 404s
	customPurposeListLocation: null,
	// The location of the latest vendorlist to use.
	globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
	globalConsentLocation: 'm32cmp.mgr.consensu.org',
        storeConsentGlobally: true,
	storePublisherData: false,
	logging: false,
	gdprApplies: true,
	gdprAppliesGlobally: true,
};

class Config {
	constructor() {
		this.update(defaultConfig);
	}

	update = (updates) => {
		if (updates && typeof updates === 'object') {
			const validKeys = Object.keys(defaultConfig);
			const { validUpdates, invalidKeys } = Object.keys(updates).reduce((acc, key) => {
				if (validKeys.indexOf(key) > -1) {
					acc.validUpdates = {
						...acc.validUpdates,
						[key]: updates[key]
					};
				}
				else {
					acc.invalidKeys.push(key);
				}
				return acc;
			}, { validUpdates: {}, invalidKeys: [] });

			Object.assign(this, validUpdates);
			if (invalidKeys.length) {
				log.warn(`Invalid CMP config values not applied: ${invalidKeys.join(', ')}`);
			}

		}
	};
}

export default new Config();
