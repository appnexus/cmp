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
		customPurposes: [],
		selectedPurposeIds: new Set(),
		selectedPublisherPurposeIds: new Set(),
		selectedCustomPurposeIds: new Set()
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
			selectPublisherPurpose,
			selectPublisherCustomPurpose
		} = this.props;

		const allPurposes = this.getAllPurposes();
		const selectedPurpose = allPurposes[dataId];

		if (selectedPurpose) {
			if (selectedPurpose.custom) {
				selectPublisherCustomPurpose(selectedPurpose.id, isSelected);
			} else if (isPublisher) {
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

	handleSelectSpecialFeature = ({isSelected, dataId}) => {
		this.props.selectSpecialFeature(dataId, isSelected);
	};

	createHandleSelectPurpose = (isPublisher) => {
		return (data) => this.handleSelectPurpose(data, isPublisher);
	};

	getAllPurposes = () => {
		const {
			purposes,
			customPurposes
		} = this.props;
		let allPurposes = [];

		(purposes || []).forEach(purpose => {
			allPurposes.push({
				id: purpose.id,
				name: purpose.name,
				description: purpose.description,
				custom: false
			});
		});

		(customPurposes || []).forEach(purpose => {
			allPurposes.push({
				id: purpose.id,
				name: purpose.name,
				description: purpose.description,
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
			selectedPublisherPurposeIds,
			selectedCustomPurposeIds,
			purposes,
			specialPurposes,
			features,
			specialFeatures,
			persistedConsentData,
			initialVendorsRejection
		} = props;

		const { created: consentCreated } = persistedConsentData;

		const {
			selectedTab,
			renderedTabIndices
		} = state;

		const allPurposes = this.getAllPurposes();

		const purposeIsActive = (purpose, isPublisher = false) => purpose && (
			purpose.custom ?
			selectedCustomPurposeIds.has(purpose.id) :
			(isPublisher ? selectedPublisherPurposeIds : selectedPurposeIds).has(purpose.id)
		);

		const purposeIsTechnical = (purpose) => config.legIntPurposeIds &&
			config.contractPurposeIds &&
			purpose && !purpose.custom &&
			(config.legIntPurposeIds.indexOf(purpose.id) >= 0 || config.contractPurposeIds.indexOf(purpose.id) >= 0);

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
					this.handleSelectSpecialFeature({isSelected:false, dataId: index+1})
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
																		   isTechnical={false}
																		   createOnShowVendors={this.createOnShowVendors.bind(this)}
																		   onToggle={this.createHandleSelectPurpose()}/>)}
							</div>
							<div>
								<LocalLabel className={style.header} prefix="features" localizeKey={`title`}>Features</LocalLabel>
								{features.map((feature, index) => <Feature key={index}
																		   feature={feature}
																		   createOnShowVendors={this.createOnShowVendors.bind(this)}/>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
