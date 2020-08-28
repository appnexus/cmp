import { h, Component, createRef } from 'preact';

export default class Label extends Component {
	ref = createRef();

	static defaultProps = {
		altLocalizeKey: '',
		prefix: '',
	};

	hookClickHandler() {
		const { onClick } = this.props;
		if (onClick && this.ref.current) {
			const a = this.ref.current.querySelector('a');
			if (!a || a === this.hooked) {
				return;
			}

			if (this.hooked) {
				this.hooked.removeEventListener('click', onClick);
			}

			this.hooked = a;
			this.hooked.addEventListener('click', onClick);
		}
	}

	componentDidMount() {
		this.hookClickHandler();
	}

	componentDidUpdate() {
		this.hookClickHandler();
	}

	componentWillUnmount() {
		const { onClick } = this.props;
		if (onClick && this.hooked) {
			this.hooked.removeEventListener('click', onClick);
			this.hooked = null;
		}
	}

	render(props) {
		const { prefix, localizeKey, className, children, translations = {} } = props;
		const key = prefix ? `${prefix}.${localizeKey}` : localizeKey;
		// 1. get translation from custom translations
		let localizedContent = translations[key];
		return (
			<span
				class={props.class || className}
				ref={this.ref}
				dangerouslySetInnerHTML={localizedContent && { __html: localizedContent }}
			>
				{!localizedContent && children}
			</span>
		);
	}
}
