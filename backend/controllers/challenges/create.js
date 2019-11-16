var models    = require(__dirname + "/../../models");
var Bookshelf = require('bookshelf').PG;
var Challenge = models.Challenge;

module.exports = function(req, res) {

	var name          = req.body.name || '';
	var goal          = req.body.goal || '';
	var description   = req.body.description || '';
	var money_pledged = req.body.money_pledged || 0 ;
	var currency      = req.body.currency || 'USD';
	var user_id       = req.body.user_id || '';
	var pic_url       = req.body.pic_url || '';

	try{
		if(       name          == null ) throw "You need to give a name to your challenge!";
		else if(  goal          == null ) throw "You need to give a goal to your challenge!";
		else if(  description   == null ) throw "You need to give a description to your challenge!";
		else if(  money_pledged == null ) throw "You need to say a how much money you want!";
		else if(  currency      == null ) throw "No currency given!";
		else if(  currency != 'USD' || currency != 'EUR') throw "Currency not approuved";
		else if(  user_id       == null ) throw "No user_id for the challenge!";

		else{
			var data_challenge = {
				name                 : name,
				goal                 : goal,
				user_id              : user_id,
				money_pledged        : money_pledged,
				currency             : currency,
				description          : description,
				total_pledges_so_far : 0,
				pic_url              : pic_url
			};

			var challenge = new Challenge( data_challenge );
			challenge.saveChallenge()
			res.setHeader('Content-Type', 'application/json');
			res.send( { challenge: challenge.challengeLib , error: null } );
		}
	}
	catch( error ){
		res.setHeader('Content-Type', 'application/json');
		res.send( { challenge: null , error: error } );
	}
}
