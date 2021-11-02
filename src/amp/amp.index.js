function getQueryParams() {
	const t = window.location.search.substr(1);
	const testSiteSplit = t.split("&");
	const queryParams = {};
	for (let i = 0; i < testSiteSplit.length; i++) {
		const value = testSiteSplit[i].split("=");
		queryParams[value[0]] = value[1];
	}
	return queryParams;
}

const queryParams = getQueryParams();

const target = queryParams['test_site'] || 'NATIVE_APP';

window.dlApi = {
	target: target + '/CMP',
	no_gemius: 1,
	async: 1,
	cmd: [dlApi => {
		dlApi.uaEvent(dlApi.appUserId || '', 'consent_start');

		window.__tcfapi('registerEventListener', 2, () => {
			dlApi.getConsents((err, consent) => {
				let payload = {
					action: 'reject',
					type: 'consent-response',
				};

				if (!err) {
					payload.action = 'accept';
					payload.info = consent.euConsent;
				}
				window.parent.postMessage(payload, '*');
			});
		}, {event: 'onSubmit'});
	}],
	noDot: 1,
	perfSent: 1,
	noDfp: 1,
	cmpGvlAntiCache: 1,
	forceCmp: true
};

const m = location.pathname.match(/^\/(\d+)\//);
if (m) {
	const nid = m[1];
	window.dlApi.tid = 'EA-' + nid;
}

const tcfV1Api = function (dlApi, command, params, callback) {
	if (command !== 'addEventListener') {
		window.dlApi.logError('__cmp Api does not support the ' + command + ' command', 'tcfv1-api');
		return;
	}

	window.__tcfapi('registerEventListener', 2, callback, {event: params});
};

window.dlApi.cmd.push(dlApi => {
	if (!window.__cmp) {
		window.__cmp = tcfV1Api.bind(null, dlApi);
	}
});

const initialHeight = queryParams['amp_modal_height'] || '60vh';
window.dlApi.cmd.push(dlApi => {
	dlApi.showConsentTool();
	window.parent.postMessage({
		type: 'consent-ui',
		action: 'ready',
		initialHeight,
		border: false
	}, '*');
});

const script = document.createElement('script');
script.src = "https://lib.onet.pl/s.csr/build/dlApi/dl.boot.min.js";
document.body.appendChild(script);
