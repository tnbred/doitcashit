var User  = require(__dirname + "/../models").User;
var credential = require('credential');
var pw = credential();



verify = function verify( id , password, verified) {
	var user = User.findById( id );
	if (!user) {
        // No unexpected error, no user, reason for failure
        return verified(null, false, {
        	message: 'User not found'
        });
    }

    pw.verify(user.hash, password, function (isValid) {
    	if (!isValid) {
          // No unexpected error, no user, reason for failure
          return verified(null, false, {
          	message: 'Incorrect password.'
          });
      }
      return verified(null, user);
  });
};
exports.verify = verify;
