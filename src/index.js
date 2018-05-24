!Array.reduce && import ('core-js/fn/array/reduce');
!Array.fill && import ('core-js/fn/array/fill');
!Array.map && import ('core-js/fn/array/map');
!Array.forEach && import ('core-js/fn/array/for-each');
!Array.filter && import ('core-js/fn/array/filter');
!Array.from && import ('core-js/fn/array/from');
import 'core-js/fn/set';
import {init} from './lib/init';
import { CMP_GLOBAL_NAME } from './lib/cmp';

function start() {
	const {config} = window[CMP_GLOBAL_NAME] || {};
	init(config);
}

start();
