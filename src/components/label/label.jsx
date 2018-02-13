import { h, Component } from 'preact';
import Localize from '../../lib/localize';

export default class Label extends Component {
	static defaultProps = {
		prefix: ''
	};

	render(props, state) {
		const { prefix, localizeKey, className, children } = props;
		const key = [prefix, localizeKey].join('.');

		return (
			<span class={props.class || className}>{Localize.lookup(key) || children}</span>
		);
	}
}
