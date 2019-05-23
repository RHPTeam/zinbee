/**
 * Controller server for project
 * author: sky albert
 * updater: _________
 * date up: 21/05/2019
 * date to:
 * team: BE-RHP
 */
const Server = require( "../models/Server.model" );

const jsonResponse = require( "../configs/response" );

module.exports = {
  /**
   * Get server (all or query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    let data;

    if ( req.query._id ) {
      data = await Server.findOne( { "_id": req.query._id } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      data = await Server.find( req.query ).lean();
    }

    res.status( 200 ).json( jsonResponse( "success", data ) );
  },
  /**
   * Create server
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "create": async ( req, res ) => {
    if ( req.body.title.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "title": "Tên của server không được bỏ trống!" } );
    } else if ( req.body.amountMax === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "amountMax": "Số lượng user tối đa của server không được bỏ trống!" } );
    } else if ( req.body.status === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "server": "Trạng thái của server không được bỏ trống!" } );
    } else if ( Object.entries( req.body.info ).length === 0 && req.body.info.constructor === Object ) {
      return res.status( 403 ).json( { "status": "fail", "info": "Cấu hình vps không được bỏ trống!" } );
    }

    const newServer = new Server( req.body );

    await newServer.save();

    res.status( 200 ).json( jsonResponse( "success", newServer ) );
  },
  /**
   * Create server
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    // Check validator
    if ( req.query._id === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp server để cập nhật!" } );
    }

    const serverInfo = await Server.findOne( { "_id": req.query._id } );

    // Check error
    if ( !serverInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Server này không tồn tại!" } );
    }

    if ( req.body.title.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "title": "Tên của server không được bỏ trống!" } );
    } else if ( req.body.amountMax === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "amountMax": "Số lượng user tối đa của server không được bỏ trống!" } );
    } else if ( req.body.status === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "server": "Trạng thái của server không được bỏ trống!" } );
    } else if ( Object.entries( req.body.info ).length === 0 && req.body.info.constructor === Object ) {
      return res.status( 403 ).json( { "status": "fail", "info": "Cấu hình vps không được bỏ trống!" } );
    }

    res.status( 200 ).json( jsonResponse( "success", await Server.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) ) );
  },
  /**
   * Delete server
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    if ( req.query._id === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "_serverId": "Vui lòng cung cấp server để xóa!" } );
    }

    const serverInfo = await Server.findOne( { "_id": req.query._id } );

    if ( !serverInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Server này không tồn tại!" } );
    }

    await serverInfo.remove();

    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
