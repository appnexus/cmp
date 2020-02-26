import { h, Component } from 'preact';
import style from './details.less';
import Button from '../../button/button';
import Vendors from './vendors/vendors';
import VendorList from './vendorList/vendorList';
import Summary from './summary/summary';
import Panel from '../../panel/panel';
import PurposeList from './purposeList/purposeList';
import Label from '../../label/label';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'details'
	};
}

export const SECTION_PURPOSES = 0;
export const SECTION_VENDOR_LIST = 1;
export const SECTION_PURPOSE_LIST = 2;
export const SECTION_VENDORS = 3;

export default class Details extends Component {
	handlePanelClick = panelIndex => {
		return () => {
			this.props.onChangeDetailsPanel(Math.max(0, panelIndex));
		};
	};

	handleBack = () => {
		this.props.onChangeDetailsPanel(SECTION_PURPOSES);
	};

	handlePurposeClick = purposeItem => {
		const { onChangeDetailsPanel, onSelectPurpose } = this.props;

		onChangeDetailsPanel(SECTION_VENDORS);
		onSelectPurpose(purposeItem);
	};

	formatVendors = (vendors, pubVendors, allowedVendorIds) => {
		let formattedVendors = pubVendors.length
			? pubVendors.map(vendor => ({
					...vendors.find(({ id }) => id === vendor.id),
					...vendor
			  }))
			: vendors.map(vendor => ({
					...vendor,
					policyUrl: vendor.policyUrl.indexOf('://') > -1 ? vendor.policyUrl : `https://${vendor.policyUrl}`
			  }));

		if (allowedVendorIds && allowedVendorIds.size) {
			formattedVendors = formattedVendors.filter(({ id }) => allowedVendorIds.has(id));
		}

		return formattedVendors.sort(({ name: n1 }, { name: n2 }) =>
			n1.toLowerCase() === n2.toLowerCase() ? 0 : n1.toLowerCase() > n2.toLowerCase() ? 1 : -1
		);
	};

	formatFeatures = (features, pubFeatures) => {
		return pubFeatures.length
			? pubFeatures.map(feature => ({
					...features.find(({ id }) => id === feature.id),
					...feature
			  }))
			: features;
	};

	render(props) {
		const { onSave, store, theme, selectedPanelIndex, selectedPurposeDetails } = props;

		const {
			backgroundColor,
			textLightColor,
			dividerColor,
			secondaryColor,
			secondaryTextColor,
			primaryColor,
			primaryTextColor
		} = theme;
		const {
			allowedVendorIds,
			vendorList = {},
			customPurposeList = {},
			vendorConsentData,
			pubVendorsList = {},
			selectAllVendors,
			selectVendor
		} = store;
		const { selectedVendorIds } = vendorConsentData;
		const { purposes = [], vendors = [], features = [] } = vendorList;
		const { purposes: customPurposes = [] } = customPurposeList;
		const { vendors: pubVendors = [], features: pubFeatures = [] } = pubVendorsList;

		const formattedVendors = this.formatVendors(vendors, pubVendors, allowedVendorIds);
		const formattedFeatures = this.formatFeatures(features, pubFeatures);

		return (
			<div
				class={style.details}
				style={{
					backgroundColor,
					color: textLightColor
				}}
			>
				<div class={style.body}>
					<Panel selectedIndex={selectedPanelIndex}>
						<Summary
							purposes={[...purposes, ...customPurposes]}
							onPurposeClick={this.handlePurposeClick}
							onVendorListClick={this.handlePanelClick(SECTION_VENDOR_LIST)}
							onPurposeListClick={this.handlePanelClick(SECTION_PURPOSE_LIST)}
							theme={theme}
						/>
						<VendorList vendors={formattedVendors} onBack={this.handleBack} theme={theme} />
						<PurposeList onBack={this.handleBack} theme={theme} />
						<Vendors
							vendors={formattedVendors}
							purposes={purposes}
							features={formattedFeatures}
							selectVendor={selectVendor}
							selectAllVendors={selectAllVendors}
							selectedVendorIds={selectedVendorIds}
							selectedPurposeDetails={selectedPurposeDetails}
							theme={theme}
						/>
					</Panel>
				</div>
				<div class={style.footer} style={{ borderColor: dividerColor }}>
					{selectedPanelIndex > 0 && (
						<Button
							class={style.back}
							onClick={this.handleBack}
							backgroundColor={secondaryColor}
							textColor={secondaryTextColor}
						>
							&lt; <LocalLabel localizeKey="back">Back</LocalLabel>
						</Button>
					)}
					<Button class={style.save} onClick={onSave} backgroundColor={primaryColor} textColor={primaryTextColor}>
						<LocalLabel localizeKey="save">Continue Using Site</LocalLabel>
					</Button>
				</div>
			</div>
		);
	}
}
