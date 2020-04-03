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

	filterVendors = ({ isCustom = null, purposeId, featureId, isSpecial} = {}) => {
		const { gvl } = this.props.store.tcModel;
		let filteredVendors = [];
		const idSort = (a, b) => a.id - b.id;

		if(purposeId) {
			if(isSpecial) {
				filteredVendors = Object.values(gvl.getVendorsWithSpecialPurpose(purposeId));
			} else {
				filteredVendors = [...Object.values(gvl.getVendorsWithConsentPurpose(purposeId)),
					...Object.values(gvl.getVendorsWithLegIntPurpose(purposeId))]
					.sort(idSort);
			}
		} else if(featureId) {
			if(isSpecial) {
				filteredVendors = Object.values(gvl.getVendorsWithSpecialFeature(featureId));
			} else {
				filteredVendors = Object.values(gvl.getVendorsWithFeature(featureId));
			}
		}

		return filteredVendors.filter(vendor => isCustom ? !vendor.globalId : !!vendor.globalId);
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
			tcModel,

			selectPurpose,
			selectPurposeLegitimateInterests,
			selectSpecialFeatureOptins,
			selectVendors,
			selectVendor,
			selectVendorLegitimateInterests,
			selectAllVendorLegitimateInterests,
			initialVendorsRejection,

			selectPublisherPurpose,
			selectPublisherLegitimateInterests,
			getVendorsWithLegIntsIds,
			persistedConsentData = {},
			subsection
		} = store;

		const {
			purposeConsents,
			publisherConsents,
			publisherCustomConsents,
			vendorConsents,
			vendorLegitimateInterests,
			purposeLegitimateInterests,
			specialFeatureOptins
		} = tcModel;

		const { created: consentCreated } = persistedConsentData;
		const { purposes = {}, specialPurposes = {}, features = {}, specialFeatures = {}} = vendorList;

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
							selectedPurposeIds={purposeConsents}
							selectedPublisherPurposeIds={publisherConsents}
							selectedPublisherCustomPurposeIds={publisherCustomConsents}
							selectPurpose={selectPurpose}
							selectPurposeLegitimateInterests={selectPurposeLegitimateInterests}
							selectedPurposeLegitimateInterests={purposeLegitimateInterests}
							selectSpecialFeatureOptins={selectSpecialFeatureOptins}
							specialFeatureOptins={specialFeatureOptins}
							initialVendorsRejection={initialVendorsRejection}
							selectPublisherPurpose={selectPublisherPurpose}
							selectPublisherLegitimateInterests={selectPublisherLegitimateInterests}
							onShowVendors={this.handleShowVendors}
							persistedConsentData={persistedConsentData}
						/>
						<Vendors
							selectedVendorIds={vendorConsents}
							selectedVendorsLegitimateInterestsIds={vendorLegitimateInterests}
							selectAllVendorLegitimateInterests={selectAllVendorLegitimateInterests}
							vendorsWithLegIntsIds={getVendorsWithLegIntsIds()}
							selectVendors={selectVendors}
							selectVendor={selectVendor}
							selectVendorLegitimateInterests={selectVendorLegitimateInterests}
							initialVendorsRejection={initialVendorsRejection}
							vendors={state.vendors}
							purposes={Object.values(purposes)}
							features={Object.values(features)}
							specialFeatures={Object.values(specialFeatures)}
							specialPurposes={Object.values(specialPurposes)}
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
