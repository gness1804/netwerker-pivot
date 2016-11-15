require('babel-register')({
  presets: ['es2015', 'react', 'stage-1'],
});
require('babel-polyfill');

global.document = require('jsdom').jsdom(
  `
  <head>
    <meta charset='UTF-8'>
    <title>Netwerker</title>
  </head>
  <body>
    <div id='application'></div>
  </body>
`)

global.window = document.defaultView;
global.navigator = window.navigator;
