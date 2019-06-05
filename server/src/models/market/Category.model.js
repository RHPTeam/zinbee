const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  MarketCategorySchema = new Schema( {
    "level": Number,
    "name": String,
    "path": String,
    "parent": String,
    "_creator": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_editor": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "createdAt": {
      "type": Date,
      "default": Date.now()
    },
    "updatedAt": Date
  } );

MarketCategorySchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

// eslint-disable-next-line one-var
const MarketCategory = mongoose.model( "MarketCategory", MarketCategorySchema );

module.exports = MarketCategory;
