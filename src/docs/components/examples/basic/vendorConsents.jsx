import Example from "../example";

const execute =
	`window.__cmp('getVendorConsents', null, function(result){
	myLogger('getVendorConsents callback result:\\n' + JSON.stringify(result, null, 2));
});`;

export default class VendorConsents extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Get Vendor Consents',
			execute,
		};
	}
}

