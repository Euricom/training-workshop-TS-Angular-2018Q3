const calc = require('./calc.umd');

/* Vanilla javascript argument parsing */
const val1 = +process.argv[2];
const val2 = +process.argv[3];

/* 
Most used NPM packages for argument parsing
- Minimist: For minimal argument parsing.
- Yargs: For slightly more sophisticated argument parsing.
- Commander.js: For building use-and-quit command-line applications, with built-in argument parsing.
- Meow: Alternative to Commander.js
- Vorpal.js: For building mature, interactive command-line applications, with built-in argument parsing.
*/

console.log(calc.sum(val1, val2));
