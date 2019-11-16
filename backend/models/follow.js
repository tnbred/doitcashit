var Bookshelf = require(__dirname + "/../bookshelf")
var FollowLib = require('doitcashit-lib').DICILib.Challenge;
var Helper    = require(__dirname +'/helper.js');

Bookshelf.plugin( 'registry' );

var Follow = Bookshelf.Model.extend({

  tableName: 'follows',
  hasTimestamps: true,

  followLib: null,

  
  challenge: function() {
    return this.belongsTo(Challenge);
  },

  user: function() {
    return this.belongsTo(User);
  },

  sanitize: function(){
    var Helper = require(__dirname ).Helper;
    var sanitized_attr = Helper.sanitize( 'follow' , this.attributes );
    this.attributes    = sanitized_attr;
  }



});

Follow.prototype.saveFollow = function(){
  this.sanitize();
  this.followLib = new FollowLib( this.toJSON() );
  this.save()
}

Follow.prototype.setFollow = function(){
  this.sanitize();
  this.followLib = new FollowLib( this.toJSON() );
}

Follow.prototype.updateFollow = function( data  ){
  var Helper = require(__dirname ).Helper;
  var data_san = Helper.sanitize( 'follow' , data );
  Helper.update_sanitize( Follow , this.attributes.id , data_san );
  this.followLib = new FollowLib( data );

}

Follow.prototype.findById = function( id , callback ){
  var Helper = require(__dirname ).Helper;
  Helper.findById( Follow , id , function( err , follow ){
    follow.setFollow();
    callback( err , follow );
  });
}

Bookshelf.model( 'Follow', Follow );


module.exports = Follow;
