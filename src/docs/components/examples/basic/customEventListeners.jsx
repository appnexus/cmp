import Example from "../example";

const execute =
`myLogger('Add custom eventListener "isLoaded"');
window.__tcfapi('registerEventListener', 2, function (result) {
	myLogger('Event "isLoaded" called: ' + JSON.stringify(result));
}, {event: 'isLoaded'});

myLogger('Add custom eventListener "cmpReady"');
window.__tcfapi('registerEventListener', 2, function (result) {
	myLogger('Event "cmpReady" called: ' + JSON.stringify(result));
}, {event: 'cmpReady'});

myLogger('Add custom eventListener "openConsentTool"');
window.__tcfapi('registerEventListener', 2, function (result) {
	myLogger('Event "openConsentTool" called: ' + JSON.stringify(result));
}, {event: 'openConsentTool'});

myLogger('Add custom eventListener "onSubmit"');
window.__tcfapi('registerEventListener', 2, function (result) {
	myLogger('Event "onSubmit" called: ' + JSON.stringify(result));
}, {event: 'onSubmit'});
`;

export default class CustomEventListeners extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Custom Event Listeners',
			execute
		};
	}
}
