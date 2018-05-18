import { h, Component } from 'preact';
import style from './summary.less';
import detailsStyle from '../details.less';
import Button from '../../../button/button';
import Label from "../../../label/label";

class LocalLabel extends Label {}

export default class VendorList extends Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		vendors: [],
	};

	handlePurposeItemClick = purposeItem => {
		return () => {
			this.props.onPurposeClick(purposeItem);
		};
	};

	render(props, state)
	{
		const {
			purposes,
			onVendorListClick,
			onPurposeListClick,
		} = props;

		return (
			<div class={style.summary}>
				<div class={detailsStyle.title}>
					<LocalLabel localizeKey='summary.title'>Learn more about how information is being used?</LocalLabel>
				</div>
				<div class={detailsStyle.description}>
					<LocalLabel localizeKey='summary.description'>
					We and select companies may access and use your information for the below purposes. You may
					customize your choices below or continue using our site if you're OK with the purposes.
					</LocalLabel>
				</div>
				<div class={style.purposeItems}>
					{purposes.map((purposeItem, index) => (
						<div class={style.purposeItem}>
							<span class={style.purposeTitle}><LocalLabel localizeKey={`purposes.${index >= purposes.length ? 'customPurpose' : 'purpose'}${purposeItem.id}.menu`}>{purposeItem.name}</LocalLabel></span>
							<a class={style.learnMore} onClick={this.handlePurposeItemClick(purposeItem)}>
								<LocalLabel localizeKey='summary.detailLink'>Learn More & Set Preferences</LocalLabel>
							</a>
						</div>
					))}
				</div>
				<div class={detailsStyle.title}>
					<LocalLabel localizeKey='summary.who.title'>Who is using this information?</LocalLabel>
				</div>
				<div class={detailsStyle.description}>
					<LocalLabel localizeKey='summary.who.description'>
						We and pre-selected companies will use your information. You can see each company in
						the links above or
					</LocalLabel>&nbsp;
					<a onClick={onVendorListClick}><LocalLabel localizeKey='summary.who.link'>see the complete list here.</LocalLabel></a>
				</div>
				<div class={detailsStyle.title}>
					<LocalLabel localizeKey='summary.what.title'>What information is being used?</LocalLabel>
				</div>
				<div class={detailsStyle.description}>
					<LocalLabel localizeKey='summary.what.description'>
						Different companies use different information,
					</LocalLabel>&nbsp;
					<a onClick={onPurposeListClick}><LocalLabel localizeKey='summary.what.link'>see the complete list here.</LocalLabel></a>
				</div>
			</div>
		);
	}
}
