// import { h, Component } from 'preact';
// import style from './purposes.less';
// import Switch from '../../../switch/switch';
// import Label from "../../../label/label";
// import config from '../../../../lib/config';
//
// class LocalLabel extends Label {
// 	static defaultProps = {
// 		prefix: 'purposes'
// 	};
// }
//
// export default class Purposes extends Component {
// 	state = {
// 		selectedPurposeIndex: 0,
// 		renderedPurposeIndices: new Set()
// 	};
//
// 	static defaultProps = {
// 		onShowVendors: () => {},
// 		purposes: [],
// 		customPurposes: [],
// 		selectedPurposeIds: new Set(),
// 		selectedCustomPurposeIds: new Set()
// 	};
//
//
// 	handleSelectPurposeDetail = index => {
// 		return () => {
// 			this.setState({
// 				selectedPurposeIndex: index
// 			});
// 		};
// 	};
//
// 	handleSelectPurpose = ({isSelected}) => {
// 		const {selectedPurposeIndex} = this.state;
// 		const {
// 			selectPurpose,
// 			selectCustomPurpose
// 		} = this.props;
// 		const allPurposes = this.getAllPurposes();
// 		const selectedPurpose = allPurposes[selectedPurposeIndex];
//
// 		selectedPurpose.ids.forEach(id => {
// 			if (selectedPurpose.custom) {
// 				selectCustomPurpose(id, isSelected);
// 			}
// 			else {
// 				selectPurpose(id, isSelected);
// 			}
// 		});
// 	};
//
// 	getAllPurposes = () => {
// 		const {
// 			purposes,
// 			customPurposes
// 		} = this.props;
// 		let allPurposes = [];
//
// 		let purposeIdToGroupIndex = {};
// 		(config.purposeGroups || []).forEach((ids, i) => {
// 			ids.forEach(id => {
// 				purposeIdToGroupIndex[id] = i;
// 			});
// 		});
// 		let groupIndexToPurposeIndex = {};
// 		(purposes || []).forEach(purpose => {
// 			if (purposeIdToGroupIndex.hasOwnProperty(purpose.id)) {
// 				const groupIndex = purposeIdToGroupIndex[purpose.id];
// 				if (groupIndexToPurposeIndex.hasOwnProperty(groupIndex)) {
// 					allPurposes[groupIndexToPurposeIndex[groupIndex]].ids.push(purpose.id);
// 					return;
// 				}
// 				groupIndexToPurposeIndex[groupIndex] = allPurposes.length;
// 			}
// 			allPurposes.push({
// 				ids: [purpose.id],
// 				name: purpose.name,
// 				custom: false
// 			});
// 		});
//
// 		(customPurposes || []).forEach(purpose => {
// 			allPurposes.push({
// 				ids: [purpose.id],
// 				name: purpose.name,
// 				custom: true
// 			});
// 		});
//
// 		return allPurposes;
// 	};
//
//
// 	render(props, state) {
//
// 		const {
// 			onShowVendors,
// 			selectedPurposeIds,
// 			selectedCustomPurposeIds,
// 			persistedVendorConsentData
// 		} = props;
//
// 		const {created} = persistedVendorConsentData;
// 		const {
// 			selectedPurposeIndex,
// 			renderedPurposeIndices
// 		} = state;
//
// 		const allPurposes = this.getAllPurposes();
// 		const selectedPurpose = allPurposes[selectedPurposeIndex];
//
// 		const tabIsActive = selectedPurpose && selectedPurpose.ids.some(id =>
// 			selectedPurpose.custom ? selectedCustomPurposeIds.has(id) : selectedPurposeIds.has(id)
// 		);
// 		const purposeIsTechnical = config.legIntPurposeIds && selectedPurpose && !selectedPurpose.custom && selectedPurpose.ids.some(id =>
// 			config.legIntPurposeIds.indexOf(id) >= 0
// 		);
// 		const currentPurposeLocalizePrefix = `${selectedPurpose && selectedPurpose.custom ? 'customPurpose' : 'purpose'}${selectedPurpose && selectedPurpose.ids}`;
//
// 		if (!created && !purposeIsTechnical && !renderedPurposeIndices.has(selectedPurposeIndex)) {
// 			renderedPurposeIndices.add(selectedPurposeIndex);
// 			this.setState({renderedPurposeIndices});
// 			this.handleSelectPurpose({isSelected: false});
// 		}
//
// 		return (
// 			<div class={style.purposes}>
// 				<div class={style.purposeList}>
// 					{allPurposes.map((purpose, index) => (
// 						<div class={[style.purposeItem, selectedPurposeIndex === index ? style.selectedPurpose : ''].join(' ')}
// 							 onClick={this.handleSelectPurposeDetail(index)}
// 						>
// 							<LocalLabel localizeKey={`${purpose.custom ? 'customPurpose' : 'purpose'}${purpose.ids}.menu`}>{purpose.name}</LocalLabel>
// 						</div>
// 					))}
// 				</div>
// 				{selectedPurpose &&
// 				<div class={style.purposeDescription}>
// 					<div class={style.purposeDetail}>
// 						<div class={style.detailHeader}>
// 							<div class={style.title}>
// 								<LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.title`}>{selectedPurpose.name}</LocalLabel>
// 							</div>
// 							{!purposeIsTechnical &&
// 							<div class={style.active}>
// 								<LocalLabel localizeKey={tabIsActive ? 'active' : 'inactive'}>{tabIsActive ? 'Active' : 'Inactive'}</LocalLabel>
// 								<Switch
// 									isSelected={tabIsActive}
// 									onClick={this.handleSelectPurpose}
// 								/>
// 							</div>
// 							}
// 						</div>
// 						<div class={style.body}>
// 							<LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.description`} />
// 							{!purposeIsTechnical &&
// 							<a class={style.vendorLink} onClick={onShowVendors}><LocalLabel localizeKey='showVendors'>Show full vendor list</LocalLabel></a>
// 							}
// 						</div>
// 					</div>
// 				</div>
// 				}
// 			</div>
// 		);
// 	}
// }
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
		selectedTabIndex: 0,
		renderedPurposeIndices: new Set()
	};

	static defaultProps = {
		onShowVendors: () => {},
		purposes: [],
		customPurposes: [],
		selectedTabIds: new Set(),
		selectedCustomPurposeIds: new Set()
	};


	handleSelectTabDetail = index => {
		console.log(index);
		return () => {
			this.setState({
				selectedTabIndex: index
			});
		};
	};

	handleSelectTab = ({isSelected}) => {
		const {selectedTabIndex} = this.state;
		const {
			selectPurpose,
			selectCustomPurpose
		} = this.props;
		const allPurposes = this.getAllPurposes();
		const selectedTab = allPurposes[selectedTabIndex];

		selectedTab.ids.forEach(id => {
			if (selectedTab.custom) {
				selectCustomPurpose(id, isSelected);
			}
			else {
				selectPurpose(id, isSelected);
			}
		});
	};

	// getAllPurposes = () => {
	// 	const {
	// 		purposes,
	// 		customPurposes
	// 	} = this.props;
	// 	let allPurposes = [];
	//
	// 	let purposeIdToGroupIndex = {};
	// 	(config.purposeGroups || []).forEach((ids, i) => {
	// 		ids.forEach(id => {
	// 			purposeIdToGroupIndex[id] = i;
	// 		});
	// 	});
	// 	let groupIndexToPurposeIndex = {};
	// 	(purposes || []).forEach(purpose => {
	// 		if (purposeIdToGroupIndex.hasOwnProperty(purpose.id)) {
	// 			const groupIndex = purposeIdToGroupIndex[purpose.id];
	// 			if (groupIndexToPurposeIndex.hasOwnProperty(groupIndex)) {
	// 				allPurposes[groupIndexToPurposeIndex[groupIndex]].ids.push(purpose.id);
	// 				return;
	// 			}
	// 			groupIndexToPurposeIndex[groupIndex] = allPurposes.length;
	// 		}
	// 		allPurposes.push({
	// 			ids: [purpose.id],
	// 			name: purpose.name,
	// 			custom: false
	// 		});
	// 	});
	//
	// 	(customPurposes || []).forEach(purpose => {
	// 		allPurposes.push({
	// 			ids: [purpose.id],
	// 			name: purpose.name,
	// 			custom: true
	// 		});
	// 	});
	//
	// 	return allPurposes;
	// };


	render(props, state) {
		const tabs = ['Leg Int Publishera', 'Cele i funkcje przetwarzania danych osobowych'];

		const {
			onShowVendors,
			selectedTabIds,
			selectedCustomPurposeIds,
			persistedVendorConsentData,
			purposes,
			features
		} = props;

		const {created} = persistedVendorConsentData;
		const {
			selectedTabIndex,
			renderedPurposeIndices
		} = state;

		// const allPurposes = this.getAllPurposes();
		const selectedTab = tabs[selectedTabIndex];

		// const tabIsActive = selectedTab && selectedTab.ids.some(id =>
		// 	selectedTab.custom ? selectedCustomPurposeIds.has(id) : selectedTabIds.has(id)
		// );
		// const purposeIsTechnical = config.legIntPurposeIds && selectedTab && !selectedTab.custom && selectedTab.ids.some(id =>
		// 	config.legIntPurposeIds.indexOf(id) >= 0
		// );
		// const currentPurposeLocalizePrefix = `${selectedTab && selectedTab.custom ? 'customPurpose' : 'purpose'}${selectedTab && selectedTab.ids}`;
		const currentPurposeLocalizePrefix = selectedTab;

		// if (!created && !purposeIsTechnical && !renderedPurposeIndices.has(selectedTabIndex)) {
		// 	renderedPurposeIndices.add(selectedTabIndex);
		// 	this.setState({renderedPurposeIndices});
		// 	this.handleSelectTab({isSelected: false});
		// }

		return (
			<div class={style.purposes}>
				<div class={style.purposeList}>
					{tabs.map((tab, index) => (
						<div class={[style.purposeItem, selectedTabIndex === index ? style.selectedPurpose : ''].join(' ')}
							onClick={this.handleSelectTabDetail(index)}
						>
							<LocalLabel>{tab}</LocalLabel>
						</div>
					))}
				</div>
				{!selectedTabIndex ? (
					<div>Leg int publisher info</div>
				) : (
					<div className={style.purposeDescription}>
						<div className={style.purposeDetail}>
							<div className={style.detailHeader}>
								<div className={style.title}>
									<LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.title`}>{selectedTab}</LocalLabel>
								</div>

								{/* switch */}

								{/*<div className={style.active}>*/}
								{/*	<LocalLabel*/}
								{/*		localizeKey={tabIsActive ? 'active' : 'inactive'}>{tabIsActive ? 'Active' : 'Inactive'}</LocalLabel>*/}
								{/*	<Switch*/}
								{/*		isSelected={tabIsActive}*/}
								{/*		onClick={this.handleSelectTab}*/}
								{/*	/>*/}
								{/*</div>*/}
							</div>
							<div className={style.body}>
								<div>
									Cele
									{purposes.map((purpose, index) => {
										return (
											<div key={index} style="margin: 10px 0">
												{/*<LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.description`} />*/}
												<div>
													<p style="font-weight: bold">{purpose.name}</p>
													<p>{purpose.description}</p>
												</div>
											</div>
										);
									})}
								</div>
								<div style="margin-top: 30px">
									Funkcje
									{features.map((feature, index) => {
										return (
											<div key={index}>
												{/*<LocalLabel localizeKey={`${currentPurposeLocalizePrefix}.description`} />*/}
												<div>
													<p style="font-weight: bold">{feature.name}</p>
													<p>{feature.description}</p>
												</div>
											</div>
										);
									})}
								</div>
								{/*{!purposeIsTechnical &&*/}
								{/*	<a class={style.vendorLink} onClick={onShowVendors}><LocalLabel localizeKey='showVendors'>Show full vendor list</LocalLabel></a>*/}
								{/*}*/}
							</div>
						</div>
					</div>
				)
				}
			</div>
		);
	}
}
