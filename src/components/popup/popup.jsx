import { h, Component } from 'preact';
import style from './popup.less';
import Intro from './intro/intro';
import Details from './details/details';
import Panel from '../panel/panel';


const SECTION_INTRO = 0;
const SECTION_DETAILS = 1;

export default class Popup extends Component {
	state = {
		selectedPanelIndex: SECTION_INTRO
	};

	onAcceptAll = () => {
		const { store, onSave } = this.props;
		store.selectAllVendors(true);
		store.selectAllPurposes(true);
		store.selectAllCustomPurposes(true);
		onSave();
	};

	onRejectAll = () => {
		const { store, onSave } = this.props;
		store.selectAllVendors(false);
		store.selectAllPurposes(false);
		store.selectAllCustomPurposes(false);
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

	render(props, state) {
		const { store } = props;
		const {selectedPanelIndex} = state;
		const { isConsentToolShowing } = store;

		return (
			<div class={style.overlay} style={{ display: isConsentToolShowing ? 'flex' : 'none' }}>
				<div class={style.content}>
					<Panel selectedIndex={selectedPanelIndex}>
						<Intro
							onAcceptAll={this.onAcceptAll}
							onRejectAll={this.onRejectAll}
							onShowPurposes={this.handleShowDetails}
						/>
						<Details
							onSave={this.props.onSave}
							onCancel={this.onCancel}
							store={this.props.store} />
					</Panel>
				</div>
			</div>
		);
	}
}
