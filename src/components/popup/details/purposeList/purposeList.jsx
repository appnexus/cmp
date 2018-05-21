import { h, Component } from 'preact';
import style from './purposeList.less';
import detailsStyle from '../details.less';

const infoItems = [
	'Type of browser and its settings',
	`Information about the device's operating system`,
	'Cookie information',
	'Information about other identifiers assigned to the device',
	`The IP address from which the device accesses a client's website or mobile application`,
	`Information about the user's activity on that device, including web pages and mobile apps visited or used`,
	`Information about the geographic location of the device when it accesses a website or mobile application`
];

export default class PurposeList extends Component {

	static defaultProps = {
		onBack: () => {},
	};

	render(props, state) {
		const {
			onBack
		} = props;

		return (
			<div class={style.purposeList}>
				<div class={style.header}>
					<div class={detailsStyle.title}>
						What information is being used?
					</div>
				</div>
				<div class={detailsStyle.description}>
					Below is a complete list of the information that may be gathered.
				</div>
				<ul class={style.infoItems}>
					{infoItems.map(item => (
						<li class={style.infoItem}>{item}</li>
					))}
				</ul>
				<a onClick={onBack}>Customize how this data is used from the previous page</a>
			</div>
		);
	}
}
