const env = process.env.NODE_ENV || "development";
const knex = require("knex");
const conf = require("./config");

const db = knex(conf[env]);

module.exports = db;
