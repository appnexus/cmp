import {
	SECTION_DETAILS,
	SECTION_VENDORS
} from "./store";

const createCommands = (store, cmpManager) => {
	/**
	 * Trigger the consent tool UI to be shown
	 */
	const showConsentTool =  (callback = () => {}) => {
		cmpManager.addEventListener('cmpReady', ({data}) => {
			if (data) {
				store.updateSection();
				store.toggleConsentToolShowing(true);

				cmpManager.openConsentTool = true;
				cmpManager.notify('openConsentTool', { section: 'intro' });
			}

			callback(data);
		});
	};

	/**
	 * Trigger the consent tool UI to be shown on Detail View
	 */
	const showConsentDetailView = (callback = () => {}, {tab} = {}) => {
		cmpManager.addEventListener('cmpReady', ({data}) => {
			if (data) {
				store.updateSelectedTab(tab);
				store.updateSection(SECTION_DETAILS);
				store.toggleConsentToolShowing(true);

				cmpManager.openConsentTool = true;
				cmpManager.notify('openConsentTool', { section: 'details' });
			}

			callback(data);
		});
	};

	/**
	 * Trigger the vendors UI to be shown
	 */
	const showVendors = (callback = () => {}) => {
		cmpManager.addEventListener('cmpReady', ({data}) => {
			if (data) {
				store.isCustomVendors = false;
				store.updateSection(SECTION_DETAILS, SECTION_VENDORS);
				store.toggleConsentToolShowing(true);

				cmpManager.openConsentTool = true;
				cmpManager.notify('openConsentTool', { section: 'details' });
			}

			callback(data);
		});
	};

	/**
	 * Trigger the vendors UI to be shown
	 */
	const showCustomVendors = (callback = () => {}) => {
		cmpManager.addEventListener('cmpReady', ({data}) => {
			if (data) {
				store.isCustomVendors = true;
				store.updateSection(SECTION_DETAILS, SECTION_VENDORS);
				store.toggleConsentToolShowing(true);

				cmpManager.openConsentTool = true;
				cmpManager.notify('openConsentTool', { section: 'details' });
			}

			callback(data);
		});
	};

	/**
	 * Trigger the footer UI to be shown
	 * */
	const showFooter = (callback = () => {}) => {
		cmpManager.addEventListener('cmpReady', ({data}) => {
			const footerShown = data && store.toggleFooterShowing(true);
			callback(footerShown);
		});
	};

	const registerEventListener = (callback, {event}) => {
		cmpManager.addEventListener(event, callback);
	};

	const unregisterEventListener = (callback, {event}) => {
		cmpManager.removeEventListener(event, callback);
	};

	const getVendorListVersion = (callback = () => {})=> {
		const {
			vendorListVersion = null
		} = store.persistedConsentData;

		callback(vendorListVersion);
	};

	return {
		getVendorListVersion,
		showConsentTool,
		showConsentDetailView,
		showVendors,
		showFooter,
		showCustomVendors,
		registerEventListener,
		unregisterEventListener
	};
};

export default createCommands;
