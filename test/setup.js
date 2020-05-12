import 'regenerator-runtime/runtime';
import chai from 'chai';
import assertJsx, { options } from 'preact-jsx-chai';

// when checking VDOM assertions, don't compare functions, just nodes and attributes:
options.functions = false;

// activate the JSX assertion extension:
chai.use(assertJsx);

global.sleep = ms => new Promise( resolve => setTimeout(resolve, ms) );

global.process.env.CMP_ID = 280;
global.process.env.CMP_VERSION = 2;
global.process.env.COOKIE_VERSION = 2;
