import { h, Component } from 'preact';
import style from './details.less';
import Button from '../../button/button';
import Purposes from './purposes/purposes';
import Vendors from './vendors/vendors';
import Panel from '../../panel/panel';

const SECTION_PURPOSES = 0;
const SECTION_VENDORS = 1;

export default class Details extends Component {
	state = {
		selectedPanelIndex: SECTION_PURPOSES
	};

	handleShowVendors = () => {
		this.setState({
			selectedPanelIndex: SECTION_VENDORS
		});
	};

	render(props, state) {
		const {
			onCancel,
			onSave,
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
			selectVendor
		} = store;
		const { selectedPurposeIds, selectedVendorIds } = vendorConsentData;
		const { selectedCustomPurposeIds } = publisherConsentData;
		const { purposes = [], vendors = [] } = vendorList;
		const { purposes: customPurposes = [] } = customPurposeList;


		return (
			<div class={style.details}>
				<div class={style.header}>
					Privacy Settings
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
						/>
						<Vendors
							selectedVendorIds={selectedVendorIds}
							selectAllVendors={selectAllVendors}
							selectVendor={selectVendor}
							vendors={vendors}
						/>
					</Panel>
				</div>
				<div class={style.footer}>
					<a class={style.cancel} onClick={onCancel}>Cancel</a>
					<Button class={style.save} onClick={onSave}>Save and Exit</Button>
				</div>
			</div>
		);
	}
}
