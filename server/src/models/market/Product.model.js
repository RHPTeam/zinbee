const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,
  MarketProductSchema = new Schema( {
    "name": String,
    "description": String,
    "content": String,
    "typeProduct": Number, // 0 - Post | 1 - Campaign
    "priceCents": { "type": String, "default": "0" },
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
    "_category": {
      "type": Schema.Types.ObjectId,
      "ref": "MarketCategory"
    },
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

MarketProductSchema.index( {
  "name": "text",
  "description": "text",
  "content": "text",
  "tags": "text",
  "summary": "text"
} );

MarketProductSchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

// eslint-disable-next-line one-var
const MarketProduct = mongoose.model( "MarketProduct", MarketProductSchema );

MarketProduct.on( "old.vue", function (error ) {
  if ( error ) {
    console.log( error.message );
  }
} );

module.exports = MarketProduct;
