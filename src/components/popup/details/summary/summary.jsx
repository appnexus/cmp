import { h, Component } from 'preact';
import style from './summary.less';
import detailsStyle from '../details.less';
import Button from '../../../button/button';

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
		}
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
						Learn more about how your information is used.
					</div>
					<div class={detailsStyle.description}>
						We and pre-selected companies may access and use your information for the following purposes. You can
						customize your choices below, and continue using our site if you consent to the use of your data for these purposes.
					</div>
					<div class={style.purposeItems}>
						{purposes.map(purposeItem => (
							<div class={style.purposeItem}>
								<span class={style.purposeTitle}>{purposeItem.name}</span>
								<a class={style.learnMore} onClick={this.handlePurposeItemClick(purposeItem)}>Learn More & Set Preferences</a>
							</div>
						))}
					</div>
					<div class={detailsStyle.title}>
						Who is using this information?
					</div>
					<div class={detailsStyle.description}>
						We and pre-selected companies will use your information. You can <a onClick={onVendorListClick}>see the complete list here.</a>
					</div>
					<div class={detailsStyle.title}>
						What information is being used?
					</div>
					<div class={detailsStyle.description}>
						Different companies use different information, <a onClick={onPurposeListClick}>see the complete list here.</a>
					</div>
				</div>
			);
		}
	}
