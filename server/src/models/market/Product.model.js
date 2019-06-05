const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  MarketProductSchema = new Schema( {
    "name": String,
    "path": String,
    "parent": String,
    "_creator": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "createdAt": {
      "type": Date,
      "default": Date.now()
    },
    "updatedAt": Date
  } ),

  MarketProduct = mongoose.model( "MarketProduct", MarketProductSchema );

MarketProductSchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

module.exports = MarketProduct;
