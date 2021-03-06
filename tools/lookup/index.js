'use strict';

let yargs = require('yargs')
   .alias('v', 'version')
   .version(function() { return require('./package').version; })
   .describe('v', 'show version information')
   .command(require('./lookup.js'))
   .help()
   .argv;
