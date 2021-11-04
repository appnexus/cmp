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

const target = queryParams['test_site'] || 'AMP_WEBSITE';

window.dlApi = {
	target: target + '/CMP',
	no_gemius: 1,
	async: 1,
	cmd: [dlApi => {
		let payload = {
			action: 'reject',
			type: 'consent-response',
		};

		if (typeof window.__tcfapi !== 'function') {
			window.parent.postMessage(payload, '*');
			return
		}

		window.__tcfapi('addEventListener', 2, (tcData, success) => {
			if (success && tcData.eventStatus === 'useractioncomplete') {
				payload.action = 'accept';
				payload.info = tcData.tcString;
				window.parent.postMessage(payload, '*');
			}
		});
	}],
	noDot: 1,
	perfSent: 1,
	noDfp: 1,
	cmpGvlAntiCache: 1,
	forceCmp: true
};

const m = location.pathname.match(/^\/(\d+)\//);
if (m) {
	window.dlApi.tid = `EA-${m[1]}`;
	window.dlApi.cmpTid = `EA-${m[1]}`;
}

window.dlApi.cmd.push(dlApi => {
	const initialHeight = queryParams['amp_modal_height'] || '60vh';
	dlApi.showConsentTool('', () => {
		window.parent.postMessage({
			type: 'consent-ui',
			action: 'ready',
			initialHeight,
			border: false
		}, '*');
	});
});

const script = document.createElement('script');
script.src = "https://lib.onet.pl/s.csr/build/dlApi/dl.boot.min.js";
document.body.appendChild(script);
