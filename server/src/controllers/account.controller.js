/**
 * Controller users or account for project
 * author: Sky Albert
 * updater: ___
 * date up: 21/05/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require( "../models/Account.model" );

const jsonResponse = require( "../configs/response" );

module.exports = {
  "index": async () => {
    const dataFound = await Account.find( req.query )
      .select( "-password" )
      .populate( {
        "path": "_role",
        "select": "level"
      } );

    if ( !dataFound ) {
      return res.status( 403 ).json( jsonResponse( "Data is not found!", null ) );
    }
    res.status( 200 ).json( jsonResponse( "Data fetch successfully!", dataFound ) );
  },
  /**
   *  Update User (Note: Have to header['Authorization']
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "update": async () => {},
  /**
   * Delete user
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "delete": async () => {},
  /** *
   * Change password for user
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "active": async () => {}

};
