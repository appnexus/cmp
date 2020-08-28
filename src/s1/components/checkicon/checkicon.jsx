import { h, Component } from 'preact';

export default class CheckIcon extends Component {

	static defaultProps = {
	};


	render(props) {
		return (
			<svg width='20' height='20' viewBox='0 0 16 16' fill='green'>
				<path d="M11.92 5.19c.285.284.285.748 0 1.032l-4.932 4.98c-.285.286-.748.286-1.033 0L3.47 8.85c-.286-.287-.286-.748 0-1.034l.287-.343c.285-.286.747-.286 1.033 0l1.747 1.614 4.13-4.127c.284-.285.748-.285 1.033 0l.22.23z" />
			</svg>
		);
	}
}
