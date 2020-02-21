import { h, Component } from 'preact';
import style from './vendors.less';
import detailsStyle from '../details.less';
import Switch from '../../../switch/switch';
import Label from '../../../label/label';
import ExternalLinkIcon from '../../../externallinkicon/externallinkicon';

class VendorsLabel extends Label {
	static defaultProps = {
		prefix: 'vendors'
	};
}
class PurposesLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

class FeaturesButton extends Component {
	onClick = () => {
		this.props.handleToggleFeatures(this.props.id);
	};

	render(props) {
		const { children, style } = props;

		return (
			<a onClick={this.onClick} style={style}>
				{children}
			</a>
		);
	}
}

export default class Vendors extends Component {
	constructor(props) {
		super(props);
		console.log('props', props);
		this.state = {
			isSelectAll: false,
			showFeaturesId: null
		};
	}

	static defaultProps = {
		vendors: [],
		features: [],
		selectedVendorIds: new Set(),
		selectVendor: () => {},
		selectAllVendors: () => {},
		selectedPurposeDetails: {}
	};

	handleToggleAll = () => {
		const { id: selectedPurposeId } = this.props.selectedPurposeDetails;
		const { isSelectAll } = this.state;
		this.props.selectAllVendors(isSelectAll, selectedPurposeId);
		this.setState({ isSelectAll: !isSelectAll });
	};

	handleToggleFeatures = id => {
		const { showFeaturesId } = this.state;
		if (showFeaturesId === id) {
			this.setState({ showFeaturesId: null });
		} else {
			this.setState({ showFeaturesId: id });
		}
	};

	handleSelectVendor = ({ dataId, isSelected }) => {
		this.props.selectVendor(dataId, isSelected);
	};

	renderFeature(featureId) {
		const { features } = this.props;
		const feature = features.find(({ id }) => id === featureId);
		return (
			feature && (
				<li>
					<b>{feature.name}</b>
					<p>{feature.description}</p>
				</li>
			)
		);
	}

	renderOptoutDescription(optOutDescription, textLinkColor) {
		if (optOutDescription) {
			return <p>{optOutDescription}</p>;
		}

		return (
			<p>
				Depending on the type of data they collect, use, and process and other factors including privacy by design,
				certain partners rely on your consent while others require you to opt-out. For information on each vendor and to
				exercise your choices, see below. Or to opt-out, visit the{' '}
				<a href="http://optout.networkadvertising.org/?c=1#!/" target="_blank" style={{ color: textLinkColor }}>
					NAI
				</a>
				,{' '}
				<a href="http://optout.aboutads.info/?c=2#!/" target="_blank" style={{ color: textLinkColor }}>
					DAA
				</a>
				, and{' '}
				<a href="http://youronlinechoices.eu/" target="_blank" style={{ color: textLinkColor }}>
					EDAA
				</a>{' '}
				sites.
			</p>
		);
	}

	render(props, state) {
		const { isSelectAll, showFeaturesId } = state;
		const { vendors, selectedVendorIds, selectedPurposeDetails, theme } = props;

		const { textColor, textLightColor, textLinkColor, primaryColor, featuresColor } = theme;

		const { id: selectedPurposeId, name, description, optoutDescription } = selectedPurposeDetails;

		const validVendors = vendors.filter(
			({ legIntPurposeIds = [], purposeIds = [] }) =>
				legIntPurposeIds.indexOf(selectedPurposeId) > -1 || purposeIds.indexOf(selectedPurposeId) > -1
		);

		return (
			<div class={style.vendors}>
				<div class={style.header}>
					<div class={detailsStyle.title} style={{ color: textColor }}>
						<PurposesLabel localizeKey={`purpose${selectedPurposeId}.title`}>{name}</PurposesLabel>
					</div>
				</div>
				<div class={detailsStyle.description} style={{ color: textLightColor }}>
					<p>
						<PurposesLabel localizeKey={`purpose${selectedPurposeId}.description`}>{description}</PurposesLabel>
					</p>
					<p>
						<PurposesLabel localizeKey={`purpose${selectedPurposeId}.optoutDescription`}>
							{this.renderOptoutDescription(optoutDescription, textLinkColor)}
						</PurposesLabel>
					</p>
				</div>
				<a class={style.toggleAll} onClick={this.handleToggleAll} style={{ color: primaryColor }}>
					{isSelectAll ? (
						<VendorsLabel localizeKey="acceptAll">Allow All</VendorsLabel>
					) : (
						<VendorsLabel localizeKey="acceptNone">Disallow All</VendorsLabel>
					)}
				</a>
				<div class={style.vendorContent}>
					<table class={style.vendorList}>
						<tbody>
							{validVendors
								// .filter(({ purposeIds }) => purposeIds.includes(selectedPurposeId))
								.map(({ id, name, purposeIds, featureIds, policyUrl }, index) => (
									<tr key={id} class={index % 2 === 0 ? style.even : ''}>
										<td class={style.vendorItem}>
											<div class={style.vendorName}>
												{name}
												<a href={policyUrl} class={style.policy} style={{ color: textLinkColor }} target="_blank">
													<ExternalLinkIcon color={textLinkColor} />
												</a>
											</div>
											{featureIds.length > 0 && (
												<div
													class={[
														style.vendorFeaturesBtn,
														showFeaturesId === id ? style.vendorFeaturesBtnActive : ''
													].join(' ')}
													style={showFeaturesId === id && featuresColor && { backgroundColor: featuresColor }}
												>
													<FeaturesButton
														id={id}
														handleToggleFeatures={this.handleToggleFeatures}
														style={{ color: textLinkColor }}
													>
														Features
													</FeaturesButton>
												</div>
											)}
											<div class={style.allowColumn}>
												{purposeIds.indexOf(selectedPurposeDetails.id) > -1 ? (
													<span class={style.allowSwitch}>
														<VendorsLabel localizeKey="accept">Allow</VendorsLabel>{' '}
														<Switch
															color={primaryColor}
															dataId={id}
															isSelected={selectedVendorIds.has(id)}
															onClick={this.handleSelectVendor}
														/>
													</span>
												) : (
													<VendorsLabel localizeKey="optOut">requires opt-out</VendorsLabel>
												)}
											</div>
											{showFeaturesId === id && (
												<div
													class={[index % 2 === 0 ? style.even : '', style.vendorFeatures].join(' ')}
													style={{ backgroundColor: featuresColor }}
												>
													<ul>{featureIds.map(featureId => this.renderFeature(featureId))}</ul>
												</div>
											)}
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
