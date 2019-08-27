const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  HelpCategorySchema = new Schema( {
    "label": String,
    "title": String,
    "slug": String,
    "description": String,
    "photo": String,
    "level": {
      "type": Number,
      "default": 1
    }, // 1 2 3
    "parent": String,
    "_blogHelp": [ {
      "type": Schema.Types.ObjectId,
      "ref": "BlogHelp"
    } ],
    "popularBlog": [ {
      "type": Schema.Types.ObjectId,
      "ref": "BlogHelp"
    } ],
    "relatedCategory": [ {
      "type": Schema.Types.ObjectId,
      "ref": "HelpCategory"
    } ],
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    }
  } ),

  HelpCategory = mongoose.model( "HelpCategory", HelpCategorySchema );

module.exports = HelpCategory;
