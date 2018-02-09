import { h, Component } from 'preact';
import style from './app.less';

import Popup from './popup/popup';

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

		return (
			<div class={style.gdpr}>
				<Popup store={store}
					   onSave={this.onSave}
				/>
			</div>
		);
	}
}
