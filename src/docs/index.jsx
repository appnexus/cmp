import { h, render } from 'preact';
import { buildScript } from '../docs/lib/dropscript';
import './style';


function init() {
	eval(buildScript({ logging: 'debug' })); // eslint-disable-line no-eval

	let App = require('./components/app').default;
	render(<App />, document.body);
}

init();
