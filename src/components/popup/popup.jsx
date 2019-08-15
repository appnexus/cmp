import { h, Component } from 'preact';
import style from './popup.less';
import Details from './details/details';
import CloseButton from '../closebutton/closebutton';

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

	render(props, state) {
		const {
			store,
			onSave,
			theme,
			onChangeDetailsPanel,
			onSelectPurpose,
			selectedDetailsPanelIndex,
			selectedPurposeDetails,
		} = props;
		const {overlayBackground, secondaryColor, backgroundColor} = theme;
		const {isModalShowing, vendorConsentData} = store;

		return (
			<div
				class={style.popup}
				style={{display: isModalShowing ? 'flex' : 'none'}}
			>
				<div
					class={style.overlay}
					style={{background: overlayBackground}}
					onClick={this.handleClose}
				/>
				{isModalShowing ?
					<div class={style.content}>
						<CloseButton onClick={this.handleClose} stroke={secondaryColor} fill={backgroundColor} />
						<Details
							onSave={onSave}
							store={store}
							onClose={this.handleClose}
							onChangeDetailsPanel={onChangeDetailsPanel}
							onSelectPurpose={onSelectPurpose}
							selectedPanelIndex={selectedDetailsPanelIndex}
							selectedPurposeDetails={selectedPurposeDetails}
							theme={theme}
						/>
					</div> : null
				}
			</div>
		);
	}
}
