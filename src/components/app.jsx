import { h, Component } from 'preact';
import style from './app.less';
import config from "../lib/config";

import Popup from './popup/popup';
import Footer from './footer/footer';

export default class App extends Component {
	state = {
		store: this.props.store
	};

	onSave = () => {
		const { store, notify } = this.props;
		const { shouldDisplayFooter } = config;
		store.persist();
		notify('onSubmit');
		store.toggleConsentToolShowing(false);
		if (typeof shouldDisplayFooter === 'function') {
			shouldDisplayFooter(shouldDisplay => store.toggleFooterShowing(shouldDisplay));
		} else {
			store.toggleFooterShowing(false);
		}
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

		return (
			<div class={style.gdpr}>
				<Popup store={store}
					   onSave={this.onSave}
				/>
				<Footer store={store} />
			</div>
		);
	}
}
