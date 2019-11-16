var config       = require(__dirname + "/../config");
var pg           = require('pg');
var Bookshelf    = require(__dirname + "/../bookshelf");
var connectionString = config.PG.PG_URL;
var PledgeLib = require('doitcashit-lib').DICILib.Pledge;
var Helper    = require('doitcashit-lib').DICILib.Helper;

Bookshelf.plugin( 'registry' );

var Pledge = Bookshelf.Model.extend({

  tableName: 'pledges',
  hasTimestamps: true,

  pledgeLib: null,
  
  challenge: function() {
    return this.belongsTo(Challenge);
  },

  user: function() {
    return this.belongsTo(User);
  },

  sanitize: function(){
    var Helper = require(__dirname ).Helper;
    var sanitized_attr = Helper.sanitize( 'pledge' , this.attributes );
    this.attributes    = sanitized_attr;
  }


});



Pledge.prototype.savePledge = function(){
  this.sanitize();
  this.pledgeLib = new PledgeLib( this.toJSON() );
  console.log( this.toJSON())
  this.save()
}

Pledge.prototype.setPledge = function(){
  this.sanitize();
  this.pledgeLib = new PledgeLib( this.toJSON() );
}


Pledge.prototype.updatePledge = function( data  ){
  var Helper = require(__dirname ).Helper;
  var data_san = Helper.sanitize( 'pledge' , data );
  Helper.update_sanitize( Pledge , this.attributes.id , data_san );
  this.pledgeLib = new PledgeLib( data );

}

Pledge.prototype.findById = function( id , callback ){
  var Helper = require(__dirname ).Helper;
  Helper.findById( Pledge , id , function( err , pledge ){
    pledge.setPledge();
    callback( err , pledge );
  });
}

Bookshelf.model( 'Pledge', Pledge );

module.exports = Pledge;


