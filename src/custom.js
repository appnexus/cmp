
import log from './lib/log';
import { CMP_GLOBAL_NAME, CMP_CALL_NAME, CMP_LOCATOR_NAME } from "./lib/cmp";


//datediff is an integer in days
const createCookie = (key, value, datediff) => {
    let date = new Date();
    // console.log(value)
    // console.log(datediff)
    date.setDate(date.getDate() + parseInt(datediff));
    let expiration = date.toUTCString();
    let cookie = escape(key) + "=" + escape(value) + ";expires=" + expiration + ";";
    document.cookie = cookie;
}

const readCookie = name => {
    var key = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(key) === 0) {
            return cookie.substring(key.length, cookie.length);
        }
    }
    return null;
}
// window.alert("INIT");
// console.log(readCookie('euconsent'));
function removeCookies(){
    if(!readCookie('euconsent')){
    // (function () {
        var cookies = document.cookie.split("; ");
        for (var c = 0; c < cookies.length; c++) {
            var d = window.location.hostname.split(".");
            // console.log(d)
            // console.log(cookies[c]);
            while (d.length > 0) {
                let domain = d.join('.');
                // console.log(domain);
                let cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-2017 00:00:01 GMT; domain=' + domain + ' ;path=';
                let p = location.pathname.split('/');
                // console.log(cookieBase);
                document.cookie = cookieBase + '/';
                while (p.length > 0) {
                    document.cookie = cookieBase + p.join('/');
                    p.pop();
                };
                d.shift();
                cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-2017 00:00:01 GMT;path=';
                p = location.pathname.split('/');
                // console.log(cookieBase);
                document.cookie = cookieBase + '/';
                while (p.length > 0) {
                    document.cookie = cookieBase + p.join('/');
                    p.pop();
                };                           
            }
        }
    // })();     
    // window.alert("INIT")
    }
}

removeCookies();

function handleCustomVendors(cmp,vendorList, vendorConsents) {
    const vendors = vendorList['vendors']
    vendorConsents = vendorConsents['vendorConsents']
    log.debug('Blocking/Unblocking custom vendors');
    Object.keys(vendorConsents).forEach(vendorId => {
        if (vendorConsents[vendorId] === false){
            const vendor = vendors[vendorId]
            if(vendor)
               window.yett.block(vendor)                            
        }
        if (vendorConsents[vendorId] === true){
            const vendor = vendors[vendorId]
            if(vendor)
               window.yett.unblock(vendor)
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
	else if (!listVersion || !vendorListVersion) {
		log.debug('Could not determine vendor list version. Not showing consent tool');
	}
	else if ( vendorListVersion !== listVersion) {
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
        let cmp_config = window.CMP_CONFIG || [];
        cmp.config = {
            globalVendorListLocation: 'http://oondeo.es/gdpr/vendorlist.json',
            // customPurposeListLocation: '/docs/purposes.json',
            // globalConsentLocation: '/docs/portal.html',
            storeConsentGlobally: false,
            storePublisherData: false,
            // gdprApplies: true,
            // localization: {},
            // forceLocale: 'en-us'					
            // logging: 'debug',
            bannerModal: true,
            bannerLogo: '',
            ...cmp_config                       
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

import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/from';
import 'core-js/fn/set';

import {init} from './lib/init';

document.addEventListener("DOMContentLoaded", function(){
    setTimeout(function(){ removeCookies(); }, 500);
    // in development, set up HMR:
        if (module.hot) {
            console.log("Development Environment");
            require('preact/devtools');   // turn this on if you want to enable React DevTools!
            module.hot.accept('./components/app', () => requestAnimationFrame(init) );
        }
        const {config} = window[CMP_GLOBAL_NAME] || {};
        init(config);     
    });


let YETT_BLACKLIST = window.YETT_BLACKLIST || []; 
let YETT_WHITELIST = window.YETT_WHITELIST || [];
window.YETT_BLACKLIST = [
    'iframe:src/.*/sandbox:',
    'script:src//',
    'script:src/.*/',
    ...YETT_BLACKLIST
];
window.YETT_WHITELIST = [
    /cmp\.bundle\.js/,
    /cmp\.custom\.bundle\.js/,
    /cmp\.complete\.bundle\.js/,
    ...YETT_WHITELIST
];

// import {block,unblock} from 'yett';
// console.log(block);