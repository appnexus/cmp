import { h, Component } from 'preact';
import { translations } from '../../lib/translations';

const lookup = translations.lookup;

export default class Label extends Component {
	static defaultProps = {
		prefix: ''
	};

	render(props) {
		const { prefix, localizeKey, className, children, collapseEmpty = false } = props;
		const key = prefix ? `${prefix}.${localizeKey}` : localizeKey;
		const localizedContent = lookup(key);
		let style = '';
		if (!localizedContent && collapseEmpty) {
			style = 'display: none';
		}

		return (
			<span
				style={style}
				class={props.class || className}
				dangerouslySetInnerHTML={localizedContent && {__html: localizedContent}}>
				{!localizedContent && children}
			</span>
		);
	}
}
