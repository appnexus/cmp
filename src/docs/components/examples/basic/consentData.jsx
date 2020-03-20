import Example from '../example';

const execute =
`window.__tcfapi('getTCData', 2, function (tcData, success) {
	if (success) {
		myLogger('getTCData callback result: ' + JSON.stringify(tcData));
	}
});`;

export default class ConsentData extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Get Consent Data',
			execute,
		};
	}
}
