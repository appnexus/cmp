import 'core-js/fn/array/find-index';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/from';
import 'core-js/fn/array/find';
import 'core-js/fn/array/map';
import 'core-js/fn/array/includes';
import 'core-js/fn/object/keys';
import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import 'core-js/fn/array/find-index';
import 'core-js/fn/symbol';
import 'core-js/fn/number/is-integer';
import 'core-js/fn/set';
import 'core-js/fn/string/repeat';
import 'core-js/fn/map';
import 'whatwg-fetch';

// polyfill for custom event dispatchEvent
(function () {
	if (typeof window.CustomEvent === 'function') return false;

	function CustomEvent(event, params) {
		const evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, false, false, params || {});
		return evt;
	}

	window.CustomEvent = CustomEvent;
})();
