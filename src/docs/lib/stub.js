
function buildScript(config, cmpLocation='../cmp.bundle.js') {
	return `(function(window, document) {
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
