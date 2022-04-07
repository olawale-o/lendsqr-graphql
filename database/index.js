const env = require('../constants');
const knex = require('knex');
const dbConfig = require('./knexfile');

const { NODE_ENV } = env;

let db = null;

if (NODE_ENV === 'test') {
  db = knex(dbConfig.test);
} else {
  db = knex(dbConfig.development);
}

module.exports = db;
