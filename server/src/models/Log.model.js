/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  LogSchema = new Schema( {
    "logs": [ {
      "content": String,
      "createdAt": Date,
      "info": Object, // campaignId, eventId, postNowId...
      "status": {
        "type": Number,
        "default": 0
      } // 0: Done, 1: error, 2: Hot fix
    } ],
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": Date
  } );

LogSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const Log = mongoose.model( "Log", LogSchema );

module.exports = Log;
