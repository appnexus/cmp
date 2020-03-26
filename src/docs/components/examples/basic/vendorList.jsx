import Example from "../example";

const execute =
	`window.__tcfapi('getVendorList', 2, function (result, success) {
		if (success) {
			myLogger('getVendorList callback result:\\n' + JSON.stringify(result, null, 2));
		}
});`;

export default class VendorList extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Get Vendor List',
			execute,
		};
	}
}

