import { h, Component } from 'preact';
import style from './app.less';
import { sendPortalCommand } from '../lib/portal';
import Popup from './popup/popup';
import Footer from './footer/footer';

export default class App extends Component {
	state = {
		store: this.props.store
	};

	onSave = () => {
		const { store, notify } = this.props;
		store.persist();
		// Fetch all information we need from the cookie
		sendPortalCommand({
			command: 'readVendorConsent',
		}).then(result => {
			console.log('Read consent data from global cookie', result);
			window.location = `consent://${result}`;
		}).catch(err => {
			log.error('Failed reading global vendor consent cookie', err);
		});
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
				<Footer store={store} />
			</div>
		);
	}
}
