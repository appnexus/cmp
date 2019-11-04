import { h, Component } from 'preact';
import style from './details.less';
import Button from '../../button/button';
import CloseButton from '../../closebutton/closebutton';
import Purposes from './purposes/purposes';
import Vendors from './vendors/vendors';
import Panel from '../../panel/panel';
import Label from "../../label/label";

const SECTION_PURPOSES = 0;
const SECTION_VENDORS = 1;

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'details'
	};
}

export default class Details extends Component {
	state = {
		selectedPanelIndex: SECTION_PURPOSES,
		vendors: []
	};

	getVendors = ({ isCustom = null, purposeIds = [], featureIds = [] } = {}) => {
		const { vendorList = {} } = this.props.store;
		const { vendors = [] } = vendorList;
		return vendors.filter(vendor => {
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
		this.state.vendors = this.getVendors(filter);
		this.setState({
			selectedPanelIndex: SECTION_VENDORS
		});
	};

	handleBack = () => {
		const { onCancel } = this.props;
		const { selectedPanelIndex } = this.state;
		this.setState({
			selectedPanelIndex: Math.max(0, selectedPanelIndex - 1)
		});
		if (selectedPanelIndex === SECTION_PURPOSES) {
			onCancel();
		}
	};

	render(props, state) {
		const {
			onCancel,
			onSaveOrClose,
			store
		} = props;
		const { selectedPanelIndex } = state;

		const {
			vendorList = {},
			customPurposeList = {},
			vendorConsentData,
			publisherConsentData,
			selectPurpose,
			selectCustomPurpose,
			selectAllVendors,
			selectVendor,
			persistedVendorConsentData = {}
		} = store;
		const { selectedPurposeIds, selectedVendorIds } = vendorConsentData;
		const { selectedCustomPurposeIds } = publisherConsentData;
		const { purposes = [] } = vendorList;
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
					<Panel selectedIndex={selectedPanelIndex}>
						<Purposes
							purposes={purposes}
							customPurposes={customPurposes}
							selectedPurposeIds={selectedPurposeIds}
							selectedCustomPurposeIds={selectedCustomPurposeIds}
							selectPurpose={selectPurpose}
							selectCustomPurpose={selectCustomPurpose}
							onShowVendors={this.handleShowVendors}
							persistedVendorConsentData={persistedVendorConsentData}
						/>
						<Vendors
							selectedVendorIds={selectedVendorIds}
							selectAllVendors={selectAllVendors}
							selectVendor={selectVendor}
							vendors={state.vendors}
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
