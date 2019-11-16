var _ = require("lodash");

var User = function (data) {
	this.data = this.sanitize(data);
}

User.prototype.data = {}


User.prototype.get = function (name) {
	return this.data[name];
}

User.prototype.set = function (name, value) {
	this.data[name] = value;
}

User.prototype.sanitize = function (data) {
	var schemas = require('doitcashit-lib').DICILib.Schemas;
	data        = data || {};
	schema      = schemas.user;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

User.prototype.listUser = function( data ){
  var listUser = [];
  for( var i = 0 ; i < data.length ; i++ ){
    listUser[ i ] = new User( data[ i ] );
  }
  return listUser 
}
exports.User = User;
