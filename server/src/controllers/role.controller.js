/**
 * Controller blogs help for project
 * author: sky albert
 * updater: _________
 * date up: 20/05/2019
 * date to:
 * team: BE-RHP
 */
const Role = require( "../models/Role.model" );

const decodeRole = require( "../helpers/utils/role.util" );
const jsonResponse = require( "../configs/response" );

module.exports = {
  /**
   * Get help (all or query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    if ( req.headers.cfr === undefined ) {
      return res.status( 405 ).json( { "status": "error", "message": "Không thể xác thực được quyền của bạn!" } );
    }

    let dataResponse = null,
      role = req.headers.cfr;

    if ( decodeRole( role, 10 ) !== 1 && decodeRole( role, 10 ) !== 2 ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho chức năng này!" } );
    }

    dataResponse = await Role.find( {} ).lean();

    if ( dataResponse.length === 0 ) {
      return res.status( 404 ).json( { "status": "error", "message": "Không có quyền được thiết lập trên hệ thống!" } );
    }

    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
  }
};
