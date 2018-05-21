import { h, Component } from 'preact';
import style from './summary.less';
import detailsStyle from '../details.less';
import Label from "../../../label/label";

class SummaryLabel extends Label {
	static defaultProps = {
		prefix: 'summary'
	};
}
class PurposesLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

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
					<SummaryLabel localizeKey='title'>Learn more about how information is being used?</SummaryLabel>
				</div>
				<div class={detailsStyle.description}>
					<SummaryLabel localizeKey='description'>
					We and select companies may access and use your information for the below purposes. You may
					customize your choices below or continue using our site if you're OK with the purposes.
					</SummaryLabel>
				</div>
				<div class={style.purposeItems}>
					{purposes.map((purposeItem, index) => (
						<div class={style.purposeItem}>
							<span class={style.purposeTitle}><PurposesLabel localizeKey={`purpose${purposeItem.id}.menu`}>{purposeItem.name}</PurposesLabel></span>
							<a class={style.learnMore} onClick={this.handlePurposeItemClick(purposeItem)}>
								<SummaryLabel localizeKey='detailLink'>Learn More & Set Preferences</SummaryLabel>
							</a>
						</div>
					))}
				</div>
				<div class={detailsStyle.title}>
					<SummaryLabel localizeKey='who.title'>Who is using this information?</SummaryLabel>
				</div>
				<div class={detailsStyle.description}>
					<SummaryLabel localizeKey='who.description'>
						We and pre-selected companies will use your information. You can see each company in
						the links above or
					</SummaryLabel>&nbsp;
					<a onClick={onVendorListClick}><SummaryLabel localizeKey='who.link'>see the complete list here.</SummaryLabel></a>
				</div>
				<div class={detailsStyle.title}>
					<SummaryLabel localizeKey='what.title'>What information is being used?</SummaryLabel>
				</div>
				<div class={detailsStyle.description}>
					<SummaryLabel localizeKey='what.description'>
						Different companies use different information,
					</SummaryLabel>&nbsp;
					<a onClick={onPurposeListClick}><SummaryLabel localizeKey='what.link'>see the complete list here.</SummaryLabel></a>
				</div>
			</div>
		);
	}
}
