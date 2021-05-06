import { h, Component } from 'preact';

export default class Selectize extends Component {
	getOptions() {
		return this.props.options.map(opt => {
			const isSelected = this.props.selected === opt;
			return (<option value={opt} selected={isSelected} className={isSelected ? 'selected' : 'unselected'}>{opt}</option>);
		});
	}

	render(props) {
		const { selected, onChange, classNames } = props;
		return (
			<select class={classNames} onChange={event => onChange(event)} value={selected}>
				{this.getOptions()}
			</select>
		);
	}
}
