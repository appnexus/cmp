import { h, Component } from 'preact';
import style from './purposes.less';
import Label from "../../../label/label";
import config from '../../../../lib/config';
import Feature from './feature';
import Purpose from "./purpose";

const TABS = [
	'Publisher informations',
	'Purposes & Features'
];

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

export default class Purposes extends Component {
	state = {
		selectedTabIndex: 0,
		renderedTabIndices: new Set()
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
				selectedTabIndex: index
			});
		};
	};

	handleSelectPurpose = ({isSelected, dataId}) => {
		const {
			selectPurpose,
			selectCustomPurpose
		} = this.props;

		const allPurposes = this.getAllPurposes();
		const selectedPurpose = allPurposes[dataId];

		if (selectedPurpose) {
			if (selectedPurpose.custom) {
				selectCustomPurpose(selectedPurpose.id, isSelected);
			} else {
				selectPurpose(selectedPurpose.id, isSelected);
			}
		}
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
				custom: false
			});
		});

		(customPurposes || []).forEach(purpose => {
			allPurposes.push({
				id: purpose.id,
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
			purposes,
			features,
			persistedVendorConsentData
		} = props;

		const {created} = persistedVendorConsentData;

		const {
			selectedTabIndex,
			renderedTabIndices
		} = state;

		const allPurposes = this.getAllPurposes();

		const purposeIsActive = (index) => {
			const selectedPurpose = allPurposes[index];

			return selectedPurpose && selectedPurpose.custom ?
				selectedCustomPurposeIds.has(selectedPurpose.id) :
				selectedPurposeIds.has(selectedPurpose.id);
		};

		const purposeIsTechnical = (index) => {
			const selectedPurpose = allPurposes[index];

			return config.legIntPurposeIds &&
				config.contractPurposeIds &&
				selectedPurpose && !selectedPurpose.custom &&
				config.legIntPurposeIds.indexOf(selectedPurpose.id) >= 0 ||
				config.contractPurposeIds.indexOf(selectedPurpose.id) >= 0;
		};

		if (!created && selectedTabIndex === 1 && !renderedTabIndices.has(selectedTabIndex)) {
			renderedTabIndices.add(selectedTabIndex);
			// TODO: differentiate publisher purposes from vendor purposes (publisher leg int purpose should not be unselected)
			for (let i = 0, j = purposes.length; i<j; i++) {
				if (!purposeIsTechnical(i)) {
					this.handleSelectPurpose({isSelected: false, dataId: i});
				}
			}
		}

		return (
			<div class={style.purposes}>
				<div class={style.purposeList}>
					{TABS.map((tab, index) => (
						<div class={[style.purposeItem, selectedTabIndex === index ? style.selectedPurpose : ''].join(' ')}
							onClick={this.handleSelectTab(index)}
						>
							<LocalLabel prefix="tabs" localizeKey={`tab${index+1}.menu`}/>
						</div>
					))}
				</div>
				{!selectedTabIndex ? (
					<div className={style.purposeDescription}>
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
					<div className={style.purposeDescription}>
						<div className={style.purposesSection}>
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
							{allPurposes.map((purpose, index) => <Purpose key={index}
																		  index={index}
																		  isPublisherPurpose={true}
																		  purpose={purpose}
																		  isActive={purposeIsActive(index)}
																		  isTechnical={purposeIsTechnical(index)}
																		  createOnShowVendors={this.createOnShowVendors.bind(this)}
																		  onToggle={this.handleSelectPurpose}/>)}
						</div>
						<div className={style.purposesSection}>
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
																		   index={index}
																		   purpose={purpose}
																		   isActive={purposeIsActive(index)}
																		   isTechnical={false}
																		   createOnShowVendors={this.createOnShowVendors.bind(this)}
																		   onToggle={this.handleSelectPurpose}/>)}
							</div>
							<div>
								<LocalLabel className={style.header} prefix="features" localizeKey={`title`}/>
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
