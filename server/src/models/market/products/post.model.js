const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  MarketProductPostSchema = new Schema( {
    "title": String,
    "content": String,
    "photos": Array,
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

MarketProductPostSchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

// eslint-disable-next-line one-var
const MarketProductPost = mongoose.model( "MarketProductPost", MarketProductPostSchema );

module.exports = MarketProductPost;
