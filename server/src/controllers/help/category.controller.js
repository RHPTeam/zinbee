/**
 * Controller help categories for project
 * author: hoc-anms
 * updater: Tran Toan (Sky Albert)
 * date up: 15/05/2019
 * date to: 16/07/2019
 * team: BE-RHP
 */

const BlogHelp = require( "../../models/help/Blog.model" );
const HelpCategory = require( "../../models/help/Category.model" );

const jsonResponse = require( "../../configs/response" );

let getNestedChildren = ( arr, parent ) => {
  if ( arr.length > 0 ) {
    const out = [];

    for ( let i in arr ) {
      if ( arr[ i ].parent.toString() === parent.toString() ) {
        let children = getNestedChildren( arr, arr[ i ]._id );

        if ( children.length ) {
          arr[ i ].children = children;
        }
        out.push( arr[ i ] );
      }
    }
    return out;
  }
};

module.exports = {
  "index": async ( req, res ) => {
    let data;

    if ( req.query._id ) {
      data = await HelpCategory.findOne( { "_id": req.query._id } ).populate( "_blogHelp" ).lean();

      console.log( 1 );

      if ( data.parent && data.parent.length > 0 ) {
        data.parent = await HelpCategory.findOne( { "_id": data.parent } );
      }

      // check popular blog
      const childCategoryInfo = await HelpCategory.find( { "parent": data._id } ).populate( "_blogHelp" ).lean();

      let tempBlogList = [];

      await Promise.all( childCategoryInfo.map( ( category ) => {
        tempBlogList = tempBlogList.concat( category._blogHelp );
      } ) );

      data.popularBlog = tempBlogList.splice( 0, 4 );

      // check related category
      data.relatedCategory = ( await HelpCategory.find( { "level": data.level === null ? 0 : data.level, "parent": data.parent._id } ).limit( 3 ).lean() ).filter( ( category ) => category._id.toString() !== data._id.toString() );

      // eslint-disable-next-line one-var
      const categoryList = await HelpCategory.find( {} ).populate( "_blogHelp" ).lean();

      data.megamenu = getNestedChildren( categoryList, "" );

      // eslint-disable-next-line one-var
      let megamenuList = [];

      await Promise.all( getNestedChildren( categoryList, "" ).map( ( category ) => {
        if ( category.children ) {
          megamenuList = megamenuList.concat( category.children );
        }
      } ) );

      data.megamenu = megamenuList;
    } else if ( req.query._type === "rs" ) {
      data = await HelpCategory.find( {} ).populate( "_blogHelp" ).lean();
      data = getNestedChildren( data, "" );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      data = await HelpCategory.find( {} ).populate( "_blogHelp" ).lean();
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", data ) );

  },
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" || !req.body.title ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề blog không được bỏ trống!" } } );
    }

    let newCategory;

    // Create
    const { title, parent } = req.body;

    // Set default parent
    req.body.level = 0;

    // Handle parent category id
    if ( parent !== undefined && parent !== "" ) {
      const categoryParent = await HelpCategory.findOne( { "_id": parent } );

      if ( !categoryParent ) {
        return res.status( 404 ).json( { "status": "error", "message": "Danh mục cha không tồn tại!" } );
      }

      req.body.level = parseInt( categoryParent.level ) + 1;
    }

    newCategory = await new HelpCategory( {
      "title": title,
      "label": req.body.label,
      "description": req.body.description,
      "content": req.body.content,
      "icon": req.body.icon,
      "level": req.body.level,
      "parent": parent !== undefined && parent !== "" ? parent : "",
      "_blogHelp": req.body._blogHelp,
      "_account": req.uid
    } );

    // Save mongodb
    await newCategory.save();

    res.status( 200 ).json( jsonResponse( "success", newCategory ) );
  },
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" || !req.body.title ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề blog không được bỏ trống!" } } );
    }

    const categoryInfo = await HelpCategory.findOne( { "_id": req.query._id } ).lean();

    // Check error
    if ( !categoryInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục help không tồn tại!" } );
    }

    categoryInfo.title = req.body.title;
    categoryInfo.label = req.body.label;
    categoryInfo.description = req.body.description;
    categoryInfo.content = req.body.content;
    categoryInfo.icon = req.body.icon;

    // Check logic
    if ( req.body.parent ) {
      const categoryParent = await HelpCategory.findOne( { "_id": req.body.parent } );

      if ( categoryInfo.level < categoryParent.level ) {
        return res.status( 404 ).json( { "status": "error", "message": "Bạn không thể cập nhật danh mục nhỏ cấp hơn danh mục hiện tại làm cha!" } );
      }

      categoryInfo.parent = req.body.parent;
      categoryInfo.level = parseInt( categoryParent.level ) + 1;
    }

    // Assign new admin
    categoryInfo._blogHelp = req.body._blogHelp ? req.body._blogHelp : [];
    categoryInfo._account = req.uid;

    res.status( 201 ).json( jsonResponse( "success", await HelpCategory.findByIdAndUpdate( req.query._id, { "$set": categoryInfo }, { "new": true } ) ) );

  },
  "delete": async ( req, res ) => {
    const categoryInfo = await HelpCategory.findById( req.query._id );

    if ( !categoryInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục không tồn tại!" } );
    }

    // When delete auto which all of help of that auto will deleted
    await Promise.all( categoryInfo._blogHelp.map( async ( id ) => {
      await BlogHelp.findByIdAndRemove( id );
    } ) );

    await categoryInfo.remove();

    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "upload": async ( req, res ) => {
    console.log( "cak" );
    if ( !req.file ) {
      return res.status( 403 ).json( { "status": "fail", "photos": "Không có ảnh upload, vui lòng kiểm tra lại!" } );
    }

    // Check object file
    if ( req.file.fieldname === "file" && req.file.mimetype.includes( "image" ) ) {
      return res.status( 200 ).json( { "status": "success", "data": `${process.env.APP_URL}:${process.env.PORT_BASE}/${req.file.path.replace( /\\/gi, "/" )}` } );
    }
  }
};
