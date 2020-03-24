import Example from "../example";

const setup =
`myLogger('Add eventListener');
window.__tcfapi('addEventListener', 2, function (tcData, success) {
	if (success && tcData.eventStatus === 'tcloaded') {
		myLogger('Event status is ' + JSON.stringify(tcData.eventStatus));
	}
});
`;

export default class EventListeners extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Event Listeners',
			setup
		};
	}
}
