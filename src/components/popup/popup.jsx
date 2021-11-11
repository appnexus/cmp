import { h, Component } from 'preact';
import style from './popup.less';
import Intro from './intro/intro';
import Details from './details/details';
import Panel from '../panel/panel';
import { SECTION_DETAILS } from '../../lib/store';

export default class Popup extends Component {
	onAcceptAll = () => {
		const { store, onSave } = this.props;
		store.selectAllVendors(true);
		store.selectAllVendorLegitimateInterests(true);
		store.selectAllPurposes(true);
		store.selectAllPurposesLegitimateInterests(true);
		store.selectAllSpecialFeatureOptins(true);
		store.selectAllPublisherPurposes(true);
		store.selectAllPublisherLegitimateInterests(true);
		store.setAllContractPurposes(false);
		onSave();
	};

	onCancel = () => {
		this.props.store.updateSection();
	};

	handleShowDetails = () => {
		this.props.store.updateSection(SECTION_DETAILS);
	};

	handleCloseOrSave = () => {
		const { onSave } = this.props;
		onSave();
		this.onCancel();
	};

	render(props) {
		const { store } = props;
		const { isConsentToolShowing, section } = store;

		return (
			<div
				class={style.popup}
				style={{ display: isConsentToolShowing ? 'flex' : 'none' }}
			>
				<div
					class={style.overlay}
				/>
				<div class={style.content}>
					<Panel selectedIndex={section}>
						<Intro
							onAcceptAll={this.onAcceptAll}
							onShowPurposes={this.handleShowDetails}
						/>
						<Details
							onSaveOrClose={this.handleCloseOrSave}
							onCancel={this.onCancel}
							store={store}
							onAcceptAll={this.onAcceptAll}
						/>
					</Panel>
				</div>
			</div>
		);
	}
}
