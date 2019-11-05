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

const TABS = [
	'Publisher informations',
	'Purposes & Features'
];

const Purpose = (props) => {
	const {
		purpose,
		isActive,
		onToggle,
		createOnShowVendors,
		isSwitchable,
		isPublisherPurpose
	} = props;

	return (
		<div className={style.purposeDetail}>
			<div className={style.detailHeader}>
				<div className={style.title}>
					<LocalLabel localizeKey={`purpose${purpose.id}.title`}>{purpose.name}</LocalLabel>
				</div>
				{isSwitchable &&
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
				selectedTab: index
			});
		};
	};

	handleSelectPurpose = ({isSelected, dataId}) => this.props.selectPurpose(dataId, isSelected);

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
			selectedTab,
			renderedTabIndices
		} = state;

		const purposeIsActive = (id) => selectedPurposeIds.has(id);
		const purposeIsSwitchable = (id) => !(config.legIntPurposeIds.indexOf(id) >= 0 || config.contractPurposeIds.indexOf(id) >= 0);

		if (!created && !renderedTabIndices.has(selectedTab)) {
			renderedTabIndices.add(selectedTab);
			for (let purpose of purposes) {
				this.handleSelectPurpose({isSelected: false, dataId: purpose.id});
			}
		}

		return (
			<div class={style.purposes}>
				<div class={style.purposeList}>
					{TABS.map((tab, index) => (
						<div class={[style.purposeItem, selectedTab === index ? style.selectedPurpose : ''].join(' ')}
							onClick={this.handleSelectTab(index)}
						>
							<LocalLabel prefix="tabs" localizeKey={`tab${index+1}.menu`}>{tab}</LocalLabel>
						</div>
					))}
				</div>
				{!selectedTab ? (
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
																	   isSwitchable={purposeIsSwitchable(purpose.id)}
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
																		   isSwitchable={false}
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
				)}
			</div>
		);
	}
}
