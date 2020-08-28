import { h, Component } from 'preact';

export default class ExternalLinkIcon extends Component {

	static defaultProps = {
	};


	render(props) {

		const {
			color
		} = props;

		return (
			<svg width='16' height='16' viewBox='0 0 16 16' class={props.class} fill={color}>
				<path d="M14 8h-1.28l.003-3.64-4.414 4.414c-.3.298-.783.298-1.082 0-.3-.3-.3-.784 0-1.082l4.414-4.417L8 3.267V2s4.646.002 4.646.004c.623-.05 1.012.337 1.012.337s.393.39.342 1.013c.003 0 0 4.647 0 4.647zm-1 4.75c0 .138-.112.25-.25.25h-9.5c-.138 0-.25-.112-.25-.25v-9.5c0-.138.112-.25.25-.25H7V2H3.25C2.56 2 2 2.56 2 3.25v9.5c0 .69.56 1.25 1.25 1.25h9.5c.69 0 1.25-.56 1.25-1.25V9h-1v3.75z" />
			</svg>
		);
	}
}
