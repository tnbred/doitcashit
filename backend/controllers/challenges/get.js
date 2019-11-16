var models = require(__dirname + "/../../models");

module.exports = function(req, res) {
	var Challenge   = models.Challenge;
	var challengeId = req.params.id || null
	var metaData    = req.metaData;


	new Challenge({ id : challengeId})
	.fetch({withRelated: ['users' ]}) 
	.then(function( challenge) {
		var error = null;
		res.setHeader('Content-Type', 'application/json');
		if( !challenge ){
			error = "You need to give a name to your challenge!"; 
			res.send( { challenge: null  , error: error } );
		}else{
			challenge.setChallenge();
			res.send( { challenge: challenge.challengeLib , error:null } );
		}
	})
}


