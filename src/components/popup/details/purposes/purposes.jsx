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

const Purpose = (props) => {
	const {
		purpose,
		isActive,
		onToggle,
		createOnShowVendors,
		isLegitimateInterest,
		isPublisherPurpose
	} = props;

	return (
		<div className={style.purposeDetail}>
			<div className={style.detailHeader}>
				<div className={style.title}>
					<LocalLabel localizeKey={`purpose${purpose.id}.title`}>{purpose.name}</LocalLabel>
				</div>
				{!isLegitimateInterest &&
					<div className={style.active}>
						<LocalLabel localizeKey={isActive ? 'active' : 'inactive'}>{isActive ? 'Active' : 'Inactive'}</LocalLabel>
						<Switch
							isSelected={isActive}
							dataId={purpose.id}
							onClick={onToggle}
						/>
					</div>
				}
			</div>
			<div className={style.body}>
				<LocalLabel localizeKey={`purpose${purpose.id}.description`} />
				{!isPublisherPurpose && (
					<div>
						<a className={style.vendorLink}
						   onClick={createOnShowVendors({isCustom: false, purposeIds: [purpose.id]})}>
							<LocalLabel localizeKey='showVendors'>Show full vendor list</LocalLabel>
						</a>
						<a className={style.vendorLink}
						   onClick={createOnShowVendors({isCustom: true, purposeIds: [purpose.id]})}>
							<LocalLabel localizeKey='showCustomVendors'>Show full custom vendor list</LocalLabel>
						</a>
					</div>
				)}
			</div>
		</div>
	);
};

const Feature = (props) => {
	const {
		feature,
		createOnShowVendors
	} = props;

	return (
		<div className={style.purposeDetail}>
			<div className={style.detailHeader}>
				<div className={style.title}>
					<LocalLabel prefix="features" localizeKey={`feature${feature.id}.title`}/>
				</div>
			</div>
			<div className={style.body}>
				<LocalLabel prefix="features" localizeKey={`feature${feature.id}.description`}/>
				<a className={style.vendorLink} onClick={createOnShowVendors({isCustom: false, featuresIds: [feature.id]})}>
					<LocalLabel localizeKey='showVendors'>Show full vendor list</LocalLabel>
				</a>
				<a className={style.vendorLink} onClick={createOnShowVendors({isCustom: true, featuresIds: [feature.id]})}>
					<LocalLabel localizeKey='showCustomVendors'>Show full custom vendor list</LocalLabel>
				</a>
			</div>
		</div>
	);
};

export default class Purposes extends Component {
	state = {
		selectedPurposeIndex: 0,
		selectedTab: 0,
		renderedPurposeIndices: new Set()
	};

	static defaultProps = {
		onShowVendors: () => {},
		purposes: [],
		features: [],
		customPurposes: [],
		selectedPurposeIds: new Set(),
		selectedCustomPurposeIds: new Set()
	};

	handleSelectTab = index => {
		return () => {
			this.setState({
				selectedTab: index
			});
		};
	};

	handleSelectPurpose = (e) => {
		const { isSelected, dataId } = e;
		this.props.selectPurpose(dataId, isSelected);
	};

	createOnShowVendors(filter = {}) {
		return () => this.props.onShowVendors(filter);
	}

	render(props, state) {

		const {
			selectedPurposeIds,
			// selectedCustomPurposeIds,
			// persistedVendorConsentData,
			purposes,
			features
		} = props;

		// const {created} = persistedVendorConsentData;
		const {
			// selectedPurposeIndex,
			// renderedPurposeIndices,
			selectedTab
		} = state;

		const tabs = ['Info wydawcy', 'Cele i funkcje przetwarzania danych osobowych'];

		// const allPurposes = this.getAllPurposes();
		// const selectedPurpose = allPurposes[selectedPurposeIndex];

		// const purposeIsActive = selectedPurpose && selectedPurpose.ids.some(id =>
		// 	selectedPurpose.custom ? selectedCustomPurposeIds.has(id) : selectedPurposeIds.has(id)
		// );
		// const purposeIsTechnical = config.legIntPurposeIds && selectedPurpose && !selectedPurpose.custom && selectedPurpose.ids.some(id =>
		// 	config.legIntPurposeIds.indexOf(id) >= 0
		// );
		// const currentPurposeLocalizePrefix = `${selectedPurpose && selectedPurpose.custom ? 'customPurpose' : 'purpose'}${selectedPurpose && selectedPurpose.ids}`;

		// if (!created && !purposeIsTechnical && !renderedPurposeIndices.has(selectedPurposeIndex)) {
		// 	renderedPurposeIndices.add(selectedPurposeIndex);
		// 	this.setState({renderedPurposeIndices});
		// 	this.handleSelectPurpose({isSelected: false});
		// }

		const purposeIsActive = (id) => selectedPurposeIds.has(id);
		const purposeIsLegitimateInterest = (id) => config.legIntPurposeIds.indexOf(id) >= 0;

		return (
			<div class={style.purposes}>
				<div class={style.purposeList}>
					{tabs.map((tab, index) => (
						<div class={[style.purposeItem, selectedTab === index ? style.selectedPurpose : ''].join(' ')}
							onClick={this.handleSelectTab(index)}
						>
							<LocalLabel prefix="tabs" localizeKey={`tab${index+1}.menu`}>{tab}</LocalLabel>
						</div>
					))}
				</div>
				{!selectedTab ? (
					<div className={style.purposesDescription}>
						<div className={style.purposeDetail}>
							<div className={style.detailHeader}>
								<div className={style.title}>
									<LocalLabel prefix="tabs" localizeKey={`tab1.title`}/>
								</div>
							</div>
							<div className={style.body}>
								<LocalLabel prefix="tabs" localizeKey={`tab1.description`}/>
							</div>
						</div>
					</div>
				) : (
					<div className={style.purposesDescription}>
						<div className={style.publisherSection}>
							<div className={style.sectionInfo}>
								<div className={style.sectionHeader}>
									<div className={style.title}>
										<LocalLabel prefix="publisherConsents" localizeKey={`title`}/>
									</div>
								</div>
								<div className={style.sectionBody}>
									<LocalLabel prefix="publisherConsents" localizeKey={`description`}/>
								</div>
							</div>
							{purposes.map((purpose, index) => <Purpose key={index}
																	   isPublisherPurpose={true}
																	   purpose={purpose}
																	   isActive={purposeIsActive(purpose.id)}
																	   isLegitimateInterest={purposeIsLegitimateInterest(purpose.id)}
																	   createOnShowVendors={this.createOnShowVendors.bind(this)}
																	   onToggle={this.handleSelectPurpose}/>)}
						</div>
						<div className={style.vendorsSection}>
							<div className={style.sectionInfo}>
								<div className={style.sectionHeader}>
									<div className={style.title}>
										<LocalLabel prefix="vendorConsents" localizeKey={`title`}/>
									</div>
								</div>
								<div className={style.sectionBody}>
									<LocalLabel prefix="vendorConsents" localizeKey={`description`}/>
								</div>
							</div>
							<div>
								<LocalLabel className={style.header} prefix="purposes" localizeKey={`title`}/>
								{purposes.map((purpose, index) => <Purpose key={index}
																		   purpose={purpose}
																		   isActive={purposeIsActive(purpose.id)}
																		   isLegitimateInterest={false}
																		   createOnShowVendors={this.createOnShowVendors.bind(this)}
																		   onToggle={this.handleSelectPurpose}/>)}
							</div>
							<div>
								<LocalLabel className={style.header} prefix="features" localizeKey={`title`}/>
								{features.map((feature, index) => <Feature key={index}
																		   feature={feature}
																		   createOnShowVendors={this.createOnShowVendors}/>
								)}
							</div>
						</div>
					</div>
				)
				}
			</div>
		);
	}
}
