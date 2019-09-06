const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  MarketProductPostSchema = new Schema( {
    "title": String,
    "content": String,
    "photos": Array,
    "assign": { "type": Boolean, "default": 0 },
    "_creator": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "createdAt": {
      "type": Date,
      "default": Date.now()
    },
    "updatedAt": Date
  } );

MarketProductPostSchema.index( {
  "title": "text",
  "content": "text"
} );

MarketProductPostSchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

// eslint-disable-next-line one-var
const MarketProductPost = mongoose.model( "MarketProductPost", MarketProductPostSchema );

MarketProductPost.on( "old.vue", function (error ) {
  if ( error ) {
    console.log( error.message );
  }
} );

module.exports = MarketProductPost;
