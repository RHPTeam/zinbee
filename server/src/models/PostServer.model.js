const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  PostServerSchema = new Schema( {
    "name": String,
    "server": String,
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
const PostServer = mongoose.model( "PostServer", PostServerSchema );

module.exports = PostServer;
