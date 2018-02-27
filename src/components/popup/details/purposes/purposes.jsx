import { h, Component } from 'preact';
import style from './purposes.less';
import Switch from '../../../switch/switch';
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

export default class Purposes extends Component {
	state = {
		selectedPurposeIndex: -1
	};

	static defaultProps = {
		onShowVendors: () => {},
		purposes: [],
		customPurposes: [],
		selectedPurposeIds: new Set(),
		selectedCustomPurposeIds: new Set()
	};


	handleSelectPurposeDetail = index => {
		return () => {
			this.setState({
				selectedPurposeIndex: index
			});
		};
	};

	handleSelectPurpose = ({isSelected}) => {
		const {selectedPurposeIndex} = this.state;
		const {
			purposes,
			customPurposes,
			selectPurpose,
			selectCustomPurpose
		} = this.props;
		const allPurposes = [...purposes, ...customPurposes];
		const id = allPurposes[selectedPurposeIndex].id;

		if (selectedPurposeIndex < purposes.length) {
				selectPurpose(id, isSelected);
		}
		else {
			selectCustomPurpose(id, isSelected);
		}
	};


	render(props, state) {

		const {
			onShowVendors,
			purposes,
			customPurposes,
			selectedPurposeIds,
			selectedCustomPurposeIds
		} = props;

		const {selectedPurposeIndex} = state;

		const allPurposes = [...purposes, ...customPurposes];
		const selectedPurpose = allPurposes[selectedPurposeIndex];
		const selectedPurposeId = selectedPurpose && selectedPurpose.id;
		const purposeIsActive = selectedPurposeIndex < purposes.length ?
			selectedPurposeIds.has(selectedPurposeId) :
			selectedCustomPurposeIds.has(selectedPurposeId);
		const currentPurposeLocalizePrefix = `${selectedPurposeIndex >= purposes.length ? 'customPurpose' : 'purpose'}${selectedPurposeId}`;

		return (
			<div class={style.purposes}>
				<div class={style.purposeList}>
					<div class={[style.purposeItem, selectedPurposeIndex === -1 ? style.selectedPurpose : ''].join(' ')}
					onClick={this.handleSelectPurposeDetail(-1)}
					>
						<LocalLabel localizeKey='cookies.menu'>How we use cookies</LocalLabel>
					</div>
					{allPurposes.map((purpose, index) => (
						<div class={[style.purposeItem, selectedPurposeIndex === index ? style.selectedPurpose : ''].join(' ')}
							 onClick={this.handleSelectPurposeDetail(index)}
						 >
							<LocalLabel localizeKey={`${index >= purposes.length ? 'customPurpose' : 'purpose'}${purpose.id}.menu`}>{purpose.name}</LocalLabel>
						</div>
					))}
				</div>
				<div class={style.purposeDescription}>
					{selectedPurposeIndex < 0 &&
					<div class={style.purposeDetail}>
						<div class={style.title}>
							<LocalLabel localizeKey='cookies.title'>This website uses cookies</LocalLabel>
						</div>
						<div class={style.body}>
							<LocalLabel localizeKey='cookies.description'>
								Our partners set cookies and collect information from your browser across the web to provide you with website content, deliver relevant advertising and understand web audiences.
							</LocalLabel>
							<a class={style.vendorLink} onClick={onShowVendors}><LocalLabel localizeKey='showVendors'>Show full vendor list</LocalLabel></a>
						</div>
					</div>}
					{selectedPurposeIndex > -1 &&
					<div class={style.purposeDetail}>
						<div class={style.detailHeader}>
							<div class={style.title}>
								<LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.title`}>{allPurposes[selectedPurposeIndex].name}</LocalLabel>
							</div>
							<div class={style.active}>
								<LocalLabel localizeKey='active'>Active</LocalLabel>
								<Switch
									isSelected={purposeIsActive}
									onClick={this.handleSelectPurpose}
									/>
							</div>
						</div>
						<div class={style.body}>
							<LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.description`}>
								Allow processing of a user’s data to provide and inform personalised advertising (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices  for that purpose.
								Will include following Features:
								<ul>
									<li>Matching Data to Offline Sources - combining data from offline sources that were initially collected in other contexts.</li>
									<li>Linking Devices - allow processing of a user’s data to connect such user across multiple devices. </li>
									<li>Precise Geographic Location data - allow processing of a user’s precise geographic location data in support of a purpose for which that certain third party has consent.</li>
								</ul>
							</LocalLabel>
						</div>
					</div>}
				</div>
			</div>
		);
	}
}
