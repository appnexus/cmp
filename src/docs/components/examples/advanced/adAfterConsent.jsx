import Example from '../example';

const setup = `
myLogger('Add eventListener "onSubmit"');
window.__tcfapi('registerEventListener', 2, function(result){
	myLogger('Consent submitted, requesting ad...');
	var adFrame = document.createElement('iframe');
	adFrame.src = 'http://ib.adnxs.com/tt?id=1959558';
	var contentArea = document.getElementById('MyContentArea');
	contentArea.innerHTML = '';
	contentArea.appendChild(adFrame);
}, {event: 'onSubmit'});
`;

const execute =
	`
myLogger('Requesting consent');
window.__tcfapi('showConsentTool', 2, function () {});
`;

export default class ConsentData extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Load Ad After Consent',
			setup,
			execute,
			hasContent: true
		};
	}
}
