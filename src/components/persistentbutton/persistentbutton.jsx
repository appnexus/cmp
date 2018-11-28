import { h, Component } from 'preact';
import Label from '../label/label';
import style from './persistentbutton.less';
import ConfigIcon from '../configicon/configicon';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'persistentbutton'
	};
}

export default class PersistentButton extends Component {

	constructor(props) {
		super(props);
	}

	static defaultProps = {
		onClick: () => {},
	};

	handleLearnMore = () => {
		this.props.onClick(true);
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.isSelected !== this.props.isSelected;
	};

	render(props) {
		const {
			theme
		} = props;

		return (
			<span onClick={this.handleLearnMore} class={style.persistent_link} >
			<ConfigIcon />
			<LocalLabel localizeKey='title'>Privacy Policy</LocalLabel>
			</span>
		);
	}
}
