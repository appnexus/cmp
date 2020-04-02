import { h, Component } from 'preact';
import style from './vendors.less';
import Switch from '../../../switch/switch';
import Label from "../../../label/label";
import Vendor from './vendor'

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'vendors'
	};
}

export default class Vendors extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editingConsents: false
		};
	}

	static defaultProps = {
		vendors: [],
		purposes: [],
		features: [],
		selectedVendorIds: new Set(),
		selectVendor: () => {}
	};

	handleAcceptAll = () => {
		const {vendors, selectVendors} = this.props;
		selectVendors(vendors.map(({id}) => id), true)
	};

	handleRejectAll = () => {
		const {vendors, selectVendors} = this.props;
		selectVendors(vendors.map(({id}) => id), false);
	};

	handleSelectVendor = ({ dataId, isSelected }) => {
		this.props.selectVendor(dataId, isSelected);
	};

	handleLegitInterest = ({ dataId, isSelected }) => {
		this.props.selectVendorLegitimateInterests(dataId, isSelected);
	};

	handleMoreChoices = () => {
		const {consentCreated, initialVendorsRejection} = this.props;
		if (!consentCreated) {
			initialVendorsRejection();
		}

		this.setState({
			editingConsents: true
		});
	};

	isFullVendorsConsentChosen = () => {
		const {vendors, selectedVendorIds} = this.props;
		const isSelected = ({id}) => selectedVendorIds.has(id);
		return vendors.every(isSelected);
	};

	handleFullConsentChange = ({isSelected}) => {
		isSelected ? this.handleAcceptAll() : this.handleRejectAll();
	};

	isFullLegitimateInterestChosen = () => {
		const {vendorsWithLegIntsIds, selectedLegitimateInterestsIds} = this.props;
		const isSelected = (el) => selectedLegitimateInterestsIds.has(el);
		return vendorsWithLegIntsIds.every(isSelected);
	};

	handleFullLegIntChange = ({isSelected}) => this.props.selectAllVendorLegitimateInterests(isSelected);

	getActiveAttributesNameElements = (setOfAttributes, idsOfActiveAttributes, translationPrefix = '') => {
		const activeAttributes = setOfAttributes
			.filter(attribute => idsOfActiveAttributes.indexOf(attribute['id']) !== -1)
			.map(attribute => <Label localizeKey={`${translationPrefix}${attribute['id']}.title`}>{attribute['name']}</Label>);

		return activeAttributes.length ? activeAttributes.reduce((prev, curr) => [...prev, ', ', curr]) : [];
	};

	render(props, state) {

		const {
			vendors,
			selectedVendorIds,
			selectedLegitimateInterestsIds,
			purposes,
			features,
			specialPurposes,
			specialFeatures
		} = props;
		const { editingConsents } = this.state;

		return (
			<div class={style.vendors}>
				<div class={style.header}>
					<div class={style.title}>
						<LocalLabel localizeKey='title'>Our partners</LocalLabel>
					</div>
				</div>
				<div class={style.description}>
					<LocalLabel localizeKey='description'>
						Help us provide you with a better online experience! Our partners set cookies and collect information from your browser across the web to provide you with website content, deliver relevant advertising and understand web audiences.
					</LocalLabel>
						{!editingConsents &&
						<div>
							<a onClick={this.handleMoreChoices}>
								<LocalLabel localizeKey='moreChoices'>Make More Choices</LocalLabel>
							</a>
						</div>
						}
				</div>
				<div class={style.vendorHeader}>
					<table class={style.vendorList}>
						<thead>
						<tr>
							<th><LocalLabel localizeKey='company'>Company</LocalLabel></th>
							{editingConsents &&
							<span class={style.vendorCenterSmall}>
							<th><LocalLabel localizeKey='legitimateInterest'>LegInt</LocalLabel>
							<Switch
									isSelected={this.isFullLegitimateInterestChosen()}
									onClick={this.handleFullLegIntChange}
								/></th>
							<th>
								<LocalLabel localizeKey='offOn'>Allow</LocalLabel>
								<Switch
									isSelected={this.isFullVendorsConsentChosen()}
									onClick={this.handleFullConsentChange}
								/>
							</th>
							</span>
							}
						</tr>
						</thead>
					</table>
				</div>
				<div class={style.vendorContent}>
					<table class={style.vendorList}>
						<tbody>
						{vendors.map(({ id, name, policyUrl, purposes: purposeIds=[], legIntPurposes=[],
										 features: featureIds=[], specialPurposes: specialPurposeIds=[],
										  specialFeatures: specialFeatureIds=[] }, index) => (
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
										<LocalLabel localizeKey='legitimateInterest'>LegInt</LocalLabel>
										<Switch
											dataId={id}
											isSelected={selectedLegitimateInterestsIds.has(id)}
											onClick={this.handleLegitInterest}
										/>
									</td> || <td class={style.vendorCenterSmall}/>}
								{editingConsents &&
									<td class={style.vendorCenterSmall}>
										<LocalLabel localizeKey='acceptButton'>Consent</LocalLabel>
										<Switch
											dataId={id}
											isSelected={selectedVendorIds.has(id)}
											onClick={this.handleSelectVendor}
										/>
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
