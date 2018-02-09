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
			isDisabled
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
				<span className={style.visualizationContainer} />
				<span className={style.visualizationGlow} />
				<span className={style.visualizationHandle} />
			</span>
		);
	}
}
