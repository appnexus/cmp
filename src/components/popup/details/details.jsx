import { h, Component } from 'preact';
import style from './details.less';
import Button from '../../button/button';
import Vendors from './vendors/vendors';
import VendorList from './vendorList/vendorList';
import Summary from './summary/summary';
import Panel from '../../panel/panel';
import PurposeList from './purposeList/purposeList';
import Label from "../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'details'
	};
}

const SECTION_PURPOSES = 0;
const SECTION_VENDOR_LIST = 1;
const SECTION_PURPOSE_LIST = 2;
const SECTION_VENDORS = 3;

export default class Details extends Component {
	state = {
		selectedPanelIndex: SECTION_PURPOSES
	};

	handlePanelClick = panelIndex => {
		return () => {
			this.setState({
				selectedPanelIndex: Math.max(0, panelIndex)
			});
		};
	};

	handleBack = () => {
		this.setState({
			selectedPanelIndex: SECTION_PURPOSES
		});
	};

	handlePurposeClick = purposeItem => {
		this.setState({
			selectedPurpose: purposeItem,
			selectedPanelIndex: SECTION_VENDORS
		});
	};


	render(props, state) {
		const {
			onSave,
			onClose,
			store,
			theme,
		} = props;
		const {
			selectedPanelIndex,
			selectedPurpose
		} = state;

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
		const {selectedPurposeIds, selectedVendorIds} = vendorConsentData;
		const {selectedCustomPurposeIds} = publisherConsentData;
		const {purposes = [], vendors = []} = vendorList;
		const {purposes: customPurposes = []} = customPurposeList;

		const formattedVendors = vendors
			.map(vendor => ({
				...vendor,
				policyUrl: vendor.policyUrl.indexOf('://') > -1 ? vendor.policyUrl : `http://${vendor.policyUrl}`
			}))
			.sort(({name: n1}, {name: n2}) => n1.toLowerCase() === n2.toLowerCase() ? 0 : n1.toLowerCase() > n2.toLowerCase() ? 1 : -1);

		return (
			<div class={style.details} style={{backgroundColor: theme.background, color: theme.textLight}}>
				<div class={style.body}>
					<Panel selectedIndex={selectedPanelIndex}>
						<Summary
							purposes={purposes}
							onPurposeClick={this.handlePurposeClick}
							onVendorListClick={this.handlePanelClick(SECTION_VENDOR_LIST)}
							onPurposeListClick={this.handlePanelClick(SECTION_PURPOSE_LIST)}
							theme={theme}
						/>
						<VendorList
							vendors={formattedVendors}
							onBack={this.handleBack}
							theme={theme}
						/>
						<PurposeList
							onBack={this.handleBack}
							theme={theme}
						/>
						<Vendors
							vendors={formattedVendors}
							purposes={purposes}
							selectVendor={selectVendor}
							selectAllVendors={selectAllVendors}
							selectedVendorIds={selectedVendorIds}
							selectedPurpose={selectedPurpose}
							theme={theme}
						/>
					</Panel>
				</div>
				<div class={style.footer} style={{borderColor: theme.divider}}>
					{selectedPanelIndex > 0 &&
					<Button
						class={style.back}
						onClick={this.handleBack}
						backgroundColor={theme.secondary}
						textColor={theme.secondaryText}
					>&lt; <LocalLabel localizeKey='back'>Back</LocalLabel></Button>
					}
					<Button
						class={style.save}
						onClick={onSave}
						backgroundColor={theme.primary}
						textColor={theme.primaryText}
					><LocalLabel localizeKey='save'>Continue Using Site</LocalLabel></Button>
				</div>
			</div>
		);
	}
}
