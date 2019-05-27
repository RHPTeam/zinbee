const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  ServerSchema = new Schema( {
    "title": String,
    "info": {
      "domain": String,
      "ip": String,
      "cpu": String,
      "ram": Number,
      "card": {
        "type": String,
        "default": "Không có"
      },
      "supplier": {
        "name": String,
        "url": String
      },
      "expire": String
    },
    "region": {
      "type": Number,
      "default": 0
    },
    "userAmount": [ {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    } ],
    "slot": Number,
    "amountMax": Number,
    "status": Boolean,
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": Date
  } );

ServerSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

/* eslint-disable one-var */
const Server = mongoose.model( "Server", ServerSchema );

module.exports = Server;
