
function buildScript(config, cmpLocation='../cmp.bundle.js') {
	return `(function(window, document) {
			(function() {
				window.__tcfConfig = ${config ? JSON.stringify(config) : `{
					//
					// Modify config values here
					//
					// globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
					// customPurposeListLocation: './purposes.json',
					// globalConsentLocation: './portal.html',
					// storeConsentGlobally: false,
					// storePublisherData: false,
					// logging: 'debug',
					// localization: {},
					// forceLocale: 'en-us'
				}`}
			})();

			var t = document.createElement('script');
			t.async = false;
			t.src = '${cmpLocation}';
			var tag = document.getElementsByTagName('head')[0];
			tag.appendChild(t);
	})(window, document);`;
}

export {
	buildScript,
};
