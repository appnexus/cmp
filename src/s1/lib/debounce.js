/**
 * lodash.debounce is 1kb gzipped, this saves us 1kb
 */
const cache = {};
const debounce = (fn, delay) => {
	return () => {
		if (cache[fn]) {
			clearTimeout(cache[fn]);
		}
		cache[fn] = setTimeout(() => {
			fn();
			delete cache[fn];
		}, delay);
	};
};
debounce.clear = () => {
	Object.keys(cache).forEach((key) => {
		clearTimeout(cache[key]);
		delete cache[key];
	});
};

export default debounce;
