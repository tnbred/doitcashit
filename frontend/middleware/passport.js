var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var User = require('doitcashit-lib').DICILib.User;

var strategy =  new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
  function(email, password, done) {
    request.post(
    'http://localhost:1338/v1/users/login',
    {email:email, password:password},
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var resp = JSON.parse(body);
        console.log(JSON.parse(body));
        if(resp.user == null) {
          return done(null, false, { message: resp.error})
        } else {
          return done(null, new User(resp.user), {})
        }
      }
    }
  );
  }
)

module.exports = strategy 
