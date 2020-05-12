import { h, render } from 'preact';
import { buildScript } from '../docs/lib/stub';
import './style';

function init() {
	eval(buildScript({
		logging: 'debug',
		storePublisherData: true,
		globalVendorListLocation: './vendorlist.json'
	})); // eslint-disable-line no-eval

	let App = require('./components/app').default;
	render(<App />, document.body);
}

init();
