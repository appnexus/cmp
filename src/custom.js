import log from './lib/log';
import { CMP_GLOBAL_NAME, CMP_CALL_NAME, CMP_LOCATOR_NAME } from "./lib/cmp";


function handleCustomVendors(cmp,vendorList, vendorConsents) {
    const vendors = vendorList['vendors']
    vendorConsents = vendorConsents['vendorConsents']
    log.debug('Blocking/Unblocking custom vendors');
    Object.keys(vendorConsents).forEach(vendorId => {
        if (vendorConsents[vendorId] === false){
            const vendor = vendors[vendorId]
            if(vendor)
               block(vendor)                            
        }
        if (vendorConsents[vendorId] === true){
            const vendor = vendors[vendorId]
            if(vendor)
               unblock(vendor)
        }                
    })   
    if(cmp.reload) window.location.reload() 
}

function handleConsentResult(cmp,vendorList, vendorConsents) {
    let created = vendorConsents ? vendorConsents.created: null;
    let vendorListVersion = vendorList ? vendorList.vendorListVersion: null;
    let listVersion = vendorConsents ? vendorConsents.vendorListVersion: null;
	if (!created) {
		log.debug('No consent data found. Showing consent tool');
		cmp('showConsentTool');
	}
	else if (!listVersion) {
		log.debug('Could not determine vendor list version. Not showing consent tool');
	}
	else if (vendorListVersion !== listVersion) {
		log.debug(`Consent found for version ${vendorListVersion}, but received vendor list version ${listVersion}. Showing consent tool`);
		cmp('showConsentTool');
	}
	else {
        log.debug('Consent found. Not showing consent tool');
		handleCustomVendors(cmp,vendorList, vendorConsents)
	}
}

function checkConsent(cmp) {
	if (!cmp) {
		log.error('CMP failed to load');
	}
	else if (!window.navigator.cookieEnabled) {
		log.warn('Cookies are disabled. Ignoring CMP consent check');
	}
	else {
		cmp('getVendorList', null, vendorList => {
			const timeout = setTimeout(() => {
				handleConsentResult(cmp, vendorList);
			}, 100);

			cmp('getVendorConsents', null, vendorConsents => {
				clearTimeout(timeout);
				handleConsentResult(cmp, vendorList, vendorConsents);
			});
		});
	}
}

// (function(window, document) {
// if (!window[CMP_GLOBAL_NAME]) {
    window[CMP_GLOBAL_NAME] = (function() {
        var listen = window.attachEvent || window.addEventListener;
        listen('message', function(event) {
            window[CMP_GLOBAL_NAME].receiveMessage(event);
        }, false);

        function addLocatorFrame() {
            if (!window.frames['__cmpLocator']) {
                if (document.body) {
                    var frame = document.createElement('iframe');
                    frame.style.display = 'none';
                    frame.name = CMP_LOCATOR_NAME;
                    document.body.appendChild(frame);
                } else {
                    setTimeout(addLocatorFrame, 5);
                }
            }
        }
        addLocatorFrame();

        var commandQueue = [];
        var cmp = function(command, parameter, callback) {
            if (command === 'ping') {
                if (callback) {
                    callback({
                        gdprAppliesGlobally: !!(window[CMP_GLOBAL_NAME] && window[CMP_GLOBAL_NAME].config && window[CMP_GLOBAL_NAME].config.gdprAppliesGlobally),
                        cmpLoaded: false
                    });
                }
            } else {
                commandQueue.push({
                    command: command,
                    parameter: parameter,
                    callback: callback
                });
            }
        }
        cmp.commandQueue = commandQueue;
        cmp.receiveMessage = function(event) {
            var data = event && event.data && event.data[CMP_CALL_NAME];
            if (data) {
                commandQueue.push({
                    callId: data.callId,
                    command: data.command,
                    parameter: data.parameter,
                    event: event
                });
            }
        };
        cmp.config = {
            globalVendorListLocation: '/docs/vendorlist.json',
            customPurposeListLocation: '/docs/purposes.json',
            globalConsentLocation: '/docs/portal.html',
            storeConsentGlobally: false,
            storePublisherData: false,
            // gdprApplies: true,
            // localization: {},
            // forceLocale: 'en-us'					
            logging: 'debug',
            bannerModal: true,
            bannerLogo: ''                        
        }
        cmp.reload = false;
        cmp('addEventListener', 'onSubmit', function() {
            window[CMP_GLOBAL_NAME].reload = true;
        });
        cmp('addEventListener', 'cmpReady', function() {
            checkConsent(window[CMP_GLOBAL_NAME]);                               
        });      
        
        return cmp;
    }());
// }    
    
// })(window, document);
// let YETT_BLACKLIST = window.YETT_BLACKLIST || []; 
// let YETT_WHITELIST = window.YETT_WHITELIST || [];
window.YETT_BLACKLIST = [
    'iframe:src/.*/sandbox:',
    'script:src//'
];
window.YETT_WHITELIST = [
    /cmp\.bundle\.js/,
    /cmp\.complete\.bundle\.js/
];

import {block,unblock} from 'yett';