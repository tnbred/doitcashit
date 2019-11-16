var models    = require(__dirname +'/models');

var Bookshelf     = require('bookshelf').PG;
var Pledge        = models.Pledge;
var Challenge     = models.Challenge;
var User          = models.User;
var request       = require('request')

var config    = require(__dirname + "/config");
var Cursor    = require('pg-cursor')
var pg        = require('pg')


// var challenge  = new Challenge({})
// .fetchAll({ withRelated:[ 'pledges' , 'users'] } )
// .then( function( challenges ) {
// 	var chalMod = challenges.models
// 	for( var i = 0 ; i < challenges.length ; i++ ){
// 		console.log( chalMod[ i ].attributes.total_pledges_so_far )
// 	}
// 	})


var Challenge             = models.Challenge;
var criterion             = "total_pledges" ;
var nbChallengesToDisplay = 3

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
		challenge_crit[ i ] = { challenge: challengesJSON[ i ].challengeLib.data  ,  criterion : crit , users: usersList  }
	}
	var challenges_sorted              = challenge_crit.sort( function( a , b ){ return b.criterion - a.criterion; } );	
	console.log( challenges_sorted );
});

// var owasp     = require("owasp-password-strength-test");
// var name                  = "aqw xsz" ;
// var email                 = "aqw@xsz" ;
// var birth_date            = new Date() ;
// var password              = 'Mon 1er mot de passe' ;
// var password_confirmation = 'Mon 1er mot de passe';

// try{
// 	if( typeof email == 'undefined') throw "email is missing";
// 	else if( typeof password == 'undefined' ) throw "password is missing";
// 	else if ( typeof password_confirmation == 'undefined' ) throw "password confirmation is missing" ;  
// 	else{
// 		if (password !== password_confirmation) {
// 			throw "Password doesn't match password confirmation.";
// 		} else {
// 			var checkPassword = owasp.test(password);
// 			if ( checkPassword.strong == false ) {
// 				throw checkPassword.errors.toString().replace(/.,/g , '\n');
// 			} else {
// 				new models.User().query('where', 'email', '=', email).fetch().then(function(user) {
// 					try {
// 						if (user) {
// 							throw "This email address is already used.";
// 						} else {
// 							var data_user = {
// 								name	   : name,
// 								email      : email,
// 								approved   : false,
// 								password   : password,
// 								birth_date : birth_date
// 							}
// 							user = new User( data_user );
// 							try{
// 								user.saveUser()
// 								console.log( { user: user.userLib , error: null } );
// 							} catch( err ){
// 								console.log( { user: null , error: err } );
// 							}
// 						}
// 					} catch (error) {
// 						console.log( { user: null , error: error } );
// 					}
// 				});
// 			}

// 		}
// 	}

// }
// catch( error ){
// 	console.log( { user: null , error: error } );	
// }


// new User({name:"ndfmùlùlzedflmkmkz"})
// .fetch()
// .then( function(user){
// 	user.setUser();
// 	// console.log( user.userLib )
// } )
// request.post(
//     'http://localhost:1337/v1/user/signup',
//     {email:'antoinedematteo@gmail.com', name:'antoine dematteo' , birth_date: new Date(), 
//     password: 'Paris75doitcashit', password_confirmation: 'Paris75doitcashit'},
//     function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         console.log(JSON.parse(body));
//       }
//     }
//   );


// request.post(
//     'http://localhost:1337/v1/users/login',
//     {email:'antoinedematteo@gmail.com', password: 'Paris75doitcashit'},
//     function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         console.log(JSON.parse(body));
//       }
//     }
//   );
// var email = 'antoinedematteo@gmail.com'
// var password = 'Paris75doitcashit'


// var request = require('request');


// request.post({
//     url: 'http://localhost:1337/v1/users/signup', //URL to hit
//     json: {   name :'antoine', email :'antoine', birth_date : new Date(), password: 'azerty', password_confirmation:'azerty' }, //Query string data
//     method: 'POST',

// }, function(error, response, body){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log( body);
//     }
// });


// request({
//     url: 'http://localhost:1337/v1/users/login', //URL to hit
//     qs: { email: 'antoinedematteo@gmai' , password: 'Paris75doitcash'}, //Query string data
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Custom-Header': 'application/json'
//     }
// }, function(error, response, body){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log( body);
//     }
// });



// request({
//     url: 'http://localhost:1337/v1/challenges/trending', //URL to hit
//     qs: {criterion : "total_pledges" , nbChallengesToDisplay: 1}, //Query string data
//     method: 'POST',
//     headers: {
//         'Content-Type': 'MyContentType',
//         'Custom-Header': 'Custom Value'
//     }
// }, function(error, response, body){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log( body);
//     }
// });

// request({
//     url: 'http://localhost:1337/v1/challenges/create', //URL to hit
//     qs: {	name :'Antoine',
// 	goal :'dematteo',
// 	description: 'blabla',
// 	money_pledged: 10,
// 	currency:'USD',
// 	user_id:1}, //Query string data
//     method: 'POST',
//     headers: {
//         'Content-Type': 'MyContentType',
//         'Custom-Header': 'Custom Value'
//     }
// }, function(error, response, body){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log( body);
//     }
// });