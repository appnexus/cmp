import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/from';
import 'core-js/fn/set';

import {init} from './lib/init';
import { CMP_GLOBAL_NAME } from './lib/cmp';

function start() {
	const {config} = window[CMP_GLOBAL_NAME] || {};
	init(config);
}
 
// in development, set up HMR:
if (module.hot) {
	console.log("Development Environment");
	require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('./components/app', () => requestAnimationFrame(init) );
}
start();