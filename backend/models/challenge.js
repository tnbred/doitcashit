var config       = require(__dirname + "/../config");
var pg           = require('pg');
var Bookshelf    = require(__dirname + "/../bookshelf");
var connectionString = config.PG.PG_URL;;

var ChallengeLib = require('doitcashit-lib').DICILib.Challenge;
var Helper       = require(__dirname ).Helper;

Bookshelf.plugin( 'registry' );


var Challenge = Bookshelf.Model.extend({

	tableName: 'challenges',
	hasTimestamps: true,

	challengeLib: null,

	users: function() {
		var User   = Bookshelf.model('User'); 
		var Pledge = Bookshelf.model('Pledge'); 
		return this.belongsToMany(User).through(Pledge);
	},

	pledges: function() {
		var Pledge = Bookshelf.model('Pledge'); 
		return this.hasMany(Pledge);
	},

	sanitize: function(){
		var Helper = require(__dirname ).Helper;
		var sanitized_attr = Helper.sanitize( 'challenge' , this.attributes );
		this.attributes    = sanitized_attr;
	},


	excerpt: function( nbSentences){
		if( !nbSentences ) nbSentences = 3;
		if( nbSentences == 0 ) nbSentences == 1
			var description = this.attributes.description;
		var length      = description.length;
		var indices = [];
		for(var i=0; i< description.length;i++) {
			console.log( "i: "+ description[i] );
			if ( description[i] === ".") indices.push(i);
		}
		console.log( "TAILLE: "+ indices.length);
		if( indices.length > nbSentences ) return description.substring( 0 , indices[ nbSentences -1 ] +1 ) +"..." ;
		else return description
	},



});

Challenge.prototype.saveChallenge = function(){
	this.sanitize();
	this.challengeLib = new ChallengeLib( this.toJSON() );
	this.save()
}

Challenge.prototype.setChallenge = function(){
	this.sanitize();
	this.challengeLib = new ChallengeLib( this.toJSON() );
}

Challenge.prototype.updateChallenge = function( data  ){
	var Helper = require(__dirname ).Helper;
	var data_san = Helper.sanitize( 'challenge' , data );
	Helper.update_sanitize( Challenge , this.attributes.id , data_san );
	this.challengeLib = new ChallengeLib( data );

}

Challenge.prototype.findById = function( id , callback ){
	var Helper = require(__dirname ).Helper;
	Helper.findById( Challenge , id , function( err , challenge ){
		challenge.setChallenge();
		callback( err , challenge );
	});
}

Bookshelf.model( 'Challenge', Challenge );


module.exports = Challenge;
