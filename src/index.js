!Array.reduce && require('core-js/fn/array/reduce');
!Array.fill && require('core-js/fn/array/fill');
!Array.map && require('core-js/fn/array/map');
!Array.forEach && require('core-js/fn/array/for-each');
!Array.filter && require('core-js/fn/array/filter');
!Array.from && require('core-js/fn/array/from');
import 'core-js/fn/set';
import {init} from './lib/init';
import { CMP_GLOBAL_NAME } from './lib/cmp';

function start() {
	const {config} = window[CMP_GLOBAL_NAME] || {};
	init(config);
}

start();
