var Bookshelf = require('bookshelf').PG;
var pg        = require('pg');
var config    = require(__dirname + "/../../config");
var sprintf   = require("sprintf-js").sprintf

module.exports = function(req, res) {
	var sentenceToSearch = req.body.sentenceToSearch || null;
	var connectionString = config.PG.PG_URL
	var queryString = sprintf("SELECT * FROM challenges where searchtext @@ plainto_tsquery('%s')", sentenceToSearch ) ;

	pg.connect(connectionString, function(err, client, done) {
		client.query( queryString , function(err, result) {
			if (err) return console.error(err);
			res.setHeader('Content-Type', 'application/json');
			res.send( result.rows );
		});
	})
}



