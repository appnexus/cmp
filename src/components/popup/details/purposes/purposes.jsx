import { h, Component } from 'preact';
import style from './purposes.less';
import Label from '../../../label/label';
import ConsentInfo from '../../../consentinfo/consentinfo';
import config from '../../../../lib/config';
import Feature from './feature';
import Purpose from './purpose';
import { TAB_PUBLISHER_INFO, TAB_CONSENTS } from '../../../../lib/store';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

export default class Purposes extends Component {
	constructor (props) {
		super(props);
		this.state = {
			renderedTabIndices: new Set(),
			allPurposes: this.getAllPurposes()
		};
	}

	static defaultProps = {
		onShowVendors: () => {
		},
		purposes: [],
		features: [],
		specialPurposes: [],
		specialFeatures: [],
		selectedPurposeIds: new Set(),
		selectedPublisherPurposeIds: new Set()
	};

	handleSelectPurpose = ({ isSelected, dataId }, isPublisher = false, isLegInt = false) => {
		const {
			selectPurpose,
			selectPurposeLegitimateInterests,
			selectPublisherConsent
		} = this.props;

		const {
			allPurposes
		} = this.state;

		const selectedPurpose = allPurposes[dataId];

		if (selectedPurpose) {
			if (isPublisher) {
				selectPublisherConsent(selectedPurpose.id, isSelected);
			} else if (isLegInt) {
				selectPurposeLegitimateInterests(selectedPurpose.id, isSelected);
			} else {
				selectPurpose(selectedPurpose.id, isSelected);
			}
		}
	};

	handleSelectSpecialFeatureOptins = ({ isSelected, dataId }) => {
		this.props.selectSpecialFeatureOptins(dataId + 1, isSelected);
	};

	createHandleSelectPurpose = (isPublisher) => {
		return (data) => this.handleSelectPurpose(data, isPublisher);
	};

	handleSelectLegitInterest = ({ dataId, isSelected }) => {
		this.props.selectPurposeLegitimateInterests(dataId + 1, isSelected);
	};

	handleSelectPublisherLegitimateInterest = ({ dataId, isSelected }) => {
		this.props.selectPublisherLegitimateInterests(dataId + 1, isSelected);
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

	createOnShowVendors (filter = {}) {
		return () => this.props.onShowVendors(filter);
	}

	render (props, state) {
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
			specialFeatureOptins,
			selectedPublisherLegitimateInterests,
			handleSelectTab,
			selectedTab,
			disableTabs
		} = props;
		const { created: consentCreated } = persistedConsentData;

		const {
			renderedTabIndices,
			allPurposes
		} = state;
		const purposeIsActive = (purpose, isPublisher = false) => purpose && (
			(isPublisher ? selectedPublisherPurposeIds : selectedPurposeIds).has(purpose.id)
		);

		const isSpecialFeatureOptinsActive = (id) => specialFeatureOptins.has(id + 1);
		const isPurposeLegitimateInterestActive = (id) => selectedPurposeLegitimateInterests.has(id + 1);
		const isPublisherLegIntActive = (id) => selectedPublisherLegitimateInterests.has(id + 1);

		const isTechnicalPurpose = (purpose) => config.legIntPurposeIds && config.contractPurposeIds && purpose &&
			(config.legIntPurposeIds.indexOf(purpose.id) >= 0 || config.contractPurposeIds.indexOf(purpose.id) >= 0);

		const isContractPurpose = (purpose) => purpose && config.contractPurposeIds &&
			(config.contractPurposeIds.indexOf(purpose.id) >= 0);

		const publisherSpecialPurposes = config.specialPurposes && !!config.specialPurposes.length &&
			specialPurposes.filter((purpose, index) => config.specialPurposes.indexOf(index + 1) !== -1);

		if (selectedTab === TAB_CONSENTS && !renderedTabIndices.has(selectedTab)) {
			renderedTabIndices.add(selectedTab);
			if (!consentCreated) {
				purposes.forEach((purpose, index) => {
					// iab purposes
					this.handleSelectPurpose({ isSelected: false, dataId: index });

					// iab leg ints
					this.handleSelectPurpose({ isSelected: true, dataId: index }, false, true);

					// publisher purposes
					this.handleSelectPurpose({ isSelected: false, dataId: index }, true, false);
				});
				specialFeatures.forEach((specialFeature, index) => {
					this.handleSelectSpecialFeatureOptins({ isSelected: false, dataId: index });
				});
				initialVendorsRejection();
			}
		}

		return (

			<div class={style.purposes}>
				{disableTabs || (
					<div class={style.purposeList}>
						<div
							class={[style.purposeItem, selectedTab === TAB_PUBLISHER_INFO ? style.selectedPurpose : ''].join(' ')}
							onClick={handleSelectTab(TAB_PUBLISHER_INFO)}
						>
							<LocalLabel prefix="tabs" localizeKey={`tab1.menu`}>General information</LocalLabel>
						</div>
						<div
							className={[style.purposeItem, selectedTab === TAB_CONSENTS ? style.selectedPurpose : ''].join(' ')}
							onClick={handleSelectTab(TAB_CONSENTS)}
						>
							<LocalLabel prefix="tabs" localizeKey={`tab2.menu`}>Personal data processing</LocalLabel>
						</div>
					</div>
				)}
				{!selectedTab ? (
					<div className={style.purposeDescription}>
						<div className={style.purposeDetail}>
							<div className={style.detailHeader}>
								<div className={style.title}>
									<LocalLabel prefix="tabs" localizeKey={`tab1.title`}>Learn more about how
										information is being used?</LocalLabel>
								</div>
							</div>
							<div className={style.body}>
								<LocalLabel prefix="tabs" localizeKey={`tab1.description`}>
									We and select companies may access and use your information for the listed purposes.
									You may
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
										<LocalLabel prefix="publisherConsents" localizeKey={`title`}>Publisher
											consents</LocalLabel>
									</div>
									<div className={style.body}>
										<LocalLabel prefix="tabs" localizeKey={`tab2.description`}/>
									</div>
								</div>
							</div>
							{allPurposes.map((purpose, index) => <Purpose key={index}
																		  index={index}
																		  isPublisherPurpose={true}
																		  purpose={purpose}
																		  isActive={purposeIsActive(purpose, true)}
																		  isTechnical={isTechnicalPurpose(purpose)}
																		  createOnShowVendors={this.createOnShowVendors.bind(this)}
																		  onToggle={this.createHandleSelectPurpose(true)}
																		  onToggleLegitInterest={this.handleSelectPublisherLegitimateInterest.bind(this)}
																		  isLegitimateInterestActive={isPublisherLegIntActive(index)}/>)}
							{publisherSpecialPurposes && !!publisherSpecialPurposes.length && <div>
								<LocalLabel className={style.header} prefix="specialPurposes" localizeKey={`title`}>Special
									purposes</LocalLabel>
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
										<LocalLabel prefix="vendorConsents" localizeKey={`title`}>Vendor
											consents</LocalLabel>
									</div>
								</div>
							</div>
							<div>
								<LocalLabel className={style.header} prefix="purposes"
											localizeKey={`title`}/>
								<ConsentInfo fields={['consents', 'legitimateInterests']}/>
								{purposes.map((purpose, index) => <Purpose key={index}
																		   index={index}
																		   purpose={purpose}
																		   isActive={purposeIsActive(purpose)}
																		   isLegitimateInterestActive={isPurposeLegitimateInterestActive(index)}
																		   isTechnical={isContractPurpose(purpose)}
																		   createOnShowVendors={this.createOnShowVendors.bind(this)}
																		   onToggleLegitInterest={this.handleSelectLegitInterest.bind(this)}
																		   onToggle={this.createHandleSelectPurpose()}/>)}
							</div>
							{specialPurposes && !!specialPurposes.length && <div>
								<LocalLabel className={style.header} prefix="specialPurposes" localizeKey={`title`}>Special
									purposes</LocalLabel>
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
								<LocalLabel className={style.header} prefix="features"
											localizeKey={`title`}>Features</LocalLabel>
								{features.map((feature, index) => <Feature key={index}
																		   feature={feature}
																		   createOnShowVendors={this.createOnShowVendors.bind(this)}/>
								)}
							</div>
							{specialFeatures && !!specialFeatures.length && <div>
								<LocalLabel className={style.header} prefix="specialFeatures" localizeKey={`title`}>Special
									features</LocalLabel>
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
