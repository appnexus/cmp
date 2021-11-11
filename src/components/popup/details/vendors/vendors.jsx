import { h, Component } from 'preact';
import style from './vendors.less';
import Switch from '../../../switch/switch';
import Label from '../../../label/label';
import ConsentInfo from '../../../consentinfo/consentinfo';
import Vendor from './vendor';

export default class Vendors extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editingConsents: props.defaultEditingConsentsState
		};
	}

	static defaultProps = {
		vendors: [],
		purposes: [],
		features: [],
		selectedVendorIds: new Set(),
		selectVendor: () => {
		}
	};

	handleAcceptAll = () => {
		const { vendors, selectVendors } = this.props;
		selectVendors(vendors.map(({ id }) => id), true);
	};

	handleRejectAll = () => {
		const { vendors, selectVendors } = this.props;
		selectVendors(vendors.map(({ id }) => id), false);
	};

	handleSelectVendor = ({ dataId, isSelected }) => {
		this.props.selectVendor(dataId, isSelected);
	};

	handleLegitInterest = ({ dataId, isSelected }) => {
		this.props.selectVendorLegitimateInterests(dataId, isSelected);
	};

	handleMoreChoices = () => {
		this.setState({
			editingConsents: true
		});
	};

	isFullVendorsConsentChosen = () => {
		const { vendors, selectedVendorIds, isCustom, customVendorsConsent } = this.props;

		if (isCustom) {
			return customVendorsConsent;
		}

		const isSelected = ({ id }) => selectedVendorIds.has(id);
		return vendors.every(isSelected);
	};

	handleFullConsentChange = ({ isSelected }) => {
		const { setCustomVendorsConsent, isCustom } = this.props;

		if (isCustom) {
			setCustomVendorsConsent(isSelected);
		}
		isSelected ? this.handleAcceptAll() : this.handleRejectAll();
	};

	isFullLegitimateInterestChosen = () => {
		const { vendorsWithLegIntsIds, selectedVendorsLegitimateInterestsIds } = this.props;
		const isSelected = (el) => selectedVendorsLegitimateInterestsIds.has(el);
		return vendorsWithLegIntsIds.every(isSelected);
	};

	handleFullLegIntChange = ({ isSelected }) => {
		const { vendors, selectVendorLegitimateInterests } = this.props;
		vendors.forEach(el => selectVendorLegitimateInterests(el.id, isSelected));
	};

	getActiveAttributesNameElements = (setOfAttributes, idsOfActiveAttributes, translationPrefix = '') => {
		const activeAttributes = setOfAttributes
			.filter(attribute => idsOfActiveAttributes.indexOf(attribute['id']) !== -1)
			.map(attribute => <Label
				localizeKey={`${translationPrefix}${attribute['id']}.title`}>{attribute['name']}</Label>);

		return activeAttributes.length > 1 ? activeAttributes.reduce((prev, curr) => [...prev, ', ', curr]) : activeAttributes;
	};

	getPrefix = () => this.props.isCustom ? 'customVendors' : 'iabVendors';

	render(props, state) {

		const {
			vendors,
			selectedVendorIds,
			selectedVendorsLegitimateInterestsIds,
			purposes,
			features,
			specialPurposes,
			specialFeatures
		} = props;
		const { editingConsents } = this.state;

		let isLegIntSwitchVisible = vendors.some(el => el.legIntPurposes && !!el.legIntPurposes.length);

		return (
			<div class={style.vendors}>
				<div class={style.header}>
					<div class={style.title}>
						<Label prefix={this.getPrefix()} localizeKey='title'>Our partners</Label>
					</div>
				</div>
				<div class={style.description}>
					{!editingConsents &&
					<div>
						<Label prefix={this.getPrefix()} localizeKey='description'>
							Help us provide you with a better online experience! Our partners set cookies and collect
							information from your browser across the web to provide you with website content, deliver
							relevant advertising and understand web audiences.
						</Label>
						<a onClick={this.handleMoreChoices}>
							<Label prefix={this.getPrefix()} localizeKey='moreChoices'>Make More Choices</Label>
						</a>
					</div>
					}
					{editingConsents &&
					<div>
						<Label prefix={this.getPrefix()} localizeKey='editingDescription'>
							Help us provide you with a better online experience! Our partners set cookies and collect
							information from your browser across the web to provide you with website content, deliver
							relevant advertising and understand web audiences.
						</Label>
						<ConsentInfo fields={isLegIntSwitchVisible ? ['consents', 'legitimateInterests'] : ['consents']} />
					</div>
					}
				</div>
				<div class={style.vendorHeader}>
					<table class={style.vendorList}>
						<thead>
							<tr>
								<th><Label prefix={this.getPrefix()} localizeKey='company'>Company</Label></th>
								{editingConsents &&
							<span class={style.vendorCenterSmall}>
								{isLegIntSwitchVisible &&
								<th><Label className={style.caption} prefix={this.getPrefix()}
									localizeKey='legitimateInterest'>LegInt</Label>
								<Switch
									isSelected={this.isFullLegitimateInterestChosen()}
									onClick={this.handleFullLegIntChange}
								/>
								<Label collapseEmpty={true} className={style.state} prefix={this.getPrefix()} localizeKey={this.isFullLegitimateInterestChosen() ? 'active' : 'inactive'} /></th>
								}
								<th>
									<Label className={style.caption} prefix={this.getPrefix()} localizeKey='offOn'>Allow</Label>
									<Switch
										isSelected={this.isFullVendorsConsentChosen()}
										onClick={this.handleFullConsentChange}
									/>
									<Label collapseEmpty={true} className={style.state} prefix={this.getPrefix()} localizeKey={this.isFullVendorsConsentChosen() ? 'active' : 'inactive'} /></th>
							</span>
								}
							</tr>
						</thead>
					</table>
				</div>
				<div class={style.vendorContent}>
					<table class={style.vendorList}>
						<tbody>
							{vendors.map(({
										  id, name, policyUrl, purposes: purposeIds = [], legIntPurposes = [],
										  features: featureIds = [], specialPurposes: specialPurposeIds = [],
										  specialFeatures: specialFeatureIds = []
									  }, index) => (
								<tr key={id} class={index % 2 === 1 ? style.even : ''}>
									<td>
										<Vendor name={name}
											policyUrl={policyUrl}
											purposes={this.getActiveAttributesNameElements(purposes, purposeIds, 'purposes.purpose')}
											legIntPurposes={this.getActiveAttributesNameElements(purposes, legIntPurposes, 'purposes.purpose')}
											features={this.getActiveAttributesNameElements(features, featureIds, 'features.feature')}
											specialPurposes={this.getActiveAttributesNameElements(specialPurposes, specialPurposeIds, 'specialPurposes.purpose')}
											specialFeatures={this.getActiveAttributesNameElements(specialFeatures, specialFeatureIds, 'specialFeatures.feature')}/>
									</td>
									{editingConsents && legIntPurposes.length &&
								<td class={style.vendorCenterSmall}>
									<Label className={style.caption} prefix={this.getPrefix()}
										localizeKey='legitimateInterest'>LegInt</Label>
									<Switch
										dataId={id}
										isSelected={selectedVendorsLegitimateInterestsIds.has(id)}
										onClick={this.handleLegitInterest}
									/>
									<Label collapseEmpty={true} className={style.state} prefix={this.getPrefix()} localizeKey={selectedVendorsLegitimateInterestsIds.has(id) ? 'active' : 'inactive'} />
								</td> || <td/>}
									{editingConsents && !this.props.isCustom &&
									<td className={style.vendorCenterSmall}>
										<Label collapseEmpty={true} className={style.caption} prefix={this.getPrefix()}
											localizeKey='acceptButton'>Consent</Label>
										<Switch
											dataId={id}
											isSelected={selectedVendorIds.has(id)}
											onClick={this.handleSelectVendor}
										/>
										<Label collapseEmpty={true} className={style.state} prefix={this.getPrefix()} localizeKey={selectedVendorIds.has(id) ? 'active' : 'inactive'} />
									</td>
									}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
