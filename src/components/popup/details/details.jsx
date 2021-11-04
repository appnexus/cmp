import { h, Component } from 'preact';
import style from './details.less';
import Button from '../../button/button';
import CloseButton from '../../closebutton/closebutton';
import Purposes from './purposes/purposes';
import Vendors from './vendors/vendors';
import Panel from '../../panel/panel';
import Label from '../../label/label';
import config from '../../../lib/config';
import { SECTION_PURPOSES, SECTION_VENDORS, TAB_PUBLISHER_INFO, TAB_CONSENTS } from '../../../lib/store';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'details'
	};
}

export default class Details extends Component {
	constructor(props) {
		super(props);
		const { isCustomVendors } = this.props.store;
		this.state = {
			vendors: isCustomVendors ? this.getCustomVendors() : this.getGlobalVendors(),
			isCustom: isCustomVendors,
			selectedTab: props.tab || TAB_PUBLISHER_INFO,
			disableTabs: false
		};
	}

	getCustomVendors = () => {
		const { vendorList: { customVendors = {} } } = this.props.store;
		return Object.values(customVendors);
	};

	getGlobalVendors = () => {
		const { vendorList = {} } = this.props.store;
		const { vendors = {} } = vendorList;
		return Object.values(vendors);
	};

	filterVendors = ({ isCustom = null, purposeId, featureId, isSpecial } = {}) => {
		if (isCustom) {
			const { vendorList: { customVendors } } = this.props.store;
			return Object.values(customVendors);
		}

		const { gvl } = this.props.store.tcModel;
		let filteredVendors = [];
		const idSort = (a, b) => a.id - b.id;

		if (purposeId) {
			if (isSpecial) {
				filteredVendors = Object.values(gvl.getVendorsWithSpecialPurpose(purposeId));
			} else {
				filteredVendors = [...Object.values(gvl.getVendorsWithConsentPurpose(purposeId)),
					...Object.values(gvl.getVendorsWithLegIntPurpose(purposeId))]
					.sort(idSort);
			}
		} else if (featureId) {
			if (isSpecial) {
				filteredVendors = Object.values(gvl.getVendorsWithSpecialFeature(featureId));
			} else {
				filteredVendors = Object.values(gvl.getVendorsWithFeature(featureId));
			}
		}

		return filteredVendors;
	};

	handleShowVendors = (filter) => {
		this.setState({
			vendors: this.filterVendors(filter),
			isCustom: filter && filter.isCustom
		});

		this.props.store.updateSubsection(SECTION_VENDORS);
	};

	handleBack = () => {
		const { onCancel, store } = this.props;
		const { subsection } = store;
		store.updateSubsection(Math.max(0, subsection - 1));
		if (subsection === SECTION_PURPOSES) {
			onCancel();
		}
	};
	handleSelectTab = tab => {
		return () => {
			this.props.store.updateSelectedTab(tab);
			this.setState({
				selectedTab: tab
			});
		};
	};
	componentWillMount() {
		if (config.disableTabs){
			this.props.store.updateSelectedTab(TAB_CONSENTS);
			this.setState({
				selectedTab: TAB_CONSENTS,
				disableTabs: true
			});
		}
	}

	render(props, state) {
		const {
			onSaveOrClose,
			store
		} = props;

		const {
			vendorList = {},
			tcModel,

			selectPurpose,
			selectPurposeLegitimateInterests,
			selectSpecialFeatureOptins,
			selectVendors,
			selectVendor,
			selectVendorLegitimateInterests,
			setCustomVendorsConsent,
			selectAllVendorLegitimateInterests,
			initialVendorsRejection,
			customVendorsConsent,
			selectPublisherConsent,
			selectPublisherLegitimateInterests,
			getVendorsWithLegIntsIds,
			persistedConsentData = {},
			subsection,
			selectedTab
		} = store;

		const {
			purposeConsents,
			publisherConsents,
			publisherLegitimateInterests,
			publisherCustomConsents,
			vendorConsents,
			vendorLegitimateInterests,
			purposeLegitimateInterests,
			specialFeatureOptins
		} = tcModel;

		const { created: consentCreated } = persistedConsentData;
		const { purposes = {}, specialPurposes = {}, features = {}, specialFeatures = {} } = vendorList;

		return (
			<div class={style.details}>
				<CloseButton
					class={style.close}
					onClick={onSaveOrClose}
					prefix={LocalLabel.defaultProps.prefix}
				/>
				<div class={style.header}>
					<LocalLabel localizeKey='title'>User Privacy Preferences</LocalLabel>
				</div>
				<div class={style.body}>
					<Panel selectedIndex={subsection}>
						<Purposes
							purposes={Object.values(purposes)}
							specialPurposes={Object.values(specialPurposes)}
							features={Object.values(features)}
							specialFeatures={Object.values(specialFeatures)}
							selectedPurposeIds={purposeConsents}
							selectedPublisherPurposeIds={publisherConsents}
							selectedPublisherLegitimateInterests={publisherLegitimateInterests}
							selectedPublisherCustomPurposeIds={publisherCustomConsents}
							selectPurpose={selectPurpose}
							selectPurposeLegitimateInterests={selectPurposeLegitimateInterests}
							selectedPurposeLegitimateInterests={purposeLegitimateInterests}
							selectSpecialFeatureOptins={selectSpecialFeatureOptins}
							specialFeatureOptins={specialFeatureOptins}
							initialVendorsRejection={initialVendorsRejection}
							selectPublisherConsent={selectPublisherConsent}
							selectPublisherLegitimateInterests={selectPublisherLegitimateInterests}
							onShowVendors={this.handleShowVendors}
							persistedConsentData={persistedConsentData}
							handleSelectTab={this.handleSelectTab}
							selectedTab={selectedTab}
							disableTabs={this.state.disableTabs}
						/>
						<Vendors
							customVendorsConsent={customVendorsConsent}
							selectedVendorIds={vendorConsents}
							selectedVendorsLegitimateInterestsIds={vendorLegitimateInterests}
							selectAllVendorLegitimateInterests={selectAllVendorLegitimateInterests}
							vendorsWithLegIntsIds={getVendorsWithLegIntsIds()}
							selectVendors={selectVendors}
							selectVendor={selectVendor}
							selectVendorLegitimateInterests={selectVendorLegitimateInterests}
							setCustomVendorsConsent={setCustomVendorsConsent}
							initialVendorsRejection={initialVendorsRejection}
							vendors={state.vendors}
							isCustom={state.isCustom}
							purposes={Object.values(purposes)}
							features={Object.values(features)}
							specialFeatures={Object.values(specialFeatures)}
							specialPurposes={Object.values(specialPurposes)}
							consentCreated={consentCreated}
						/>
					</Panel>
				</div>
				<div class={style.footer}>
					<a aria-label='back' class={style.cancel} onClick={this.handleBack}><LocalLabel
						prefix={'tabs.tab' + (selectedTab + 1)}
						localizeKey='back'>Back</LocalLabel></a>
					<Button ariaLabel='save settings and close' class={style.save} onClick={onSaveOrClose}><LocalLabel
						prefix={'tabs.tab' + (selectedTab + 1)} localizeKey='save'>Save and Exit</LocalLabel></Button>
				</div>
			</div>
		);
	}
}
