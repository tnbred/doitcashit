var models    = require(__dirname + "/../../models");
var Bookshelf = require('bookshelf').PG;
var Common    = models.Common;
var User      = models.User;

module.exports = function(req, res) {
	var email    = req.body.email ;
	var password = req.body.password ;

	new User().query('where', 'email', '=', email).fetch().then(function(user) {
		res.setHeader('Content-Type', 'application/json');
		if(!user){
			var result =  { user: null , error: 'A user with this email does not exist.' };
			res.send( result );
		}
		else{
			user.verify_password( password , function( err , user_verif ){
				if( !user_verif ){
					var result =  { user: null ,  error: 'Incorrect password.' };
					res.send(result )
				}else{
					if (user_verif.get("approved") !== true){
						var result =  { user: null ,  error: 'User not yet approved.' };
						res.send( result )
					}
					else{
						var logCount = user.get( "logincount" ) + 1;
						if( logCount == null ){
							logCount = 1;
						}
						var lastConnection = new Date();
						user.updateUser( {logincount:logCount , lastlogin_at: lastConnection} )
						user.setUser()
						res.send( { user: user.userLib ,  error: null } );
					}
				}
			})
			
		}

	});

}

