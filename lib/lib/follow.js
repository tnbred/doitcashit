var _ = require("lodash");

var Follow = function (data) {
	this.data = this.sanitize(data);
}

Follow.prototype.data = {}


Follow.prototype.get = function (name) {
	return this.data[name];
}

Follow.prototype.set = function (name, value) {
	this.data[name] = value;
}

Follow.prototype.sanitize = function (data) {
	var schemas = require('doitcashit-lib').DICILib.Schemas;
	data        = data || {};
	schema      = schemas.follow;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

Follow.prototype.listFollow = function( data ){
	var listFollow = [];
	for( var i = 0 ; i < data.length ; i++ ){
		listFollow[ i ] = new Follow( data[ i ] );
	}
	return listFollow 
}


exports.Follow = Follow;