import { TCModel, TCString } from '@iabtcf/core';
import cookie from './cookie';
import config from './config';
import debug from './debug';
import { findLangage, localize } from './localize';
import logger, { EVENTS as LOG_EVENTS } from './logger';
import { CONSENT_SCREENS, CUSTOM_EVENTS, LANGUAGES } from '../constants';

export const mock = {
	config,
	displayLayer1: {},
	gvl: {},
	tcModel: {},
	tcData: {},
	subscribe: () => undefined,
};

export default class Store {
	config = config;
	displayLayer1; // stacks
	maxHeightModal = 0;
	minHeightModal = 0;
	shouldAutoResizeModal = false;
	manualVendorConsents = new Set(); // vendor-consent management partially automatic and partially manual depending on the consent screen
	isModalShowing = false;
	isSaveShowing = false;
	hasSession = false;
	hasConsentedAll;
	gvl;
	cmpApi;
	tcfApi;
	tcModel;
	tcData;
	translations = {};
	LANGUAGES = LANGUAGES;
	listeners = new Set();

	constructor(options) {
		const { config: { theme = config.theme } = config } = options;
		Object.assign(this, {
			...options,
			theme,
			shouldAutoResizeModal: theme.shouldAutoResizeModal,
		});

		const { language } = this.config;
		const { tcfApi, gvl } = options;
		const { readyPromise } = gvl;

		readyPromise
			.then(() => {
				// synchronous localization because iabtcf-es core lib requires initialization first
				this.toggleLanguage(language)
					.then(this.onReady.bind(this))
					.catch((e) => {
						logger(LOG_EVENTS.CMPError, {
							message: `storeReadyError: toggleLanguage: ${e}`,
						});
					});
			})
			.catch((e) => {
				logger(LOG_EVENTS.CMPError, {
					message: `storeReadyError: ${e}`,
				});
			});
		tcfApi('addEventListener', 2, this.onEvent.bind(this));
	}

	setDisplayLayer1() {
		let bestMatchingStackCount = 0;
		let bestMatchingStackId = 0;

		const { shouldUseStacks } = this.config;
		const { stacks, vendors } = this.gvl;
		const allPurposes = new Set();
		const allLegitInterestPurposes = new Set();
		const allSpecialPurposes = new Set();
		const allSpecialFeatures = new Set();
		const allFeatures = new Set();

		Object.keys(vendors).forEach((id) => {
			const { features, legIntPurposes, purposes, specialFeatures, specialPurposes } = vendors[id];

			// purposes
			// 	.filter((purpose) => !legIntPurposes.includes(purpose)) // filter out legitInterest
			// 	// TODO @potench // filter out flexiblePurposes from layer1?
			// 	// .filter(purpose => !legIntPurposes.includes(purpose))
			// 	.forEach(allPurposes.add, allPurposes);
			purposes.forEach(allPurposes.add, allPurposes);
			specialFeatures.forEach(allSpecialFeatures.add, allSpecialFeatures);
			specialPurposes.forEach(allSpecialPurposes.add, allSpecialPurposes);
			features.forEach(allFeatures.add, allFeatures);
			legIntPurposes.forEach(allLegitInterestPurposes.add, allLegitInterestPurposes);
		});

		if (shouldUseStacks) {
			Object.keys(stacks).forEach((id) => {
				const stack = stacks[id];
				const { purposes, specialFeatures } = stack;
				const purposeMatches = purposes.filter((purpose) => allPurposes.has(purpose));
				const specialFeatureMatches = specialFeatures.filter((specialFeature) =>
					allSpecialFeatures.has(specialFeature)
				);
				const totalMatches = purposeMatches.length + specialFeatureMatches.length;

				if (!bestMatchingStackCount || totalMatches > bestMatchingStackCount) {
					bestMatchingStackId = id;
					bestMatchingStackCount = totalMatches;
				}
			});
		}

		const filteredStack = stacks[bestMatchingStackId];
		const filteredPurposes = [...allPurposes].filter(
			(purpose) => !filteredStack || !filteredStack.purposes.includes(purpose)
		);

		this.setState({
			displayLayer1: {
				stack: bestMatchingStackId,
				purposes: filteredPurposes.sort(),
				legIntPurposes: [...allLegitInterestPurposes].sort(),
				specialFeatures: [...allSpecialFeatures].sort(),
				specialPurposes: [...allSpecialPurposes].sort(),
				features: [...allFeatures].sort(),
			},
		});
	}

	isReady = false;
	readyPromise = new Promise((resolve, reject) => {
		this.onReadyResolve = () => {
			this.isReady = true;
			resolve();
		};
		this.onReadyReject = reject;
	}); // fired after gvl.readyPromise and tcData updated if persisted

	onReady() {
		const {
			narrowedVendors,
			cmpId,
			cmpVersion,
			gdprConsentUrlParam,
			publisherCountryCode,
			isServiceSpecific,
			isSlimMode,	
		} = this.config;
		const { vendors } = this.gvl;

		if (narrowedVendors && narrowedVendors.length) {
			const filteredNarrowedVendors = narrowedVendors.filter((id) => vendors.hasOwnProperty(id));
			this.gvl.narrowVendorsTo(filteredNarrowedVendors);
		}

		const tcModel = new TCModel(this.gvl);
		let persistedTcModel;

		const cookieTCString = cookie.readVendorConsentCookie();
		const encodedTCString = cookieTCString || gdprConsentUrlParam;

		try {
			persistedTcModel = encodedTCString && TCString.decode(encodedTCString);
		} catch (e) {
			logger(LOG_EVENTS.CMPError, {
				message: `storeReadyError: unable to decode TCString from ${
					gdprConsentUrlParam ? 'consentUrl' : 'consentCookie'
				}`,
			});
			console.error(e);
		}

		// Merge persisted model into new model in memory
		Object.assign(tcModel, {
			...(persistedTcModel ? persistedTcModel : {}),
			cmpId,
			cmpVersion,
			isServiceSpecific,
			publisherCountryCode,
			consentScreen: ( isSlimMode ? CONSENT_SCREENS.SLIM_LAYER0 : CONSENT_SCREENS.STACKS_LAYER1 ),
		});

		// Handle a new user
		if (!persistedTcModel) {
			tcModel.setAllVendorLegitimateInterests();
			tcModel.setAllPurposeLegitimateInterests();
			// tcModel.setAllPurposeConsents();
			// tcModel.setAllVendorConsents();
			// tcModel.setAllSpecialFeatureOptins();
			// tcModel.setAll();

			// update internal models, show ui, dont save to cookie
			this.updateCmp({ tcModel, shouldShowModal: true });
			this.setDisplayLayer1();
			this.hasShownModal = true;
		} else {
			// handle a return user

			// Note: commented out because automatic vendor consent management creates unexpected result for user.
			// update the manually managed vendor consent model set since it's primarily automatically managed
			// this is a list of vendor consents that were likely manually revoked by the user
			// const { vendorConsents } = tcModel;
			// Object.keys(vendors).forEach((key) => {
			// 	if (!vendorConsents.has(parseInt(key, 10))) { // likely revoked manually
			// 		this.manualVendorConsents.add(parseInt(key, 10));
			// 	}
			// });

			// update internal models, dont show the ui, save to cookie if persisting from URL
			this.updateCmp({ tcModel });
			this.setDisplayLayer1();

			// trigger cookie storage when transfering consent from URL
			if (gdprConsentUrlParam && !cookieTCString) {
				this.updateCmp({ tcModel, shouldSaveCookie: true, isConsentByUrl: true });
			}
		}
	}

	onEvent(tcData, success) {
		if (!success) {
			if (!this.isReady) {
				this.onReadyReject(new Error('store: initialzation error'));
			}
			return;
		}

		this.setState({
			tcData,
		});

		if (!this.isReady) {
			this.onReadyResolve(this);
		}

		debug('store: onEvent', this);
	}

	subscribe = (callback) => {
		this.listeners.add(callback);
	};

	unsubscribe = (callback) => {
		this.listeners.delete(callback);
	};

	/**
	 * @oaram tcModelOpt - optional ModelObject, updates to the tcModel
	 * @param shouldShowModal - optional boolean, displays UI if true
	 * @param shouldSaveCookie - optional boolean, sets gdpr_opt_in and stores tcData.consentString too cookie if true
	 * @param isConsentByUrl - optional boolean, annotates logs to indicate save of consent transfered from URLParams
	 */
	updateCmp = ({ tcModel, shouldShowModal, shouldSaveCookie, shouldShowSave, isConsentByUrl = false }) => {
		const tcModelNew = this.autoToggleVendorConsents(tcModel);
		const isModalShowing = shouldShowModal !== undefined ? shouldShowModal : this.isModalShowing;
		const isSaveShowing = shouldShowSave !== undefined ? shouldShowSave : this.isSaveShowing;
		const encodedTCString = TCString.encode(tcModelNew);
		const shouldAutoResizeModal = isSaveShowing ? false : this.shouldAutoResizeModal;
		const maxHeightModal = shouldShowSave ? this.theme.maxHeightModal : this.maxHeightModal;
		const minHeightModal = shouldShowSave ? this.theme.minHeightModal : this.minHeightModal;

		const { vendorConsents, purposeConsents, specialFeatureOptins } = tcModelNew;
		const { purposes, specialFeatures, vendors } = this.gvl;
		// not all consented if you find 1 key missing
		const hasConsentedAllVendors = !Object.keys(vendors).find((key) => !vendorConsents.has(parseInt(key, 10)));
		const hasConsentedAllPurposes = !Object.keys(purposes).find((key) => !purposeConsents.has(parseInt(key, 10)));
		const hasConsentedAllSpecialFeatures = !Object.keys(specialFeatures).find(
			(key) => !specialFeatureOptins.has(parseInt(key, 10))
		);
		const hasConsentedAllCookie = cookie.readConsentedAllCookie();
		const hasSession = hasConsentedAllCookie !== undefined;

		const hasConsentedAll = hasConsentedAllVendors && hasConsentedAllPurposes && hasConsentedAllSpecialFeatures;

		this.setState(
			{
				tcModel: tcModelNew,
				isModalShowing,
				hasConsentedAll,
				isSaveShowing,
				hasSession,
				maxHeightModal,
				minHeightModal,
				shouldAutoResizeModal,
			},
			true
		);

		this.cmpApi.update(encodedTCString, isModalShowing);

		if (shouldSaveCookie) {
			const { cookieDomain } = this.config;
			const normalizeHasConsentedAll = hasConsentedAll ? '1' : '0';
			cookie.writeVendorConsentCookie(encodedTCString, cookieDomain);
			cookie.writeConsentedAllCookie(hasConsentedAll ? '1' : '0', cookieDomain);

			if (hasConsentedAllCookie !== normalizeHasConsentedAll) {
				global.dispatchEvent(
					new CustomEvent(CUSTOM_EVENTS.CONSENT_ALL_CHANGED, {
						detail: {
							store: {
								...this.store,
							},
						},
					})
				);
			}

			const { consentScreen, purposeConsents, specialFeatureOptins, vendorConsents } = tcModelNew;
			const { stack, purposes, specialFeatures } = this.displayLayer1;
			const declinedPurposes = purposes.filter((id) => !purposeConsents.has(id));
			const declinedSpecialFeatures = specialFeatures.filter((id) => !specialFeatureOptins.has(id));

			const declinedVendors = Object.keys(vendors).filter((id) => !vendorConsents.has(parseInt(id, 10)));
			const declinedStack = stack && !this.getStackOptin(stack) ? `${stack}` : '';

			logger(LOG_EVENTS.CMPSave, {
				consentScreen,
				hasConsentedAll,
				consentByUrl: isConsentByUrl,
				declinedStack,
				declinedPurposes: declinedPurposes.join(','),
				declinedSpecialFeatures: declinedSpecialFeatures.join(','),
				declinedVendors: declinedVendors.join(','),
			});
		}
	};

	toggleAutoResizeModal(shouldAutoResizeModal, dynamicMaxHeightModal) {
		const { theme } = this;
		const maxHeightModal =
			shouldAutoResizeModal && dynamicMaxHeightModal ? dynamicMaxHeightModal : theme.maxHeightModal;
		const minHeightModal = shouldAutoResizeModal && dynamicMaxHeightModal ? 0 : (theme.minHeightModal || 0);
		// only set if there's a change
		if (shouldAutoResizeModal !== this.shouldAutoResizeModal || maxHeightModal !== this.maxHeightModal) {
			this.setState({
				maxHeightModal,
				minHeightModal,
				shouldAutoResizeModal,
			});
		}
	}

	setState = (state = {}, isQuiet = false) => {
		Object.assign(this, {
			...state,
		});

		if (!isQuiet) {
			this.listeners.forEach((callback) => callback(this));
		}
	};

	getStackOptin(id) {
		const { stacks } = this.gvl;
		const { purposeConsents, specialFeatureOptins } = this.tcModel;
		const stack = stacks[id];
		let isOptedIn = false;
		if (stack) {
			const { purposes, specialFeatures } = stack;
			isOptedIn = !purposes.find((id) => !purposeConsents.has(id)); // look for any unconsented purpose
			// check specialFeatures
			if (isOptedIn) {
				isOptedIn = !specialFeatures.find((id) => !specialFeatureOptins.has(id));
			}
		}
		return isOptedIn;
	}

	save() {
		// close the cmp and persist settings
		this.updateCmp({ shouldShowModal: false, shouldSaveCookie: true, shouldShowSave: false });
	}

	toggleAll() {
		const tcModel = this.tcModel.clone();
		this.manualVendorConsents.clear();
		tcModel.setAll();
		// save and close
		this.updateCmp({
			tcModel,
			shouldShowModal: false,
			shouldSaveCookie: true,
			shouldShowSave: false,
		});
		return tcModel;
	}

	togglePurposeConsents(ids, shouldConsent, tcModelOpt) {
		const tcModel = tcModelOpt || this.tcModel.clone();
		const { purposeConsents } = tcModel;
		ids.map((id) => {
			if (!shouldConsent && (purposeConsents.has(id) || shouldConsent === false)) {
				purposeConsents.unset(id);
			} else {
				purposeConsents.set(id);
			}
		});

		if (!tcModelOpt) {
			this.updateCmp({
				tcModel,
				shouldShowSave: true,
			});
		}
		return tcModel;
	}

	toggleSpecialFeatureOptins(ids, shouldConsent, tcModelOpt) {
		const tcModel = tcModelOpt || this.tcModel.clone();
		const { specialFeatureOptins } = tcModel;
		ids.forEach((id) => {
			if (!shouldConsent && (specialFeatureOptins.has(id) || shouldConsent === false)) {
				specialFeatureOptins.unset(id);
			} else {
				specialFeatureOptins.set(id);
			}
		});

		if (!tcModelOpt) {
			this.updateCmp({
				tcModel,
				shouldShowSave: true,
			});
		}
		return tcModel;
	}

	toggleVendorConsents(ids, shouldConsent) {
		const tcModel = this.tcModel.clone();
		const { vendorConsents } = tcModel;

		ids.forEach((id) => {
			this.manualVendorConsents.add(id);
			if (!shouldConsent && (vendorConsents.has(id) || shouldConsent === false)) {
				vendorConsents.unset(id);
			} else {
				vendorConsents.set(id);
			}
		});

		this.updateCmp({
			tcModel,
			shouldShowSave: true,
		});

		return tcModel;
	}

	/**
	 * TODO: double check this, are we supposed to optIn for a vendor based on purposes/features opt-ins?
	 */
	autoToggleVendorConsents(tcModelOpt) {
		const tcModel = tcModelOpt || this.tcModel.clone();
		// NOTE: vendorIds are numbers, vendors[key] is a string *
		const { vendors } = this.gvl;
		const { purposeConsents, specialFeatureOptins } = tcModel;

		// if purposes and special features are consented for this vendor, then consent the vendor
		Object.keys(vendors).forEach((key) => {
			const vendor = vendors[key];
			if (vendor && !this.manualVendorConsents.has(vendor.id)) {
				const { purposes, specialFeatures } = vendor;

				const isMissingPurposesConsent = purposes.length && purposes.find((purpose) => !purposeConsents.has(purpose));
				const isMissingSpecialFeaturesConsent =
					specialFeatures.length && specialFeatures.find((specialFeature) => !specialFeatureOptins.has(specialFeature));

				if (isMissingPurposesConsent || isMissingSpecialFeaturesConsent) {
					// number
					// auto consent in to a vendor, but don't auto unconsent - just leave blank
					// tcModel.vendorConsents.unset(key);
				} else {
					tcModel.vendorConsents.set(vendor.id); // number
				}
			}
		});
		return tcModel;
	}

	toggleVendorObjection(ids, shouldObject) {
		const tcModel = this.tcModel.clone();
		const { vendorLegitimateInterests } = tcModel;

		ids.forEach((id) => {
			if (!shouldObject && (vendorLegitimateInterests.has(id) || shouldObject === false)) {
				vendorLegitimateInterests.unset(id);
			} else {
				vendorLegitimateInterests.set(id);
			}
		});

		this.updateCmp({
			tcModel,
			shouldShowSave: true,
		});
	}

	togglePurposeObjection(ids, shouldObject) {
		const tcModel = this.tcModel.clone();
		const { purposeLegitimateInterests } = tcModel;

		ids.forEach((id) => {
			if (!shouldObject && (purposeLegitimateInterests.has(id) || shouldObject === false)) {
				purposeLegitimateInterests.unset(id);
			} else {
				purposeLegitimateInterests.set(id);
			}
		});

		this.updateCmp({
			tcModel,
			shouldShowSave: true,
		});
	}

	toggleConsentScreen(consentScreen) {
		let tcModel = this.tcModel.clone();
		tcModel.consentScreen = consentScreen;
		this.updateCmp({
			tcModel,
		});
	}

	toggleShowModal(shouldShowModal) {
		if (!this.tcModel) {
			return;
		}
		if (this.hasShownModal) { // reset on subsequent display
			this.updateConfig({
				isSlimMode: false,
				theme: {
					isBannerInline: false
				}
			});
		}
		const { isSlimMode } = this.config;
		this.hasShownModal = true;
		let tcModel = this.tcModel.clone();
		
		tcModel.consentScreen = ( isSlimMode ? CONSENT_SCREENS.SLIM_LAYER0 : CONSENT_SCREENS.STACKS_LAYER1 );

		this.updateCmp({
			shouldShowModal,
			tcModel,
		});

		logger(LOG_EVENTS.CMPClick, {
			action: 'click',
			category: 'showUi',
			label: `screen${tcModel.consentScreen}`,
		});
	}

	toggleStackConsent(id) {
		const { stacks } = this.gvl;
		const stack = stacks[id];
		if (stack) {
			const shouldConsent = !this.getStackOptin(id);
			const { purposes, specialFeatures } = stack;
			let tcModel = this.tcModel.clone();
			tcModel = this.togglePurposeConsents([...purposes], shouldConsent, tcModel);
			this.toggleSpecialFeatureOptins([...specialFeatures], shouldConsent, tcModel);
			this.updateCmp({
				tcModel,
				shouldShowSave: true,
			});
		}
	}

	toggleLanguage(langOpt, shouldLog) {
		if (!this.gvl) {
			return;
		}

		const { code: language } = findLangage(langOpt);

		if (shouldLog) {
			logger(LOG_EVENTS.CMPClick, {
				action: 'click',
				category: 'toggleLanguage',
				label: language,
			});
		}

		const localizePromise = localize(language);
		localizePromise.then((translations) => {
			this.setState({
				translations,
			});
		});

		const gvlPromise = this.gvl.changeLanguage(language).then(() => {
			if (this.tcModel) {
				const { language } = this.gvl;
				const tcModel = this.tcModel.clone();
				tcModel.consentLanguage = language;
				this.updateCmp({
					tcModel,
					shouldShowModal: true,
				});
			}
		});

		return Promise.all([gvlPromise, localizePromise]);
	}

	updateConfig(newConfig) {
		const {theme = config.theme } = newConfig;
		Object.assign(this.config, {
			...newConfig,
			theme: {
				...this.config.theme,
				...theme
			}
		});
	}
}
