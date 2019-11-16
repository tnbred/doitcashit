var config       = require(__dirname + "/../config");
var pg           = require('pg');
var Bookshelf    = require(__dirname + "/../bookshelf");
var connectionString = config.PG.PG_URL;

var UserLib    = require('doitcashit-lib').DICILib.User;
var Helper     = require(__dirname +'/helper.js');

Bookshelf.plugin( 'registry' );


var User = Bookshelf.Model.extend({

  tableName: 'users',
  hasTimestamps: true,
  
  userLib: null,

  
  challenges: function() {
    return this.hasMany(Challenge).through(Pledge);
  },

  sanitize: function(){
    var Helper = require(__dirname ).Helper;
    var sanitized_attr = Helper.sanitize( 'user' , this.attributes );
    this.attributes    = sanitized_attr;
  },

  verify_password: function( password, verified) {
    var credential = require('credential')
    var pw         = credential();

    user = this
    pw.verify( this.attributes.password , password , function ( err , isValid) {
      console.log( isValid )
      if (!isValid) {
          return verified( null, false )
      }
      return verified(null, user );
      });
  },
  getBeginningDay: function( today ){
    var start = new Date();
    start.setHours(0,0,0,0);
    return( start );
  },

  getBeginningWeek: function(today) {
    today = new Date(today);
    today.setHours(0);
    var day = today.getDay(),
    diff = today.getDate() - day + (day == 0 ? -6 : 1); 
    return new Date(today.setDate(diff));
  },

  getBeginningMonth: function( today ){
    var date = new Date(), 
    y    = date.getFullYear(),
    m    = date.getMonth();
    var firstDay = new Date(y, m, 1);
    return( firstDay );
  },
  updateTimeStamp: function() {
    this.lastlogin_at = Date.now();
    this.save();
  },


})

module.exports = User;


User.prototype.saveUser = function(){
  var credential = require('credential');
  var pw         = credential();
  this.sanitize();
  var user = this;
  pw.hash( this.attributes.password , function (err, hash) {
    if (err) { throw err; }
    user.attributes.password = hash;
    user.save();
  });
  this.attributes.password = ''
  this.userLib = new UserLib( this.toJSON() )
}

User.prototype.setUser = function(){
  this.sanitize();
  this.userLib = new UserLib( this.toJSON() );
}

User.prototype.updateUser = function( data  ){
  var Helper = require(__dirname ).Helper;
  var data_user = this.toJSON();
  var keysUpdate = Object.keys( data );
  var changepassword = false
  for( var i = 0 ; i < keysUpdate.length ; i++ ){
    data_user[ keysUpdate[ i ] ] = data[ keysUpdate[ i ] ];
    if( keysUpdate[ i ] == 'password') changepassword = true ;
  }
  var data_san = Helper.sanitize( 'user' , data_user );
  Helper.update_sanitize( User , this.attributes.id , data_san );

  if( changepassword ){
    var credential = require('credential');
    var pw         = credential();
    console.log( "updating password")
    var user = this;
    pw.hash( this.attributes.password , function (err, hash) {
      if (err) { throw err; }
      user.attributes.password = hash;
      user.save();
    });
    data_san[ 'password' ] = ''
  }
  this.userLib = new UserLib( data_san );
}

User.prototype.findById = function( id , callback ){
  var Helper = require(__dirname ).Helper;
  Helper.findById( User , id , function( err , user ){
    user.setUser();
    callback( err , user );
  });
}


User.prototype.findByEmail = function( Model , email , callback ){
  new Model({ email: email })
  .fetch()
  .then( function( user , err){
    if( err ){
      return callback( err , null );
    } 
    user.setUser();
    callback(  err , user ) ;
  })
},

Bookshelf.model( 'User', User );

module.exports = User;


