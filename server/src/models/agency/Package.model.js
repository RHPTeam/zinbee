/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  PackageSchema = new Schema( {
    "title": String,
    "total": { // Months
      "type": Number,
      "default": 0
    },
    "totalAgency": {
      "type": Number,
      "default": 0
    },
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

PackageSchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

const Package = mongoose.model( "Package", PackageSchema );

module.exports = Package;
