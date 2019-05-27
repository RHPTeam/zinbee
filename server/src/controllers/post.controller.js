/**
 * Controller post facebook for project
 * author: Sky Albert
 * updater: ___
 * date up: 20/05/2019
 * date to: 23/05/2019
 * team: BE-RHP
 */
const PostFacebook = require( "../models/Post.model" );

const jsonResponse = require( "../configs/response" );
const dictionary = require( "../configs/dictionaries" );

module.exports = {
  "create": async ( req, res ) => {
    const newPostFacebook = new PostFacebook( { "title": dictionary.DEFAULT_NAME_POST, "_account": req.uid } );

    await newPostFacebook.save();
    res.status( 200 ).json( jsonResponse( "success", newPostFacebook ) );
  },
  "index": async ( req, res ) => {
    let page = null, dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await PostFacebook.find( { "_id": req.query._id } ).populate( { "path": "_account", "select": "_id name" } ).lean();
    } else if ( req.query._size && req.query._page ) {
      dataResponse = ( await PostFacebook.find( {} ).sort( { "share": "desc", "vote": "desc", "like": "desc" } ).populate( { "path": "_account", "select": "_id name" } ).lean() ).slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = ( await PostFacebook.find( {} ).sort( { "share": "desc", "vote": "desc", "like": "desc" } ).populate( { "path": "_account", "select": "_id name" } ).lean() ).slice( 0, Number( req.query._size ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await PostFacebook.find( req.query ).sort( { "share": "desc", "vote": "desc", "like": "desc" } ).populate( { "path": "_account", "select": "_id name" } ).lean();
    }

    if ( req.query._size ) {
      if ( ( await PostFacebook.find( {} ) ).length % req.query._size === 0 ) {
        page = Math.floor( ( await PostFacebook.find( {} ) ).length / req.query._size );
      } else {
        page = Math.floor( ( await PostFacebook.find( {} ) ).length / req.query._size ) + 1;
      }

      return res
        .status( 200 )
        .json( jsonResponse( "success", { "results": dataResponse, "page": page } ) );
    }

    // Check when user get one
    if ( req.query._id ) {
      dataResponse = dataResponse[ 0 ];
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );

  },
  "update": async ( req, res ) => {
    const postInfo = await PostFacebook.findById( req.query._id );

    // Check error
    if ( !postInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Bài đăng không tồn tại!" } );
    }

    // Check update post if user upload file
    if ( req.files && req.files.length > 0 ) {
      const attachmentsList = req.files.map( ( file ) => {
        if ( file.fieldname === "attachments" && file.mimetype.includes( "image" ) ) {
          return {
            "link": `${process.env.APP_URL}:${process.env.PORT_BASE}/${file.path}`,
            "typeAttachment": 1
          };
        }
      } );

      postInfo.attachments = postInfo.attachments.concat( attachmentsList );
      await postInfo.save();
      return res.status( 201 ).json( jsonResponse( "success", postInfo ) );
    }

    // Random like and share by system
    req.body.share = Math.floor( Math.random() * 2000 ) + 700;
    req.body.like = Math.floor( Math.random() * 3000 ) + 800;

    res.status( 201 ).json( jsonResponse( "success", await PostFacebook.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) ) );
  },
  "delete": async ( req, res ) => {
    // Check if don't use query
    if ( req.query._id === undefined || req.query._id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp query _id để xác thực bài viết muốn xóa!" } );
    }

    const postInfo = await PostFacebook.findOne( { "_id": req.query._id } );

    // Check error
    if ( !postInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Bài đăng không tồn tại!" } );
    }

    // Remove a file attachments in post
    if ( req.query._attachmentId ) {
      const postInfoContainAttachment = await PostFacebook.findOne( { "_id": req.query._id, "attachments._id": req.query._attachmentId } );

      if ( !postInfoContainAttachment ) {
        return res.status( 404 ).json( { "status": "error", "message": "Ảnh không tồn tại trong bài đăng này!" } );
      }
      PostFacebook.updateOne( { "_id": req.query._id }, { "$pull": { "attachments": { "_id": req.query._attachmentId } } }, ( err ) => {
        if ( err ) {
          return res.status( 500 ).json( { "status": "error", "message": "Hệ thống xảy ra lỗi trong quá trình xóa" } );
        }
      } );
      return res.status( 200 ).json( jsonResponse( "success", null ) );
    }

    // Remove postFacebook
    await postInfo.remove();
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "search": async ( req, res ) => {
    if ( req.query.keyword === undefined ) {
      return res.status( 404 ).json( { "status": "fail", "keyword": "Vui lòng cung cấp từ khóa để tìm kiếm!" } );
    }

    let page = null, dataResponse = null, data = ( await PostFacebook.find( { "$text": { "$search": req.query.keyword, "$language": "none" } } ).sort( { "share": "desc", "vote": "desc", "like": "desc" } ).lean() );

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
      .json( jsonResponse( "success", { "results": dataResponse, "page": page } ) );
  }
};
