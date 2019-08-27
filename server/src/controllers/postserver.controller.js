/**
 * Controller post server for project
 * author: sky albert
 * updater: _________
 * date up: 27/08/2019
 * date to:
 * team: BE-RHP
 */
const PostServer = require( "../models/PostServer.model" );
const jsonResponse = require( "../configs/response" );

module.exports = {
  "index": async ( req, res ) => {
    let data;

    if ( req.query._id ) {
      data = await PostServer.findOne( { "_id": req.query._id } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      data = await PostServer.find( req.query ).lean();
    }

    res.status( 200 ).json( jsonResponse( "success", data ) );
  },
  "create": async ( req, res ) => {
    const newServer = new PostServer( req.body );

    await newServer.save();
    res.status( 200 ).json( jsonResponse( "success", newServer ) );
  },
  "update": async ( req, res ) => {
    // Check validator
    if ( req.query._id === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp server để cập nhật!" } );
    }

    const serverInfo = await PostServer.findOne( { "_id": req.query._id } );

    // Check error
    if ( !serverInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Server này không tồn tại!" } );
    }
    res.status( 200 ).json( jsonResponse( "success", await PostServer.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) ) );
  },
  "delete": async ( req, res ) => {
    if ( req.query._id === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "_serverId": "Vui lòng cung cấp server để xóa!" } );
    }

    const serverInfo = await PostServer.findOne( { "_id": req.query._id } );

    if ( !serverInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Server này không tồn tại!" } );
    }
    await serverInfo.remove();
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "changeStatus": async ( req, res ) => {
    const serverInfo = await PostServer.findOne( { "uid": req.params.uid } );

    // Check error
    if ( !serverInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Server này không tồn tại!" } );
    }
    res.status( 200 ).json( jsonResponse( "success", await PostServer.findByIdAndUpdate( serverInfo._id, { "$set": req.body }, { "new": true } ) ) );
  }
};
