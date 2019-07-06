/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  BlogHelpSchema = new Schema( {
    "title": String,
    "content": String,
    "vote": [
      {
        "typeVote": Number, // 0: no 1: yes
        "contentVote": String
      }
    ],
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    }
  } );

BlogHelpSchema.index( {
  "title": "text",
  "content": "text"
} );

BlogHelpSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );


const BlogHelp = mongoose.model( "BlogHelp", BlogHelpSchema );

BlogHelp.on( "old.vue", function(error ) {
  if ( error ) {
    console.log( error.message );
  }
} );

module.exports = BlogHelp;
