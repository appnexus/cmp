import Example from '../example';

const setup = `
myLogger('Add eventListener "onSubmit"');
window.__tcfapi('registerEventListener', 2, function (result) {
	myLogger('Consent submitted');
	inspectVendorConsents();
}, {event: 'onSubmit'});

function inspectVendorConsents() {
	myLogger('Request vendor consents');
	window.__tcfapi('getTCData', 2, function (tcData, success) {
		// Determine when the cookie information was first written
		if (success && tcData.eventStatus === 'useractioncomplete') {
			myLogger('Consents was persisted before');
			var vendors = tcData.vendor.consents;
			var allowed = 0;
			var total = 0;
			var key;
			for (key in vendors) {
				if (vendors.hasOwnProperty(key)) {
					if (vendors[key] === true) {
						allowed++;
					}
					total++;
				}
			}
			myLogger('Allowed vendor count: ' + allowed + ', Disallowed vendor count: ' + (total - allowed));
		} else {
			myLogger('Consents have never been persisted');
		}
		// Show the consent tool
		myLogger('Show consent tool');
	});
}
inspectVendorConsents();
`;

const execute =
	`
window.__tcfapi('showConsentTool', 2, function () {});
`;

export default class InspectVendorData extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Inspect Existing Vendor Consent Information',
			setup,
			execute
		};
	}
}
