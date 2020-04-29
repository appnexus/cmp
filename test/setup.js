import 'regenerator-runtime/runtime';
import chai from 'chai';
import assertJsx, { options } from 'preact-jsx-chai';
import { version } from '../config/common.webpack.config.babel';

// when checking VDOM assertions, don't compare functions, just nodes and attributes:
options.functions = false;

// activate the JSX assertion extension:
chai.use(assertJsx);

global.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
global.__VERSION__ = version;
