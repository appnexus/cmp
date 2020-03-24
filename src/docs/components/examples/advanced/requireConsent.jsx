import Example from '../example';

const setup = `
myLogger('Add eventListener "onSubmit"');
window.__tcfapi('registerEventListener', 2, function (result) {
	myLogger('Consent submitted');
	window.__tcfapi('getTCData', 2, function (tcData, success) {
		if (success && tcData.vendor.consents['1'] === true) {
			myLogger('Received consent for vendor ID: 1');
		} else {
			myLogger('Did NOT receive consent for vendor ID: 1');
		}
	}, [1,2,3]);
}, { event: 'onSubmit' });
`;

const execute =
	`
window.__tcfapi('getTCData', 2, function (tcData, success) {
	// Determine if we want to show the consent tool
	// if (success && tcData.vendor.consents['1'] === true)

	myLogger('Requesting consent');
	window.__tcfapi('showConsentTool', 2, function () {});
}, [1,2,3]);
`;

export default class ConsentData extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Require Consent For Vendor',
			setup,
			execute
		};
	}
}
