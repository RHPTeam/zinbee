/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  CodeSchema = new Schema( {
    "code": {
      "type": String,
      "unique": true
    },
    "typeExpire": { // option 1 month, 6 month...
      "type": Number,
      "default": 1
    },
    "expireDate": Date, // expire date code
    "numberOfUser": { // total number of users
      "type": Number,
      "default": 0
    },
    "maxUser": Number,
    "_editor": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_creator": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": Date
  } );

CodeSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const Code = mongoose.model( "Code", CodeSchema );

module.exports = Code;
