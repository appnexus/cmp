import { h, Component } from 'preact';
import style from './switch.less';

export default class Switch extends Component {

	static defaultProps = {
		onClick: () => {},
	};

	handleClicked = () => {
		const { onClick, dataId, isSelected } = this.props;
		onClick({dataId, isSelected: !isSelected});
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.isSelected !== this.props.isSelected;
	};

	render(props) {
		const {
			isSelected,
			isDisabled,
			backgroundColor
		} = props;

		return (
			<span
				class={[style.switch, props.class, isSelected ? style.isSelected : ''].join(' ')}
				onClick={this.handleClicked}
			>
				<input
					checked={isSelected}
					className={style.native}
					disabled={isDisabled}
					type='checkbox'
				/>
				<span class={style.visualizationContainer} />
				<span class={style.visualizationGlow} />
				<span class={style.visualizationHandle} />
			</span>
		);
	}
}
