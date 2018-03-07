import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';

import config from './lib/config';
import {init} from './lib/init';
import { CMP_GLOBAL_NAME } from './lib/cmp';

function start() {
	const {config: configUpdates} = window[CMP_GLOBAL_NAME] || {};
	init(config);
}


// in development, set up HMR:
if (module.hot) {
	module.hot.accept('./components/app', () => requestAnimationFrame(init));
}

start();
