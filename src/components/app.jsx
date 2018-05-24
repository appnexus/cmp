import { h, Component } from 'preact';
import style from './app.less';

import Popup from './popup/popup';
import Banner from './banner/banner';

export default class App extends Component {
	state = {
		store: this.props.store
	};

	onSave = () => {
		const { store, notify } = this.props;
		store.persist();
		notify('onSubmit');
		store.toggleConsentToolShowing(false);
	};


	updateState = (store) => {
		this.setState({ store });
	};

	componentWillMount() {
		const { store } = this.props;
		store.subscribe(this.updateState);
	}

	render(props, state) {

		const {
			store,
		} = state;

		const {
			isModalShowing,
			isBannerShowing,
			toggleModalShowing,
			theme
		} = store;

		return (
			<div class={style.gdpr}>
				<Banner isShowing={isBannerShowing}
						isModalShowing={isModalShowing}
						onSave={this.onSave}
						onShowModal={toggleModalShowing}
						theme={theme}
				/>
				<Popup store={store}
					   onSave={this.onSave}
					   theme={theme}
				/>
			</div>
		);
	}
}
