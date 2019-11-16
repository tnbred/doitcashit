var _ = require("lodash");

var Pledge = function (data) {
	this.data = this.sanitize(data);
}

Pledge.prototype.data = {}


Pledge.prototype.get = function (name) {
	return this.data[name];
}

Pledge.prototype.set = function (name, value) {
	this.data[name] = value;
}

Pledge.prototype.sanitize = function (data) {
	var schemas = require('doitcashit-lib').DICILib.Schemas;
	data = data || {};
	schema = schemas.pledge;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

Pledge.prototype.listPledge = function( data ){
	var listPledge = [];
	for( var i = 0 ; i < data.length ; i++ ){
		listPledge[ i ] = new Pledge( data[ i ] );
	}
	return listPledge 
}
exports.Pledge = Pledge;