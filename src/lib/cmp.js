import log from './log';

export default class Cmp {
	constructor () {
		this.isLoaded = false;
		this.cmpReady = false;
		this.openConsentTool = false;
		this.eventListeners = {};
		this.commandQueue = [];
	}

	/**
	 * Trigger all event listener callbacks to be called.
	 * @param {string} event Name of the event being triggered
	 * @param {*} data Data that will be passed to each callback
	 */
	notify = (event, data) => {
		log.info(`Notify event: ${event}`);
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
