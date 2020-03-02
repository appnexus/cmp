import { h, Component } from 'preact';
import style from './details.less';
import Button from '../../button/button';
import CloseButton from '../../closebutton/closebutton';
import Purposes from './purposes/purposes';
import Vendors from './vendors/vendors';
import Panel from '../../panel/panel';
import Label from "../../label/label";
import { SECTION_PURPOSES, SECTION_VENDORS } from '../../../lib/store';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'details'
	};
}

export default class Details extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vendors: this.getVendors()
		};
	}

	getVendors = () => {
		const { vendorList = {} } = this.props.store;
		const { vendors = {} } = vendorList;
		return Object.values(vendors);
	};

	filterVendors = ({ isCustom = null, purposeIds = [], featureIds = [] } = {}) => {
		return this.getVendors().filter(vendor => {
			if (isCustom !== null && (isCustom && vendor.external_id || !isCustom && !vendor.external_id)) {
				return false;
			}

			const vendorPurposeIds = new Set([...(vendor.purposeIds || []), ...(vendor.legIntPurposeIds || [])]);
			if (!purposeIds.every(purposeId => vendorPurposeIds.has(purposeId))) {
				return false;
			}

			const vendorFeatureIds = new Set(vendor.featureIds || []);
			if (!featureIds.every(featureId => vendorFeatureIds.has(featureId))) {
				return false;
			}

			return true;
		});
	};

	handleShowVendors = (filter) => {
		this.setState({
			vendors: this.filterVendors(filter)
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

	render(props, state) {
		const {
			onSaveOrClose,
			store
		} = props;

		const {
			vendorList = {},
			customPurposeList = {},
			tcModel,

			selectPurpose,
			selectPurposeLegitimateInterest,
			selectSpecialFeature,
			selectVendors,
			selectVendor,
			selectVendorLegitimateInterest,
			initialVendorsRejection,

			selectPublisherPurpose,
			selectPublisherLegitimateInterest,

			persistedConsentData = {},
			subsection
		} = store;

		const {
			purposeConsents,
			publisherConsents,
			publisherCustomConsents,
			vendorConsents,
		} = tcModel;

		const { created: consentCreated } = persistedConsentData;
		const { purposes = {}, specialPurposes = {}, features = {}, specialFeatures = {}} = vendorList;
		const { purposes: customPurposes = [] } = customPurposeList;


		return (
			<div class={style.details}>
				<CloseButton
					class={style.close}
					onClick={onSaveOrClose}
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
							customPurposes={customPurposes}
							selectedPurposeIds={purposeConsents}
							selectedPublisherPurposeIds={publisherConsents}
							selectedPublisherCustomPurposeIds={publisherCustomConsents}
							selectPurpose={selectPurpose}
							selectPurposeLegitimateInterest={selectPurposeLegitimateInterest}
							selectSpecialFeature={selectSpecialFeature}
							initialVendorsRejection={initialVendorsRejection}
							selectPublisherPurpose={selectPublisherPurpose}
							selectPublisherLegitimateInterest={selectPublisherLegitimateInterest}
							onShowVendors={this.handleShowVendors}
							persistedConsentData={persistedConsentData}
						/>
						<Vendors
							selectedVendorIds={vendorConsents}
							selectVendors={selectVendors}
							selectVendor={selectVendor}
							selectVendorLegitimateInterest={selectVendorLegitimateInterest}
							initialVendorsRejection={initialVendorsRejection}
							vendors={state.vendors}
							purposes={Object.values(purposes)}
							features={Object.values(features)}
							specialFeatures={Object.values(specialFeatures)}
							consentCreated={consentCreated}
						/>
					</Panel>
				</div>
				<div class={style.footer}>
					<a class={style.cancel} onClick={this.handleBack}><LocalLabel localizeKey='back'>Back</LocalLabel></a>
					<Button class={style.save} onClick={onSaveOrClose}><LocalLabel localizeKey='save'>Save and Exit</LocalLabel></Button>
				</div>
			</div>
		);
	}
}
