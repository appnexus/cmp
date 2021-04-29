export function fetch(url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = () => {
			if (xhr.readyState === xhr.DONE) {
				if (xhr.status === 404) {
					reject(new TypeError('Not found'));
				}
			}
			resolve({
				json: () => JSON.parse(xhr.responseText)
			});
		};
		xhr.onerror = () => {
			reject(new TypeError('Network request failed'));
		};
		xhr.ontimeout = () => {
			reject(new TypeError('Network request failed'));
		};
		xhr.open('GET', url, true);
		xhr.send(null);
	});
}
