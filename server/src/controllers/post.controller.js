/**
 * Controller post facebook for project
 * author: Sky Albert
 * updater: ___
 * date up: 20/05/2019
 * date to: 23/05/2019
 * team: BE-RHP
 */
// eslint-disable-next-line no-extend-native
Object.defineProperty( Array.prototype, "flat", {
  "value": function( depth = 1 ) {
    return this.reduce( function ( flat, toFlatten ) {
      return flat.concat( ( Array.isArray( toFlatten ) && ( depth > 1 ) ) ? toFlatten.flat( depth - 1 ) : toFlatten );
    }, [] );
  }
} );

const PostFacebook = require( "../models/Post.model" );
const MarketProductPost = require( "../models/market/products/post.model" );
const CategoryDefault = require( "../models/CategoryDefault.model" );
const Account = require( "../models/Account.model" );
const Server = require( "../models/Server.model" );

const jsonResponse = require( "../configs/response" );
const dictionary = require( "../configs/dictionaries" ),
  convertUnicode = require( "../helpers/utils/unicode.util" ),
  { syncPostFolderExample, syncFolderExample, syncKeyWordSearch } = require( "../microservices/synchronize/post" );


const { searchPost } = require( "../controllers/core/search.core" ),
  { agent, cookie } = require( "../configs/crawl" );

module.exports = {
  "sync": async( req, res ) => {
    const keywordsList = ( await Account.find( {} )
        .select( "keywords" )
        .lean() ).map( ( account ) => account.keywords ).flat( 1 ),
      postList = await PostFacebook.find( { "generate": 1 } )
        .select( "feedId" )
        .lean();

    res.send( {
      "keywords": keywordsList,
      "data": postList
    } );
  },
  "create": async ( req, res ) => {
    const newPostFacebook = new PostFacebook( { "title": dictionary.DEFAULT_NAME_POST, "_account": req.uid } );

    await newPostFacebook.save();

    res.status( 200 ).json( jsonResponse( "success", newPostFacebook ) );
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
  "insert": async ( req, res ) => {
    console.log( req.body );
    await PostFacebook.insertMany( req.body, function( error ) {
      if ( error ) {
        console.log( error );
      }
      console.log( "successfully!" );
    } );

    res.send( { "status": "success", "data": null } );
  },
  "search": async ( req, res ) => {
    if ( req.query.keyword === undefined ) {
      return res.status( 404 ).json( { "status": "fail", "keyword": "Vui lòng cung cấp từ khóa để tìm kiếm!" } );
    }
    const userInfo = await Account.findOne( { "_id": req.uid } ).select( "-password" ),
      vpsContainServer = await Server.findOne( { "userAmount": userInfo._id } ).select( "info" ).lean();

    let page = null, dataResponse = null, data = ( await PostFacebook.find( { "$text": { "$search": `\"${req.query.keyword}\"`, "$language": "none" } } ).sort( { "share": "desc", "vote": "desc", "like": "desc" } ).lean() ), resKeywordSync,
      keywordExist = ( content ) => {
        return userInfo.keywordSearch.some( function( el ) {
          return convertUnicode( el.content.toLowerCase() ) === content;
        } );
      };

    // Check key word exists in db of acc
    if ( keywordExist( convertUnicode( req.query.keyword.toLowerCase() ) ) === false ) {
      await Account.findByIdAndUpdate( { "_id": req.uid }, { "$push": { "keywordSearch": { "content": req.query.keyword, "time": Date.now() } } }, { "new": true } ).select( "-password" );
      resKeywordSync = await syncKeyWordSearch( `${vpsContainServer.info.domain}:${vpsContainServer.info.serverPort}/api/v1/users/search`, { "content": req.query.keyword, "time": Date.now() }, req.headers.authorization );
      if ( resKeywordSync.data.status !== "success" ) {
        return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
      }
    }

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

    req.body.content = req.body.content.replace( /(<br \/>)|(<br>)/gm, "\n" ).replace( /(<\/p>)|(<\/div>)/gm, "\n" ).replace( /(<([^>]+)>)/gm, "" );

    res.status( 201 ).json( jsonResponse( "success", await PostFacebook.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) ) );
  },
  "searchLive": async ( req, res ) => {
    if ( req.query.keyword === undefined ) {
      return res.status( 404 ).json( { "status": "fail", "keyword": "Vui lòng cung cấp từ khóa để tìm kiếm!" } );
    }
    const userInfo = await Account.findOne( { "_id": req.uid } ).select( "-password" ),
      vpsContainServer = await Server.findOne( { "userAmount": userInfo._id } ).select( "info" ).lean();
    let listPostByKeyword,
      page = null, dataResponse = null, resKeywordSync,
      keywordExist = ( content ) => {
        return userInfo.keywordSearch.some( function( el ) {
          return convertUnicode( el.content.toLowerCase() ) === content;
        } );
      };

    // Check key word exists in db of acc
    if ( keywordExist( convertUnicode( req.query.keyword.toLowerCase() ) ) === false ) {
      await Account.findByIdAndUpdate( { "_id": req.uid }, { "$push": { "keywordSearch": { "content": req.query.keyword, "time": Date.now() } } }, { "new": true } ).select( "-password" );
      resKeywordSync = await syncKeyWordSearch( `${vpsContainServer.info.domain}:${vpsContainServer.info.serverPort}/api/v1/users/search`, { "content": req.query.keyword, "time": Date.now() }, req.headers.authorization );
      if ( resKeywordSync.data.status !== "success" ) {
        return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
      }
    }

    // Search post by keyword
    listPostByKeyword = await searchPost( {
      "keyword": req.query.keyword,
      "number": req.query.preset,
      "cookie": cookie || null,
      "agent": agent
    } );
    // Handle like, share and photos
    listPostByKeyword = await Promise.all( listPostByKeyword.map( async ( post ) => {
      post.content = post.markup;
      post.feedId = post.postID;
      post.generate = 1;

      delete post.markup;
      delete post.postID;

      // Like
      if ( post.like === "" ) {
        post.like = 0;
      } else if ( post.like === null || post.like === undefined ) {
        post.like = Math.floor( Math.random() * 200 ) + 1;
      } else if ( post.like.includes( "," ) && post.like.includes( "K" ) ) {
        post.like = ( ( post.like.match( /(\d+,)/g ).toString().replace( ",", "" )[ 0 ] ) * 1000 ) + ( post.like.match( /(,\d+)/g ).toString().replace( ",", "" )[ 0 ] ) * 100;
      } else if ( post.like.includes( "K" ) ) {
        post.like = ( post.like.match( /\d+/g )[ 0 ] ) * 1000;
      } else {
        post.like = ( post.like.match( /\d+/g )[ 0 ] ) * 1;
      }

      // Share
      if ( post.share === "" ) {
        post.share = 0;
      } else if ( post.share === null || post.share === undefined ) {
        post.share = Math.floor( Math.random() * 200 ) + 1;
      } else if ( post.share.includes( "," ) && post.share.includes( "K" ) ) {
        post.share = ( ( post.share.match( /(\d+,)/g ).toString().replace( ",", "" )[ 0 ] ) * 1000 ) + ( post.share.match( /(,\d+)/g ).toString().replace( ",", "" )[ 0 ] ) * 100;
      } else if ( post.share.includes( "K" ) ) {
        post.share = ( post.share.match( /\d+/g )[ 0 ] ) * 1000;
      } else {
        post.share = ( post.share.match( /\d+/g )[ 0 ] ) * 1;
      }

      // Photos
      if ( post.photos.length > 0 ) {
        post.photos = await Promise.all( post.photos.map( ( photo ) => {
          return {
            "link": photo,
            "typeAttachment": 1
          };
        } ) );
      }

      return post;
    } ) );

    if ( req.query._size && req.query._page ) {
      dataResponse = listPostByKeyword.slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = listPostByKeyword.slice( 0, Number( req.query._size ) );
    }

    if ( req.query._size ) {
      if ( listPostByKeyword.length % req.query._size === 0 ) {
        page = Math.floor( listPostByKeyword.length / req.query._size );
      } else {
        page = Math.floor( listPostByKeyword.length / req.query._size ) + 1;
      }
    }

    return res
      .status( 200 )
      .json( jsonResponse( "success", { "results": dataResponse, "page": page } ) );
  },
  "duplicateFolder": async ( req, res ) => {
    const findCategoryDefault = await CategoryDefault.findOne( { "_id": req.query._categoryId } ).populate( { "path": "postList", "select": "_id title photos content " } ).lean(),
      userInfo = await Account.findOne( { "_id": req.uid } ),
      vpsContainServer = await Server.findOne( { "userAmount": userInfo._id } ).select( "info" ).lean(),
      resData = await Promise.all( findCategoryDefault.postList.map( async ( item ) => {
        item._account = req.uid;
        item.attachments = await Promise.all( item.photos.map( ( image ) => {
          return {
            "link": image,
            "typeAttachment": 1
          };
        } ) );
        delete item.photos;
        return item;
      } ) ),
      postId = await Promise.all( findCategoryDefault.postList.map( ( item ) => {
        return item._id;
      } ) );

    let data = {
        "categoryPost": {
          "_id": findCategoryDefault._id.toString(),
          "title": `${findCategoryDefault.title} Copy`,
          "_account": req.uid
        },
        "postList": resData,
        "postId": postId
      },
      resFolderSync = await syncFolderExample( `${vpsContainServer.info.domain}:${vpsContainServer.info.serverPort}/api/v1/posts/sync/duplicate/folder`, data, req.headers.authorization );

    if ( resFolderSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }
    res.status( 200 ).json( jsonResponse( "success", resFolderSync.data.data ) );
  },
  "duplicate": async ( req, res ) => {
    const findPost = await MarketProductPost.findOne( { "_id": req.query._postId } ),
      userInfo = await Account.findOne( { "_id": req.uid } ),
      vpsContainServer = await Server.findOne( { "userAmount": userInfo._id } ).select( "info" ).lean();

    // Check catch when duplicate
    if ( !findPost ) {
      return res.status( 404 ).json( { "status": "error", "message": "Bài viết không tồn tại!" } );
    }

    let attachments = await Promise.all( findPost.photos.map( ( image ) => {
        return {
          "link": image,
          "typeAttachment": 1
        };
      } ) ),
      data = {
        "title": `${findPost.title} Copy`,
        "content": findPost.content,
        "attachments": attachments,
        "_account": req.uid
      },
      resPostSync = await syncPostFolderExample( `${vpsContainServer.info.domain}:${vpsContainServer.info.serverPort}/api/v1/posts/sync/duplicate`, data, req.headers.authorization );


    if ( resPostSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }

    res.status( 200 ).json( jsonResponse( "success", resPostSync.data.data ) );
  }
};
