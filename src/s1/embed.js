/**
 * creates and manages global cmp and __cmp objects on window
 * cmp queues incoming requests
 * once loaded, cmp invokes cmp.processCommand()
 */
(function() {
	let cmpShim = (function(cmp, __cmp) {
		return function(scriptSrc) {
			// 1. already exists, start queueing requests
			if (window[cmp] && window[__cmp]) {
				window[cmp].loaded = true;
				window[cmp] = window[__cmp];
				return window[cmp];
			}

			// 2. create global cmp / __cmp request queues
			return (function(window, document, script, commandQueue, scriptEl, scriptParentEl) {
				window[__cmp] = window[cmp] = window[cmp] ||
					function(command, parameter, callback) {
						if (window[__cmp] !== window[cmp]) { // __cmp takes over here
							window[__cmp].loaded = true;
							window[cmp] = window[__cmp];
							return window[cmp].apply(this, arguments);
						}

						// initialization is done update processCommand
						if (window[cmp]["processCommand"] && typeof window[cmp]["processCommand"] === "function") {
							window[cmp]["processCommand"].apply(this, arguments);
						} else {
							(window[cmp][commandQueue] = window[cmp][commandQueue] || []).push({
								command,
								parameter,
								callback
							});
						}
					};

				// 3. load cmp if script inlined
				if (scriptSrc) {
					(scriptEl = document.createElement(script)),
					(scriptParentEl = document.getElementsByTagName(script)[0]);
					scriptEl.async = 1;
					scriptEl.src = scriptSrc;
					scriptParentEl.parentNode.insertBefore(scriptEl, scriptParentEl);
				}

				// 4. return temporay cmp command queue
				return window[cmp];
			})(window, document, 'script', 'commandQueue');
		};
	})('cmp', '__cmp');

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = cmpShim();
	} else if (typeof define === 'function' && define.amd) {
		define([], () => {
			return cmpShim();
		});
	} else {
		cmpShim('./s1.cmp.bundle.js'); // External script defined here for ease of use
	}
})();
