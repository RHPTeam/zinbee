const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,
  MarketProductSchema = new Schema( {
    "name": String,
    "description": String,
    "content": String,
    "typeProduct": Number, // 0 - Post | 1 - Campaign
    "priceCents": String,
    "numberOfSales": { "type": Number, "default": 0 },
    "trending": {
      "type": Boolean,
      "default": false
    },
    "tags": Array,
    "attributes": [
      {
        "name": String,
        "value": String
      }
    ],
    "previews": {
      "thumbnail": String,
      "thumbnailUrl": String,
      "lists": [
        {
          "photoUrl": String,
          "photoTargetUrl": String
        }
      ]
    },
    "summary": String,
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
