import Example from "../example";

const setup =
`myLogger('Add eventListener "isLoaded"');
window.__cmp('addEventListener', 'isLoaded', function(result){
	myLogger('Event "isLoaded" called: ' + JSON.stringify(result));
});

myLogger('Add eventListener "onSubmit"');
window.__cmp('addEventListener', 'onSubmit', function(result){
	myLogger('Event "onSubmit" called' + JSON.stringify(result));
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
