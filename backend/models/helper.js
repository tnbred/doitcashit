var _ = require("lodash");
var Common = require('doitcashit-lib').DICILib;



var Helper = {
 sanitize: function ( Model , data ) { 
  schema    = Common.Schemas[ Model ];
  schema_ts = {};
  var keys  = Object.keys( schema );

  // for( var i = 0 ; i < keys.length ; i++ ){
  //   if( keys[ i ] != "created_at" && keys[ i ] != "updated_at" && keys[ i ] != "id" && data[ keys[ i ] ] != undefined ){
  //     schema_ts[ keys[ i ] ] = '';
  //   }
  // }
  //   for( var i = 0 ; i < keys.length ; i++ ){
  //   if( (keys[ i ] != "created_at" || (keys[ i ] == "created_at" && data[ keys[ i ] ] != undefined) ) &&
  //    (keys[ i ] != "updated_at" || (keys[ i ] == "updated_at" && data[ keys[ i ] ] != undefined) ) && 
  //    (keys[ i ] != "id" || (keys[ i ] == "id" && data[ keys[ i ] ] != undefined) ) && data[ keys[ i ] ] != undefined  ){
  //     schema_ts[ keys[ i ] ] = '';
  //   }
  // }
  // Ids cannot be saved and the created_at and updated_at fields are set by bookshelf
  // for( var i = 0 ; i < keys.length ; i++ ){
  //   var bool1 = keys[ i ] == "created_at" || keys[ i ] == "updated_at" || keys[ i ] = "id" ;
  //   var bool2 = data[ keys[ i ] ] != undefined
  //   if( ( bool1 && bool2 ) || !bool1 && bool2 ){
  //     schema_ts[ keys[ i ] ] = '';
  // }
  for( var i = 0 ; i < keys.length ; i++ ){
    var bool1 = (keys[ i ] == "created_at" || keys[ i ] == "updated_at" || keys[ i ] == "id" );
    var bool2 = data[ keys[ i ] ] != undefined && data[ keys[ i ] ] != ''
    if( bool2 ){
      schema_ts[ keys[ i ] ] = '';
    }
  }

  data  = data || {};
  data_sanitize =  _.pick(_.defaults(data, schema_ts), _.keys(schema_ts));
  

  if ( data_sanitize.approved   == '' ) data_sanitize.approved    = false ;
  if ( data_sanitize.logincount == '' ) data_sanitize.logincount  = 0 ;
  return( data_sanitize );

},


findById: function( Model , id , callback ){
  new Model({ id: id} )
  .fetch()
  .then( function( model , err){
    if( err ){
      return callback( err , null );
    } 
    callback(  err , model ) ;
  })
},

update_sanitize: function( Model ,  id , data ){
  new Model( {id : id } )
  .fetch()
  .then( function( model , err ) {
    model.save( data , [method="update"])
    if( err ) return err;
  })
}


}

module.exports = Helper




