import { h, Component } from 'preact';
import style from './popup.less';
import Details from './details/details';


export default class Popup extends Component {

	componentDidMount = () => {
		document.onkeydown = this.onKeyDown;
	}

	componentWillUnmount = () => {
		document.onkeydown = null;
	}

	onKeyDown = (evt) => {
		evt = evt || window.event;
		const {key = '', keyCode = ''} = evt;
		const isEscape = (key === 'Escape' || key === 'Esc' || keyCode === 27);
		if (isEscape) {
			this.handleClose();
		}
	}

	handleClose = () => {
		const {store} = this.props;
		store.toggleModalShowing(false);
	};

	render(props) {
		const {store, onSave} = props;
		const {isModalShowing} = store;

		return (
			<div
				class={style.popup}
				style={{display: isModalShowing ? 'flex' : 'none'}}
			>
				<div
					class={style.overlay}
					onClick={this.handleClose}
				/>
				<div class={style.content}>
					<Details
						onSave={onSave}
						store={store}
						onClose={this.handleClose} />
				</div>
			</div>
		);
	}
}
