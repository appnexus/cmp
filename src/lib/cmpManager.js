import log from './log';

export default class CmpManager {
	constructor () {
		this.isLoaded = false;
		this.cmpReady = false;
		this.eventData = {};
		this.openConsentTool = false;
		this.eventListeners = {};
	}

	/**
	 * Remove a callback for an event.
	 * @param {string} event Name of the event to remove callback from
	 */
	removeEventListener = (event, callback) => {
		// If an event is supplied remove the specific listener
		if (event) {
			const eventSet = this.eventListeners[event] || new Set();
			// If a callback is supplied remove it
			if (callback) {
				eventSet.delete(callback);
			}
			// If no callback is supplied clear all listeners for this event
			else {
				eventSet.clear();
			}
			this.eventListeners[event] = eventSet;
		}
		// If no event is supplied clear ALL listeners
		else {
			this.eventListeners = {};
		}
	};


	/**
	 * Add a callback to be fired on a specific event.
	 * @param {string} event Name of the event
	 */
	addEventListener = (event, callback) => {
		const eventSet = this.eventListeners[event] || new Set();
		eventSet.add(callback);
		this.eventListeners[event] = eventSet;

		// Trigger load events immediately if they have already occurred
		if (
			event === 'isLoaded' && this.isLoaded ||
			event === 'cmpReady' && this.cmpReady ||
			event === 'openConsentTool' && this.openConsentTool
		) {
			const data = this.eventData[event];
			callback({event, data});
		}
	};

	/**
	 * Trigger all event listener callbacks to be called.
	 * @param {string} event Name of the event being triggered
	 * @param {*} data Data that will be passed to each callback
	 */
	notify = (event, data) => {
		log.info(`Notify event: ${event}`);
		this.eventData[event] = data;
		const eventSet = this.eventListeners[event] || new Set();
		eventSet.forEach(listener => {
			try {
				listener({event, data});
			} catch (err) {
				log.error(err);
			}
		});

	};
}
