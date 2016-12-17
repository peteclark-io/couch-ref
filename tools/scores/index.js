'use strict';

let yargs = require('yargs')
   .alias('v', 'version')
   .version(function() { return require('./package').version; })
   .describe('v', 'show version information')
   .command(require('./scores/users.js'))
   .command(require('./scores/referees.js'))
   .command(require('./scores/total.js'))
   .command(require('./scores/ranking.js'))
   .help()
   .argv;
