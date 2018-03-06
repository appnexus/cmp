import { h, Component } from 'preact';
import style from './app.less';
import { readVendorConsentCookie, readPublisherConsentCookie } from '../lib/cookie/cookie';
import { sendPortalCommand } from '../lib/portal';
import Popup from './popup/popup';

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
			// if (result) {
			// 	return decodeVendorConsentData(result);
			// }
			// Sends Base64 code to custom native URL
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'consent://' + result, true);
			xhr.onload = function () {
				console.log('finish!');
				// Request finished. Do processing here.
			};
			xhr.send(null);
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
			</div>
		);
	}
}
