'use strict';

const DEFAULT_ENV = 'development';
const NODE_ENV = process.env.NODE_ENV || DEFAULT_ENV;

// eslint-disable-next-line global-require, import/no-dynamic-require
module.exports = require(`./${NODE_ENV}.json`);
