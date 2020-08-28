/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-var */
/**
 * creates and manages global cmp and __tcfapi objects on window
 * cmp queues incoming requests
 * once loaded, cmp invokes cmp.processCommand()
 */
(function () {
	var log = function (shouldLog, msg) {
		return shouldLog && window.console && window.console.log && window.console.log(msg);
	};

	var cmpLoader = (function (cmp, __tcfapi) {
		var logging = 'logging',
			scriptSrc = 'scriptSrc',
			polyfillSrc = 'polyfillSrc',
			shouldPolyfill = !window.Promise || !window.fetch || !window.Symbol;

		function loadScript(src, done) {
			var js = document.createElement('script');
			js.src = src;
			js.onload = function () {
				done();
			};
			js.onerror = function () {
				done(new Error('Failed to load script ' + src));
			};
			document.head.appendChild(js);
		}

		return function () {
			// 2. create global cmp / __tcfapi request queues
			return (function (window, document, script, commandQueue, scriptEl, scriptParentEl) {
				var tcfToCmpMap = function (command, version, callback, parameter) {
					window[cmp].call(this, command, parameter, callback);
				};
				var cmpToTcfMap = function (command, parameter, callback) {
					window[__tcfapi].call(this, command, 2, callback || function () {}, parameter);
				};

				// remap tcfapi
				window[__tcfapi] = window[__tcfapi] || tcfToCmpMap;

				window[cmp] =
					window[cmp] ||
					function (command, parameter, callback) {
						// tcfAPI is loaded already
						if (window[__tcfapi] !== tcfToCmpMap) {
							// __tcfapi takes over here
							window[cmp] = cmpToTcfMap;
							return window[cmp].apply(this, arguments);
						}

						if (!command) {
							return;
						}

						(window[cmp][commandQueue] = window[cmp][commandQueue] || []).push({
							command,
							parameter,
							callback,
						});

						// if 'init', then we need to load the seed file
						if (command === 'init') {
							if (scriptEl) {
								return log(parameter[logging], 'CMP Error: Only call init once.');
							}
							if (!parameter || !parameter[scriptSrc]) {
								return log(
									parameter[logging],
									// eslint-disable-next-line quotes
									"CMP Error: Provide src to load CMP. cmp('init', { scriptSrc: './cmp.js'})"
								);
							}

							var loadCmp = function () {
								scriptEl = document.createElement(script);
								scriptEl.async = 1;
								scriptEl.src = parameter[scriptSrc];
								scriptParentEl = document.getElementsByTagName(script)[0];
								if (scriptParentEl && scriptParentEl.parentNode) {
									scriptParentEl.parentNode.insertBefore(scriptEl, scriptParentEl);
								} else {
									document.body.appendChild(scriptEl);
								}
							};

							if (!shouldPolyfill) {
								loadCmp();
							} else {
								// load polyfills
								var regex = new RegExp('[^/]+$');
								var pSrc = parameter[polyfillSrc] || parameter[scriptSrc].replace(regex, 'polyfills.js');
								if (!pSrc) {
									return log(
										parameter[logging],
										// eslint-disable-next-line quotes
										"CMP Error: Provide polyfillSrc to load CMP. cmp('init', { polyfillSrc: './polyfills.js'})"
									);
								}
								loadScript(pSrc, loadCmp);
							}
						}
					};
				// 4. return temporary cmp command queue
				return window[cmp];
			})(window, document, 'script', 'commandQueue');
		};
	})('cmp', '__tcfapi');

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = cmpLoader();
	} else if (typeof define === 'function' && define.amd) {
		define([], function () {
			return cmpLoader();
		});
	} else {
		cmpLoader();
	}
})();
