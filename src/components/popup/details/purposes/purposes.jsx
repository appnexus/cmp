import { h, Component } from 'preact';
import style from './purposes.less';
import Label from "../../../label/label";
import config from '../../../../lib/config';
import Feature from './feature';
import Purpose from "./purpose";

const TAB_PUBLISHER_INFO = 0;
const TAB_CONSENTS = 1;

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

export default class Purposes extends Component {
	state = {
		selectedTab: TAB_PUBLISHER_INFO,
		renderedTabIndices: new Set()
	};

	static defaultProps = {
		onShowVendors: () => {},
		purposes: [],
		features: [],
		specialPurposes: [],
		specialFeatures: [],
		selectedPurposeIds: new Set(),
		selectedPublisherPurposeIds: new Set()
	};

	handleSelectTab = tab => {
		return () => {
			this.setState({
				selectedTab: tab
			});
		};
	};

	handleSelectPurpose = ({isSelected, dataId}, isPublisher = false, isLegInt = false) => {
		const {
			selectPurpose,
			selectPurposeLegitimateInterests,
			selectPublisherPurpose
		} = this.props;

		const allPurposes = this.getAllPurposes();
		const selectedPurpose = allPurposes[dataId];

		if (selectedPurpose) {
			if (isPublisher) {
				selectPublisherPurpose(selectedPurpose.id, isSelected);
			} else {
				if (isLegInt) {
					selectPurposeLegitimateInterests(selectedPurpose.id, isSelected);
				} else {
					selectPurpose(selectedPurpose.id, isSelected);
				}
			}
		}
	};

	handleSelectSpecialFeatureOptins = ({isSelected, dataId}) => {
		this.props.selectSpecialFeatureOptins(dataId+1, isSelected);
	};

	createHandleSelectPurpose = (isPublisher) => {
		return (data) => this.handleSelectPurpose(data, isPublisher);
	};

	handleSelectLegitInterest = ({dataId, isSelected}) => {
		this.props.selectPurposeLegitimateInterests(dataId+1, isSelected);
	};

	getAllPurposes = () => {
		const { purposes } = this.props;
		let allPurposes = [];

		(purposes || []).forEach(purpose => {
			allPurposes.push({
				id: purpose.id,
				name: purpose.name,
				description: purpose.description,
				custom: false
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
			selectedPublisherPurposeIds,
			purposes,
			specialPurposes,
			features,
			specialFeatures,
			persistedConsentData = {},
			initialVendorsRejection,
			selectedPurposeLegitimateInterests,
			specialFeatureOptins
		} = props;

		const { created: consentCreated } = persistedConsentData;

		const {
			selectedTab,
			renderedTabIndices
		} = state;

		const allPurposes = this.getAllPurposes();

		const purposeIsActive = (purpose, isPublisher = false) => purpose && (
			(isPublisher ? selectedPublisherPurposeIds : selectedPurposeIds).has(purpose.id)
		);

		const isSpecialFeatureOptinsActive = (id) => specialFeatureOptins.has(id+1);
		const isPurposeLegitimateInterestActive = (id) => selectedPurposeLegitimateInterests.has(id+1);

		const purposeIsTechnical = (purpose) => config.legIntPurposeIds &&
			config.contractPurposeIds && purpose &&
			(config.legIntPurposeIds.indexOf(purpose.id) >= 0 || config.contractPurposeIds.indexOf(purpose.id) >= 0);

		const publisherSpecialPurposes = config.specialPurposes && !!config.specialPurposes.length &&
			specialPurposes.filter((purpose, index) => config.specialPurposes.indexOf(index+1) !== -1);

		if (selectedTab === TAB_CONSENTS && !renderedTabIndices.has(selectedTab)) {
			renderedTabIndices.add(selectedTab);
			if (!consentCreated) {
				purposes.forEach((purpose, index) => {
					// iab purposes
					this.handleSelectPurpose({isSelected: false, dataId: index});

					// iab leg ints
					this.handleSelectPurpose({isSelected: true, dataId: index}, false, true);

					// publisher purposes
					this.handleSelectPurpose({isSelected: false, dataId: index}, true, false);
				});
				specialFeatures.forEach((specialFeature, index) => {
					this.handleSelectSpecialFeatureOptins({isSelected:false, dataId: index})
				});
				initialVendorsRejection();
			}
		}

		return (
			<div class={style.purposes}>
				<div class={style.purposeList}>
					<div class={[style.purposeItem, selectedTab === TAB_PUBLISHER_INFO ? style.selectedPurpose : ''].join(' ')}
						onClick={this.handleSelectTab(TAB_PUBLISHER_INFO)}
					>
						<LocalLabel prefix="tabs" localizeKey={`tab1.menu`}>General information</LocalLabel>
					</div>
					<div
						className={[style.purposeItem, selectedTab === TAB_CONSENTS ? style.selectedPurpose : ''].join(' ')}
						onClick={this.handleSelectTab(TAB_CONSENTS)}
					>
						<LocalLabel prefix="tabs" localizeKey={`tab2.menu`}>Personal data processing</LocalLabel>
					</div>
				</div>
				{!selectedTab ? (
					<div className={style.purposeDescription}>
						<div className={style.purposeDetail}>
							<div className={style.detailHeader}>
								<div className={style.title}>
									<LocalLabel prefix="tabs" localizeKey={`tab1.title`}>Learn more about how information is being used?</LocalLabel>
								</div>
							</div>
							<div className={style.body}>
								<LocalLabel prefix="tabs" localizeKey={`tab1.description`}>
								We and select companies may access and use your information for the listed purposes. You may
								customize your choices or continue using our site if you're OK with the purposes.
								</LocalLabel>
							</div>
						</div>
					</div>
				) : (
					<div className={style.purposeDescription}>
						<div className={style.purposesSection}>
							<div className={style.sectionInfo}>
								<div className={style.sectionHeader}>
									<div className={style.title}>
										<LocalLabel prefix="publisherConsents" localizeKey={`title`}>Publisher consents</LocalLabel>
									</div>
								</div>
							</div>
							{allPurposes.map((purpose, index) => <Purpose key={index}
																		  index={index}
																		  isPublisherPurpose={true}
																		  purpose={purpose}
																		  isActive={purposeIsActive(purpose, true)}
																		  isTechnical={purposeIsTechnical(purpose)}
																		  createOnShowVendors={this.createOnShowVendors.bind(this)}
																		  onToggle={this.createHandleSelectPurpose(true)}/>)}
							{publisherSpecialPurposes && !!publisherSpecialPurposes.length && <div>
								<LocalLabel className={style.header} prefix="specialPurposes" localizeKey={`title`}>Special purposes</LocalLabel>
								{publisherSpecialPurposes.map((purpose, index) => <Purpose key={index}
																		  index={index}
																		  isPublisherPurpose={true}
																		  purpose={purpose}
																		  isActive={purposeIsActive(purpose, true)}
																		  isTechnical={true}
																		  createOnShowVendors={this.createOnShowVendors.bind(this)}/>)}
							</div>}
						</div>
						<div className={style.purposesSection}>
							<div className={style.sectionInfo}>
								<div className={style.sectionHeader}>
									<div className={style.title}>
										<LocalLabel prefix="vendorConsents" localizeKey={`title`}>Vendor consents</LocalLabel>
									</div>
								</div>
							</div>
							<div>
								<LocalLabel className={style.header} prefix="purposes" localizeKey={`title`}>Purposes</LocalLabel>
								{purposes.map((purpose, index) => <Purpose key={index}
																		   index={index}
																		   purpose={purpose}
																		   isActive={purposeIsActive(purpose)}
																		   isLegitimateInterestActive={isPurposeLegitimateInterestActive(index)}
																		   isTechnical={false}
																		   createOnShowVendors={this.createOnShowVendors.bind(this)}
																		   onToggleLegitInterest={this.handleSelectLegitInterest.bind(this)}
																		   onToggle={this.createHandleSelectPurpose()}/>)}
							</div>
							{specialPurposes && !!specialPurposes.length && <div>
								<LocalLabel className={style.header} prefix="specialPurposes" localizeKey={`title`}>Special purposes</LocalLabel>
								{specialPurposes.map((purpose, index) => <Purpose key={index}
																		   index={index}
																		   purpose={purpose}
																		   isActive={false}
																		   isLegitimateInterestActive={false}
																		   isTechnical={true}
																		   isSpecial={true}
																		   createOnShowVendors={this.createOnShowVendors.bind(this)}/>)}

							</div>}
							<div>
								<LocalLabel className={style.header} prefix="features" localizeKey={`title`}>Features</LocalLabel>
								{features.map((feature, index) => <Feature key={index}
																		   feature={feature}
																		   createOnShowVendors={this.createOnShowVendors.bind(this)}/>
								)}
							</div>
							{specialFeatures && !!specialFeatures.length && <div>
								<LocalLabel className={style.header} prefix="specialFeatures" localizeKey={`title`}>Special features</LocalLabel>
								{specialFeatures.map((feature, index) => <Feature key={index}
																		   index={index}
																		   feature={feature}
																		   isSpecial={true}
																		   isActive={isSpecialFeatureOptinsActive(index)}
																		   createOnShowVendors={this.createOnShowVendors.bind(this)}
																		   onToggle={this.handleSelectSpecialFeatureOptins.bind(this)}/>
								)}
							</div>}
						</div>
					</div>
				)}
			</div>
		);
	}
}
