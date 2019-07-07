/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  LinkSchema = new Schema( {
    "sortLink": String,
    "generateLink": String,
    "totalVisit": {
      "type": Number,
      "default": 0
    },
    "_agency": {
      "type": Schema.Types.ObjectId,
      "ref": "Agency"
    },
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "createdAt": {
      "type": Date,
      "default": Date.now()
    },
    "updatedAt": Date
  } );

LinkSchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

const Link = mongoose.model( "Link", LinkSchema );

module.exports = Link;
