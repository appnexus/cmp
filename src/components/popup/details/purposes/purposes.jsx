import { h, Component } from 'preact';
import style from './purposes.less';
import Switch from '../../../switch/switch';
import Label from "../../../label/label";
import config from '../../../../lib/config';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

export default class Purposes extends Component {
	state = {
		selectedPurposeIndex: 0,
		renderedPurposeIndices: new Set()
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
			selectPurpose,
			selectCustomPurpose
		} = this.props;
		const allPurposes = this.getAllPurposes();
		const selectedPurpose = allPurposes[selectedPurposeIndex];

		if (selectedPurpose) {
			selectedPurpose.ids.forEach(id => {
				if (selectedPurpose.custom) {
					selectCustomPurpose(id, isSelected);
				}
				else {
					selectPurpose(id, isSelected);
				}
			});
		}
	};

	getAllPurposes = () => {
		const {
			purposes,
			customPurposes
		} = this.props;
		let allPurposes = [];

		let purposeIdToGroupIndex = {};
		(config.purposeGroups || []).forEach((ids, i) => {
			ids.forEach(id => {
				purposeIdToGroupIndex[id] = i;
			});
		});
		let groupIndexToPurposeIndex = {};
		(purposes || []).forEach(purpose => {
			if (purposeIdToGroupIndex.hasOwnProperty(purpose.id)) {
				const groupIndex = purposeIdToGroupIndex[purpose.id];
				if (groupIndexToPurposeIndex.hasOwnProperty(groupIndex)) {
					allPurposes[groupIndexToPurposeIndex[groupIndex]].ids.push(purpose.id);
					return;
				}
				groupIndexToPurposeIndex[groupIndex] = allPurposes.length;
			}
			allPurposes.push({
				ids: [purpose.id],
				name: purpose.name,
				custom: false
			});
		});

		(customPurposes || []).forEach(purpose => {
			allPurposes.push({
				ids: [purpose.id],
				name: purpose.name,
				custom: true
			});
		});

		return allPurposes;
	};

	createOnShowVendors(filter = {}) {
		return () => this.props.onShowVendors(filter);
	}

	render(props, state) {

		const {
			selectedPurposeIds,
			selectedCustomPurposeIds,
			persistedVendorConsentData
		} = props;

		const {created} = persistedVendorConsentData;
		const {
			selectedPurposeIndex,
			renderedPurposeIndices
		} = state;

		const allPurposes = this.getAllPurposes();
		const selectedPurpose = allPurposes[selectedPurposeIndex];

		const purposeIsActive = selectedPurpose && selectedPurpose.ids.some(id =>
			selectedPurpose.custom ? selectedCustomPurposeIds.has(id) : selectedPurposeIds.has(id)
		);
		const purposeIsTechnical = config.legIntPurposeIds && selectedPurpose && !selectedPurpose.custom && selectedPurpose.ids.some(id =>
			config.legIntPurposeIds.indexOf(id) >= 0
		);
		const currentPurposeLocalizePrefix = `${selectedPurpose && selectedPurpose.custom ? 'customPurpose' : 'purpose'}${selectedPurpose && selectedPurpose.ids}`;

		if (!created && !purposeIsTechnical && !renderedPurposeIndices.has(selectedPurposeIndex)) {
			renderedPurposeIndices.add(selectedPurposeIndex);
			this.setState({renderedPurposeIndices});
			this.handleSelectPurpose({isSelected: false});
		}

		return (
			<div class={style.purposes}>
				<div class={style.purposeList}>
					{allPurposes.map((purpose, index) => (
						<div class={[style.purposeItem, selectedPurposeIndex === index ? style.selectedPurpose : ''].join(' ')}
							 onClick={this.handleSelectPurposeDetail(index)}
						>
							<LocalLabel localizeKey={`${purpose.custom ? 'customPurpose' : 'purpose'}${purpose.ids}.menu`}>{purpose.name}</LocalLabel>
						</div>
					))}
				</div>
				{selectedPurpose &&
				<div class={style.purposeDescription}>
					<div class={style.purposeDetail}>
						<div class={style.detailHeader}>
							<div class={style.title}>
								<LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.title`}>{selectedPurpose.name}</LocalLabel>
							</div>
							{!purposeIsTechnical &&
							<div class={style.active}>
								<LocalLabel localizeKey={purposeIsActive ? 'active' : 'inactive'}>{purposeIsActive ? 'Active' : 'Inactive'}</LocalLabel>
								<Switch
									isSelected={purposeIsActive}
									onClick={this.handleSelectPurpose}
								/>
							</div>
							}
						</div>
						<div class={style.body}>
							<LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.description`} />
							{!purposeIsTechnical && [
							<div><a class={style.vendorLink} onClick={this.createOnShowVendors({ isCustom: true })}><LocalLabel localizeKey='showCustomVendors'>Show full custom vendor list</LocalLabel></a></div>,
							<div><a class={style.vendorLink} onClick={this.createOnShowVendors({ isCustom: false })}><LocalLabel localizeKey='showVendors'>Show full vendor list</LocalLabel></a></div>
							]}
						</div>
					</div>
				</div>
				}
			</div>
		);
	}
}
