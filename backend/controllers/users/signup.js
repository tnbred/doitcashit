var models    = require(__dirname + "/../../models");
var Bookshelf = require('bookshelf').PG;
var User      = models.User;
var owasp     = require("owasp-password-strength-test");
module.exports = function(req, res) {
	
	var name                  = req.body.name ;
	var email                 = req.body.email ;
	var birth_date            = req.body.birth_date ;
	var password              = req.body.password ;
	var password_confirmation = req.body.password_confirmation ;

	try{
		if( typeof email == 'undefined') throw "email is missing";
		else if( typeof password == 'undefined' ) throw "password is missing";
		else if ( typeof password_confirmation == 'undefined' ) throw "password confirmation is missing" ;  
		else{
			if (password !== password_confirmation) {
				throw "Password doesn't match password confirmation.";
			} else {
				var checkPassword = owasp.test(password);
				if ( checkPassword.strong == false ) {
					throw checkPassword.errors.toString().replace(/.,/g , '\n');
				} else {
					new models.User().query('where', 'email', '=', email).fetch().then(function(user) {
						try {
							if (user) {
								throw "This email address is already used.";
							} else {
								var data_user = {
									name	   : name,
									email      : email,
									approved   : false,
									password   : password,
									birth_date : birth_date
								}
								user = new User( data_user );
								try{
									user.saveUser()
									res.setHeader('Content-Type', 'application/json');
									res.send( { user: user.userLib , error: null } );
								} catch( err ){
									res.setHeader('Content-Type', 'application/json');
									res.send( { user: null , error: err } );
								}
							}
						} catch (error) {
							res.setHeader('Content-Type', 'application/json');
							res.send( { user: null , error: error } );
						}
					});
				}

			}
		}
	}
	catch( error ){
		res.setHeader('Content-Type', 'application/json');
		res.send( { user: null , error: error } );	
	}
}
