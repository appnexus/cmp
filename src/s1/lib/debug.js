let isDebugEnabled = false;

const debug = (...args) => {
	if (isDebugEnabled && window && window.console && typeof console !== 'undefined') {
		console.log('CMP:', ...args);
	}
};

Object.defineProperty(debug, 'isEnabled', {
	get: function isEnabled() {
		return isDebugEnabled;
	},
	set: function isEnabled(isEnabled) {
		isDebugEnabled = isEnabled;
	},
});

export default debug;
