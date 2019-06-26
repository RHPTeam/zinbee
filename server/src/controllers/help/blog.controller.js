/**
 * Controller blogs help for project
 * author: hoc-anms
 * updater:
 * date up: 15/05/2019
 * date to:
 * team: BE-RHP
 */

const BlogHelp = require( "../../models/help/Blog.model" );
const HelpCategory = require( "../../models/help/category.model" );


const jsonResponse = require( "../../configs/response" );

module.exports = {
  "index": async ( req, res ) => {
    console.log( req.uid );

    let data;

    if ( req.query._id ) {
      data = await BlogHelp.findOne( { "_id": req.query._id } ).populate( { "path": "_account", "select": "_id name" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      data = await BlogHelp.find( {} ).populate( { "path": "_account", "select": "_id name" } ).lean();
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", data ) );
  },
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.title === undefined || req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề blog không được bỏ trống!" } } );
    } else if ( req.body.content === undefined || req.body.content === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "content": "Nội dung blog không được bỏ trống!" } } );
    }

    // Create
    const { title, content } = req.body,
      newBlog = await new BlogHelp( {
        "title": title,
        "content": content,
        "_account": req.uid
      } );

    // Save
    await newBlog.save();

    res.status( 201 ).json( jsonResponse( "success", newBlog ) );
  },
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === undefined || req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề blog không được bỏ trống!" } } );
    } else if ( req.body.content === undefined || req.body.content === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "content": "Nội dung blog không được bỏ trống!" } } );
    }

    const { title, content } = req.body,
      blogInfo = await BlogHelp.findOne( { "_id": req.query._id } ).lean();

    // Check error
    if ( !blogInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Bài viết không tồn tại!" } );
    }

    // Concat vote
    if ( req.body.vote ) {
      await Promise.all( blogInfo.vote.map( ( v ) => {
        delete v._id;
      } ) );
      req.body.vote = req.body.vote.concat( blogInfo.vote );
    }

    res.status( 200 ).json( jsonResponse( "success", await BlogHelp.findByIdAndUpdate( req.query._id, { "$set": { "title": title, "content": content, "vote": req.body.vote, "_account": req.uid } }, { "new": true } ) ) );
  },
  "delete": async ( req, res ) => {
    const blogInfo = await BlogHelp.findOne( { "_id": req.query._id } ),
      categoryContainBlog = await HelpCategory.findOne( { "_blogHelp": req.query._id } );

    // Check error
    if ( !blogInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Bài viết không tồn tại!" } );
    }

    if ( categoryContainBlog ) {
      categoryContainBlog._blogHelp.pull( req.query._id );
      await categoryContainBlog.save();
    }

    await blogInfo.remove();

    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "search": async ( req, res ) => {
    if ( req.query.keyword === undefined ) {
      return res.status( 404 ).json( { "status": "fail", "keyword": "Vui lòng cung cấp từ khóa để tìm kiếm!" } );
    }

    let page = null, dataResponse = null, data = ( await BlogHelp.find( { "$text": { "$search": `\"${req.query.keyword}\"`, "$language": "none" } } ).sort( { "vote": "desc" } ).lean() );

    if ( req.query._size && req.query._page ) {
      dataResponse = data.slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = data.slice( 0, Number( req.query._size ) );
    }

    if ( req.query._size ) {
      if ( data.length % req.query._size === 0 ) {
        page = Math.floor( data.length / req.query._size );
      } else {
        page = Math.floor( data.length / req.query._size ) + 1;
      }
    }

    return res
      .status( 200 )
      .json( jsonResponse( "success", { "results": dataResponse, "page": page, "total": data.length } ) );
  }
};
