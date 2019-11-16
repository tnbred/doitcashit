var config    = require(__dirname + "/../../config");
var models    = require(__dirname + "/../../models");
var Bookshelf = require('bookshelf').PG;
var Cursor    = require('pg-cursor')
var pg        = require('pg')

module.exports = function(req, res) {
	var Challenge          = models.Challenge;
	var nbChallengesByPage = req.body.nbChallengeByPage || 10;
	var indexPage          = req.body.indexPage || 1;
	var metaData           = req.metaData;

	var firstChallengeToDisplay = nbChallengesByPage * ( indexPage - 1 ) + 1;

	var connectionString = config.PG.PG_URL

	var nbTotChallenge   = Challenge .count(['id']).then(function( nbTotChal ){ 
		var nbTotalPages = Math.ceil( nbTotChal / nbChallengesByPage );

		pg.connect( connectionString , function(err, client, done) {

			var cursor = client.query(new Cursor('SELECT * FROM challenges' ) );

			cursor.read( firstChallengeToDisplay  , function(err, rows) {
				if (err) {
					done()
				} else {
					cursor.read( nbChallengesByPage , function(err, rows) {
						res.setHeader('Content-Type', 'application/json');
						res.send( { rows              : rows ,
							nbTotalChallenges : nbTotChal,
							nbTotalPages      : nbTotalPages } );
						done()
					});
				}
				cursor.close(function(err) {
					if (err) {
						done()
					} else {
						done();
					}
				});
			});
		});
	});

	
}
