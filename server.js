'use strict';
/* eslint-env es6 */

var fs = require('fs');

fs.exists('./tests', (fileExists) => {
  if (fileExists) require('./lib/impress');
  else require('impress');
  impress.server.start();
});
