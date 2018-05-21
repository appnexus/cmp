import { h, Component } from 'preact';
import style from './vendors.less';
import detailsStyle from '../details.less';
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
			isSelectAll: true
		};
	}

	static defaultProps = {
		vendors: [],
		selectedVendorIds: new Set(),
		selectVendor: () => {},
		selectAllVendors: () => {},
		selectedPurpose: {}
	};

	handleAcceptAll = () => {
		this.props.selectAllVendors(true);
	};

	handleRejectAll = () => {
		this.props.selectAllVendors(false);
	};

	handleToggleAll = () => {
		const {isSelectAll} = this.state;
		this[isSelectAll ? 'handleAcceptAll' : 'handleRejectAll']();
		this.setState({isSelectAll: !isSelectAll});
	};

	handleSelectVendor = ({dataId, isSelected}) => {
		this.props.selectVendor(dataId, isSelected);
	};

	render(props, state) {

		const {
			vendors,
			purposes,
			selectedVendorIds,
			selectedPurpose
		} = props;

		const {
			id: selectedPurposeId,
			name,
			description
		} = selectedPurpose;

		const validVendors = vendors
			.filter(({legIntPurposeIds = [], purposeIds = []}) => legIntPurposeIds.indexOf(selectedPurposeId) > -1 || purposeIds.indexOf(selectedPurposeId) > -1);


		return (
			<div class={style.vendors}>
				<div class={style.header}>
					<div class={detailsStyle.title}>
						{name}
					</div>
				</div>
				<div class={detailsStyle.description}>
					<strong>What this means:</strong> {description}
				</div>
				<div class={detailsStyle.description}>
					Depending on the type of data they collect, use,
					and process and other factors including privacy by design, certain partners rely on your consent while others require you to opt-out.
					For information on each vendor and to exercise your choices, see below.
					Or to opt-out, visit the <a href='http://optout.networkadvertising.org/?c=1#!/' target='_blank'>NAI</a>
					, <a href='http://optout.aboutads.info/?c=2#!/' target='_blank'>DAA</a>
					, or <a href='http://youronlinechoices.eu/' target='_blank'>EDAA</a> sites.
				</div>
				<a class={style.toggleAll} onClick={this.handleToggleAll}>Allow All</a>
				<div class={style.vendorContent}>
					<table class={style.vendorList}>
						<tbody>
						{validVendors.map(({id, name, purposeIds, policyUrl, policyUrlDisplay}, index) => (
							<tr key={id} class={index % 2 === 0 ? style.even : ''}>
								<td>
									<div class={style.vendorName}>
										{name}
										<a href={policyUrl} class={style.policy} target='_blank'><ExternalLinkIcon /></a>
									</div>
								</td>
								<td class={style.allowColumn}>
									{purposeIds.indexOf(selectedPurpose.id) > -1 ?
										<span class={style.allowSwitch}>
										Allow <Switch
											dataId={id}
											isSelected={selectedVendorIds.has(id)}
											onClick={this.handleSelectVendor}
										/>
										</span> :
										'requires opt-out'
									}
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
