//------------------------------------------------------------------------------
/* global require */
/* global module */
/* global __dirname */
//------------------------------------------------------------------------------

const path = require('path');

module.exports = {
 mode : 'production',
 output: {
   path: path.resolve(__dirname, 'dist'),
   filename: 'interval-bins.js',

  globalObject: 'this',

  library: {
    name: 'interval-bins',
    type: 'umd',
  },
 },
};
