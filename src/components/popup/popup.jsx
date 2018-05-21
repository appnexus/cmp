import { h, Component } from 'preact';
import style from './popup.less';
import Details from './details/details';


export default class Popup extends Component {

	handleClose = () => {
		const {store} = this.props;
		store.toggleModalShowing(false)
	};

	render(props, state) {
		const {store, onSave, theme} = props;
		const {isModalShowing} = store;

		return (
			<div
				class={style.popup}
				style={{display: isModalShowing ? 'flex' : 'none'}}
			>
				<div
					class={style.overlay}
					style={{background: theme.overlayBackground}}
					onClick={this.handleClose}
				/>
				<div class={style.content}>
					<Details
						onSave={onSave}
						store={store}
						onClose={this.handleClose}
						theme={theme} />
				</div>
			</div>
		);
	}
}
