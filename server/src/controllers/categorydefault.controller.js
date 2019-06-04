/**
 * Controller categories default - When user create
 * author: hoc-anms
 * updater: trantoan
 * date up: 20/04/2019
 * date to: 02/05/2019
 * team: BE-RHP
 */
// const Post = require( "../models/Post.model" );
const CategoryDefault = require( "../models/CategoryDefault.model" );

const jsonResponse = require( "../configs/response" );

module.exports = {
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await CategoryDefault.findOne( { "_id": req.query._id } ).populate( "_posts" ).populate( { "path": "_account", "select": "name imageAvatar" } ).populate( { "path": "_editor", "select": "name imageAvatar" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await CategoryDefault.find( {} ).populate( "_posts" ).populate( { "path": "_account", "select": "name imageAvatar" } ).populate( { "path": "_editor", "select": "name imageAvatar" } ).lean();
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  },
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề danh mục không được bỏ trống!" } } );
    }

    // Handle create with mongodb
    const newCategoryDefault = await new CategoryDefault( {
      "title": req.body.title,
      "description": req.body.description,
      "_account": req.uid
    } );

    // Save mongodb
    await newCategoryDefault.save();

    res.status( 200 ).json( jsonResponse( "success", newCategoryDefault ) );
  },
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề danh mục không được bỏ trống!" } } );
    }

    const categoryDefaultInfo = await CategoryDefault.findOne( { "_id": req.query._id } );

    // Check catch when update post categories
    if ( !categoryDefaultInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục không tồn tại!" } );
    }

    // Last person update
    req.body._editor = req.uid;

    res.status( 201 ).json( jsonResponse( "success", await CategoryDefault.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) ) );
  },
  "delete": async ( req, res ) => {
    const categoryDefaultInfo = await CategoryDefault.findOne( { "_id": req.query._id } );

    // Check catch when delete post categories
    if ( !categoryDefaultInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục không tồn tại!" } );
    }

    await CategoryDefault.findByIdAndRemove( req.query._id );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "createPostByCategory": async ( req, res ) => {
    const categoryDefaultInfo = await CategoryDefault.findOne( { "_id": req.query._id } );

    // Check catch when delete post categories
    if ( !categoryDefaultInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục không tồn tại!" } );
    }

    if ( categoryDefaultInfo._posts.includes( req.params.categoryId ) ) {
      return res.status( 403 ).json( { "status": "fail", "_posts": "Bài viết đã tồn tại trong danh mục!" } );
    }

    await categoryDefaultInfo.save();

    res.status( 200 ).json( jsonResponse( "success", categoryDefaultInfo ) );
  },
  "removePostByCategory": async ( req, res ) => {
    const categoryDefaultInfo = await CategoryDefault.findOne( { "_id": req.query._id } );

    // Check catch when delete post categories
    if ( !categoryDefaultInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục không tồn tại!" } );
    }

    categoryDefaultInfo._posts.pull( req.params.categoryId );

    await categoryDefaultInfo.save();

    res.status( 200 ).json( jsonResponse( "success", categoryDefaultInfo ) );
  }
};
