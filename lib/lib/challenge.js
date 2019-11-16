var _ = require("lodash");

var Challenge = function (data) {
  this.data = this.sanitize(data);
}

Challenge.prototype.data = {}


Challenge.prototype.get = function (name) {
  return this.data[name];
}

Challenge.prototype.set = function (name, value) {
  this.data[name] = value;
}

Challenge.prototype.sanitize = function (data) {
	  var schemas = require('doitcashit-lib').DICILib.Schemas;
	  data        = data || {};
	  schema      = schemas.challenge;
  return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

Challenge.prototype.listChallenge = function( data ){
	var listChallenge = [];
	for( var i = 0 ; i < data.length ; i++ ){
		listChallenge[ i ] = new Challenge( data[ i ] );
	}
	return listChallenge 
}

exports.Challenge = Challenge;