const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  HelpCategorySchema = new Schema( {
    "label": String,
    "title": String,
    "description": String,
    "content": String,
    "icon": String,
    "level": {
      "type": Number,
      "default": 1
    }, // 1 2 3
    "parent": String,
    "_blogHelp": [ {
      "type": Schema.Types.ObjectId,
      "ref": "BlogHelp"
    } ],
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    }
  } ),

  HelpCategory = mongoose.model( "HelpCategory", HelpCategorySchema );

module.exports = HelpCategory;
