import { h, Component } from 'preact';
import style from './vendors.less';
import Switch from '../../../switch/switch';
import Label from "../../../label/label";
import ExternalLinkIcon from '../../../externallinkicon/externallinkicon'

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
		selectedVendorIds: new Set(),
		selectVendor: () => {}
	};

	componentDidMount() {
		if (!this.props.vendorConsentCreated) {
			this.handleRejectAll();
		}
	};

	handleAcceptAll = () => {
		this.props.selectAllVendors(true);
	};

	handleRejectAll = () => {
		this.props.selectAllVendors(false);
	};

	handleSelectVendor = ({ dataId, isSelected }) => {
		this.props.selectVendor(dataId, isSelected);
	};

	handleMoreChoices = () => {
		this.setState({
			editingConsents: true
		});
	};

	isFullVendorsConsentChosen = () => {
		const {vendors, selectedVendorIds} = this.props;
		return vendors.length === selectedVendorIds.size;
	};

	handleFullConsentChange = ({isSelected}) => {
		isSelected ? this.handleAcceptAll() : this.handleRejectAll();
	};

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
			purposes,
			features
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
							<span>
							<th><LocalLabel localizeKey='offOn'>Allow</LocalLabel></th>
							<th>
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
						{vendors.map(({ id, name, policyUrl, purposeIds, legIntPurposeIds, featureIds }, index) => (
							<tr key={id} class={index % 2 === 1 ? style.even : ''}>
								<td>
									<div class={style.vendorName}>
										{name}
										{policyUrl &&
										<a href={policyUrl} className={style.policy} target='_blank'><ExternalLinkIcon/></a>
										}
									</div>
									<div class={style.vendorDescription}>
										{purposeIds && !!purposeIds.length &&
										<span>
											<LocalLabel localizeKey='purposes'>Purposes</LocalLabel>{': '}
											{this.getActiveAttributesNameElements(purposes, purposeIds, 'purposes.purpose')}{'. '}
										</span>
										}
										{legIntPurposeIds && !!legIntPurposeIds.length &&
										<span>
											<LocalLabel localizeKey='legitimateInterestPurposes'>Legitimate interest purposes</LocalLabel>{': '}
											{this.getActiveAttributesNameElements(purposes, legIntPurposeIds, 'purposes.purpose')}{'. '}
										</span>
										}
										{featureIds && !!featureIds.length &&
										<span>
											<LocalLabel localizeKey='features'>Features</LocalLabel>{': '}
											{this.getActiveAttributesNameElements(features, featureIds, 'features.feature')}{'. '}
										</span>
										}
									</div>
								</td>
								{editingConsents &&
								<td>
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
