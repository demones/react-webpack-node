// To get normal classnames instead of CSS Modules classnames for testing
require('mock-css-modules');

require('babel-register');
require('babel-polyfill');

global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
