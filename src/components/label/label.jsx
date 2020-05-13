import { h, Component } from 'preact';
import { Localize } from '../../lib/localize';

const lookup = new Localize().lookup;

export default class Label extends Component {
	static defaultProps = {
		altLocalizeKey: '',
		prefix: '',
	};

	render(props, state) {
		const { altLocalizeKey, prefix, localizeKey, className, children } = props;
		const key = prefix ? `${prefix}.${localizeKey}` : localizeKey;
		const altKey = altLocalizeKey ? (prefix ? `${prefix}.${altLocalizeKey}` : altLocalizeKey) : '';
		const localizedContent = lookup(key) || (altKey ? lookup(altKey) : '');

		return (
			<span class={props.class || className} dangerouslySetInnerHTML={localizedContent && { __html: localizedContent }}>
				{!localizedContent && children}
			</span>
		);
	}
}
