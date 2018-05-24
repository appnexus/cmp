import { h, Component } from 'preact';
import style from './purposes.less';
import Switch from '../../../switch/switch';
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

const purposeItems = [
	{
		title: 'Storage and access of information',
		description: 'The storage of information, or access to information that is already stored, on user device such as accessing advertising identifiers and/or other device identifiers, and/or using cookies or similar technologies.'
	},
	{
		title: 'Ad selection and delivery',
		description: 'The collection of information and combination with previously collected information, to select and deliver advertisements and to measure the delivery and effectiveness of such advertisements. This includes using previously collected information about user interests to select ads, processing data about what advertisements were shown, how often they were shown, when and where they were shown, and whether they took any action related to the advertisement, including for example clicking an ad or making a purchase.'
	},
	{
		title: 'Content selection and delivery',
		description: 'The collection of information, and combination with previously collected information, to select and deliver content and to measure the delivery and effectiveness of such content. This includes using previously collected information about user interests to select content, processing data about what content was shown, how often or how long it was shown, when and where it was shown, and whether they took any action related to the content, including for example clicking on content.'
	},
	{
		title: 'Personalization',
		description: 'The collection and processing of information about user of a site to subsequently personalize advertising for them in other contexts, i.e. on other sites or apps, over time. Typically, the content of the site or app is used to make inferences about user interests, which inform future selections.'
	},
	{
		title: 'Measurement',
		description: 'The collection of information about user use of content, and combination with previously collected information, used to measure, understand, and report on user usage of content.'
	}
];

export default class Purposes extends Component {
	state = {
		selectedPurposeIndex: 0
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
			selectedCustomPurposeIds,
			theme,
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
				<div class={style.title}>
					How is this information being used?
				</div>
				<div class={style.description}>
					We and select companies may access and use your information for the below purposes. You may
					customize your choices below or continue using our site if you're OK with the purposes.
				</div>
				<div class={style.purposeItems}>
					{purposeItems.map(({title, description}) => (
						<div class={style.purposeItem}>
							<span class={style.purposeTitle}>{title}</span>
							<a class={style.learnMore} style={{color: theme.primary}}>Learn More & Set Preferences</a>
						</div>
					))}
				</div>
				<div className={style.title}>
					Who is using this information?
				</div>
				<div className={style.description}>
					We and pre-selected companies will use your information. You can see each company in the links above or <a style={{color: theme.primary}}>see the complete list here.</a>
				</div>
				<div className={style.title}>
					What information is being used?
				</div>
				<div className={style.description}>
					Different companies use different information, <a style={{color: theme.primary}}>see the complete list here.</a>
				</div>
			</div>
		);
	}
}
