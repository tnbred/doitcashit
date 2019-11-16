var models        = require(__dirname + "/../../models");
var Bookshelf     = require('bookshelf').PG;
var Pledge        = models.Pledge;

module.exports = function(req, res) {

	var amount        = req.body.amount;
	var currency      = req.body.currency;
	var user_id       = req.body.user_id;
	var challenge_id  = req.body.challenge_id;


	try{
		if(       amount        == null ) throw "Your pledge is null!";
		else if(  amount        <  0    ) throw "Your pledge is not valid";
		else if(  currency      == null ) throw "no currency provided";
		else if(  user_id       == null ) throw "No user_id for this pledge";
		else if(  challenge_id  == null ) throw "No challenge_id for this pledge";
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
						var chal_currency = challenge.attributes.currency;
						if( chal_currency != currency ){
							throw "the currency of the pledge is different from the currency of the challenge";	
						} 
						else{
							new User({ id: user_id })
							.fetch()
							.then( function( user ){
								if( !user ){
									res.setHeader('Content-Type', 'application/json');
									error = "invalid user_id"
									res.send( error )
								}
								else{
									var data_pledge = {
										amount        : amount,
										user_id       : user_id,
										challenge_id  : challenge_id,
										currency      : currency,
									};
									var err = null;
									var pledge = new Pledge( data_pledge );
									pledge.savePledge()
									var updatePledges = challenge.toJSON().total_pledges_so_far+amount;
									challenge.updateChallenge({ total_pledges_so_far: updatePledges }); 
									res.setHeader('Content-Type', 'application/json');
									res.send( { pledge: pledge.pledgeLib , error: err } );

								}
							})
						}
					}
					catch( error ){
						res.setHeader('Content-Type', 'application/json');
						res.send( { pledge: null , error: error } );
					}
				} 
			})
}
}
catch( error ){
	res.setHeader('Content-Type', 'application/json');
	res.send( { pledge: null , error: error } );
}
}