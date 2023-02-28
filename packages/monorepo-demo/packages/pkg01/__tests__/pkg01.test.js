'use strict';

const pkg01 = require('..');
const assert = require('assert').strict;

assert.strictEqual(pkg01(), 'Hello from pkg01');
console.info("pkg01 tests passed");
