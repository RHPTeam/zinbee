/**
 * Controller blogs help for project
 * author: sky albert
 * updater: _________
 * date up: 20/05/2019
 * date to:
 * team: BE-RHP
 */
const Role = require( "../models/Role.model" );

const jsonResponse = require( "../configs/response" );

module.exports = {
  /**
   * Get help (all or query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    const roleList = await Role.find( {} ).lean();

    if ( roleList.length === 0 ) {
      return res.status( 404 ).json( { "status": "error", "message": "Không có quyền được thiết lập trên hệ thống!" } );
    }

    res.status( 200 ).json( jsonResponse( "success", roleList ) );
  },
  "sync": async ( _req, res ) => {
    const roleList = await Role.find( {} ).select( "_id level" ).lean();

    if ( roleList.length === 0 ) {
      return res.send( { "status": "error", "message": "Không có quyền được thiết lập trên hệ thống!" } );
    }

    res.send( { "status": "success", "data": roleList } );
  }
};
