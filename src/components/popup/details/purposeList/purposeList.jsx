import { h, Component } from 'preact';
import style from './purposeList.less';
import detailsStyle from '../details.less';
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

export default class PurposeList extends Component {

	static defaultProps = {
		onBack: () => {},
	};

	render(props, state) {
		const {
			onBack,
			theme,
		} = props;

		return (
			<div class={style.purposeList}>
				<div class={style.header}>
					<div class={detailsStyle.title} style={{color: theme.text}}>
						<LocalLabel localizeKey='title'>What information is being used?</LocalLabel>
					</div>
				</div>
				<div class={detailsStyle.description} style={{color: theme.textLight}}>
					<LocalLabel localizeKey='description'>Below is a complete list of the information that may be gathered.</LocalLabel>
				</div>
				<div class={style.infoItems}>
					<LocalLabel localizeKey='items'>
						<ul>
							<li>Type of browser and its settings</li>
							<li>Information about the device's operating system</li>
							<li>Cookie information</li>
							<li>Information about other identifiers assigned to the device</li>
							<li>The IP address from which the device accesses a client's website or mobile application</li>
							<li>Information about the user's activity on that device, including web pages and mobile apps visited or used</li>
							<li>Information about the geographic location of the device when it accesses a website or mobile application</li>
						</ul>
					</LocalLabel>
				</div>
				<a onClick={onBack} style={{color: theme.textLink}}>><LocalLabel localizeKey='back'>Customize how this data is used from the previous page</LocalLabel></a>
			</div>
		);
	}
}
