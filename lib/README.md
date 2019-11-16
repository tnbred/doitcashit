# doitcashit-lib
# doitcashit-lib


####lib/schemas.js
The lib/schemas.js file contains the attributs of the models of the lib (ie: challenge, user, pledge, follow )

####lib/user.js
The lib/schemas.js file contains the model user with functions to create a user, get an attribute, set an attribut.
The data provided the the user functions is first sanitized in order to make sure that only good parameters are provided to the functions.

###### Exemple of use
var User = require('doitcashit-lib').DICILib.User;

var john = new User({name: "John Doe" , email: "john@doe.com" });
console.log("John is: ", john);

john.set( 'id' , 1 );
console.log("John is: ", john);

john.set( 'logincount' , 1 );
console.log("John was connected "+ john.get( 'logincount' ) + "times");

//example of use of sanitize where the extra parameter "husband" is not taken into account
var jane = new User({name: "Jane Doe" , email: "jane@doe.com , husband: "John Doe" });

###lib/challenge.js, lib/pledge.js, lib/follow.js
This models works exactly the same way as lib/user.js

