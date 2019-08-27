const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  PostServerSchema = new Schema( {
    "name": String,
    "status": Boolean,
    "uid": String,
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": Date
  } );

PostServerSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

/* eslint-disable one-var */
const PostServer = mongoose.model( "Server", PostServerSchema );

module.exports = PostServer;
