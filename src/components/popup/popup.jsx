import { h, Component } from 'preact';
import style from './popup.less';
import Intro from './intro/intro';
import Details from './details/details';
import Panel from '../panel/panel';


const SECTION_INTRO = 0;
const SECTION_DETAILS = 1;

export default class Popup extends Component {
	state = {
		selectedPanelIndex: SECTION_INTRO,
		isDetailViewAsDefault: false
	};

	componentWillReceiveProps(newProps) {
		if (newProps.store.isDetailViewAsDefault !== this.state.isDetailViewAsDefault) {
			this.setState({
				selectedPanelIndex: newProps.store.isDetailViewAsDefault ? SECTION_DETAILS : SECTION_INTRO,
				isDetailViewAsDefault: newProps.store.isDetailViewAsDefault
			});
		}
	}

	onAcceptAll = () => {
		const { store, onSave } = this.props;
		store.selectAllVendors(true);
		store.selectAllPurposes(true);
		store.selectAllCustomPurposes(true);
		onSave();
	};

	onCancel = () => {
		this.setState({
			selectedPanelIndex: SECTION_INTRO
		});
	};

	handleShowDetails = () => {
		this.setState({
			selectedPanelIndex: SECTION_DETAILS
		});
	};

	handleCloseOrSave = () => {
		const { store, onSave } = this.props;
		onSave();
		this.onCancel()
	};

	render(props, state) {
		const { store } = props;
		const { selectedPanelIndex } = state;
		const { isConsentToolShowing } = store;

		return (
			<div
				class={style.popup}
				style={{ display: isConsentToolShowing ? 'flex' : 'none' }}
			>
				<div
					class={style.overlay}
				/>
				<div class={style.content}>
					<Panel selectedIndex={selectedPanelIndex}>
						<Intro
							onAcceptAll={this.onAcceptAll}
							onShowPurposes={this.handleShowDetails}
						/>
						<Details
							onSaveOrClose={this.handleCloseOrSave}
							onCancel={this.onCancel}
							store={this.props.store}
						/>
					</Panel>
				</div>
			</div>
		);
	}
}
