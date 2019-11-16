var config = require(__dirname + "/config");
var knex = require('knex')({
  client: 'pg',
  connection: config.PG.PG_URL
});
module.exports  = require('bookshelf')(knex);

