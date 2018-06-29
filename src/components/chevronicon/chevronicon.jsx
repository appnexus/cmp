import { h, Component } from 'preact';

export default class ChevronIcon extends Component {

	static defaultProps = {
	};


	render(props) {
		const {color} = props;
		return (
			<svg width='16' height='16' viewBox='0 0 16 16' class={props.class} style={{fill: color}}>
				<path d="M12.293 5.293l1.414 1.414-5 5c-.39.39-1.024.39-1.414 0l-5-5 1.414-1.414L8 9.586l4.293-4.293z" />
			</svg>
		);
	}
}
