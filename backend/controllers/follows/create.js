var models        = require(__dirname);
var Bookshelf     = require('bookshelf').PG;
var Follow        = models.Follow;
var Challenge     = models.Challenge;
var User          = models.User;

module.exports = function(req, res) {

	var user_id       = req.body.user_id;
	var challenge_id  = req.body.challenge_id;


	try{
		if(       user_id       == null ) throw "No user_id for this follow";
		else if(  challenge_id  == null ) throw "No challenge_id for this follow";
		else{
			new Challenge({ id: challenge_id})
			.fetch()
			.then( function( challenge ){
				if( !challenge ){
					res.setHeader('Content-Type', 'application/json');
					error = "invalid challenge_id";
					res.send( error );
				}
				else{
					try{

						new User({ id: user_id })
						.fetch()
						.then( function( user ){
							if( !user ){
								res.setHeader('Content-Type', 'application/json');
								error = "invalid user_id"
								res.send( error )
							}
							else{
								var data_follow = {
									user_id       : user_id,
									challenge_id  : challenge_id
								};
								var error = null;
								var follow = new Follow( data_follow);
								follow.saveFollow();
								res.setHeader('Content-Type', 'application/json');
								res.send( { follow: follow.followLib , error: error } );
							}
						})

					}
					catch( error ){
						res.setHeader('Content-Type', 'application/json');
						res.send( { follow: null , error: error } );
					}
				} 
			})
		}
	}
	catch( error ){
		res.setHeader('Content-Type', 'application/json');
		res.send( { follow: null , error: error } );
	}
}