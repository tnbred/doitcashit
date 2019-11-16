var models = require(__dirname + "/../../models");
var Bookshelf = require('bookshelf').PG;

module.exports = function(req, res) {
	var Challenge             = models.Challenge;
	var criterion             = req.body.criterion || "total_pledges" ;
	var nbChallengesToDisplay = req.body.nbChallengesToDisplay || 3

	var UserLib = require('doitcashit-lib').DICILib.User;
	var userLib = new UserLib();

	var challenge  = new Challenge({})
	.fetchAll({ withRelated:[ 'pledges' , 'users'] } )
	.then( function( challenges ) {
		var challengesJSON = challenges.models;
		var challenge_crit = [];
		var crit           = 0;


		for( var i = 0 ; i < challenges.length ; i++ ){
			if(  criterion  ==  "total_pledges"  ){  crit  =  challengesJSON[  i  ].attributes.total_pledges_so_far ; }
			if(  criterion  ==  "nb_users"       ){  crit  =  challengesJSON[ i ].relations.users.toJSON().length;  }
			if(  criterion  ==  "money_pledged"  ){  crit  =  challengesJSON[  i  ].attributes.money_pledged;  }
			if(  criterion  ==  "most_recent"    ){  crit  =  challengesJSON[  i  ].attributes.created_at;  }
			challengesJSON[ i ].setChallenge()	
			var users     = challengesJSON[ i ].relations.users.toJSON()
			var usersList = userLib.listUser( users )
			challenge_crit[ i ] = { challenge: challengesJSON[ i ].challengeLib  ,  criterion : crit , users: usersList  }
		}
		var challenges_sorted              = challenge_crit.sort( function( a , b ){ return b.criterion - a.criterion; } );	
		res.setHeader('Content-Type', 'application/json');
		res.send( challenges_sorted );
	});

}
