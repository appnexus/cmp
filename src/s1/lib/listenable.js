let GUID = 0;
let listeners = {};

function emit(eventType, payload) {
	Object.keys(listeners)
		.map((id) => listeners[id])
		.forEach((listener) => {
			if (listener.type !== eventType) return;
			const callback = listener.callbackWithOff || listener.callback;
			try {
				if (listener.context) {
					callback.apply(listener.context, [payload, eventType]);
				} else {
					callback(payload, eventType);
				}
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error('event handler: ', e);
			}
		});
}

function on(eventType, callback, context, callbackWithOff) {
	GUID += 1;
	const id = GUID.toString();

	listeners[id] = {
		listenerId: id,
		type: eventType,
		context,
		callback,
		callbackWithOff,
	};

	return Number(id);
}

function off(listenerIdOrType, callback) {
	const id = listenerIdOrType.toString();
	if (listeners[id]) {
		delete listeners[id];
	} else {
		Object.keys(listeners)
			.filter((listenerId) => {
				const listener = listeners[listenerId];
				return listener.type === id && (!callback || listener.callback === callback);
			})
			.forEach((idToRemove) => {
				delete listeners[idToRemove];
			});
	}
}

/**
 * Adds event listener that only fires once
 * and augments the callback to remove the listener after firing
 */
function once(eventType, callback, context) {
	let id;

	const callbackWithOff = (...args) => {
		const cbContext = listeners[id.toString()].context;
		off(id);
		return callback.apply(cbContext, args);
	};

	id = on(eventType, callback, context, callbackWithOff);

	return id;
}

function removeListeners() {
	listeners = {};
}

function getListeners() {
	return {
		...listeners,
	};
}

export default { emit, on, once, off, getListeners, removeListeners };
