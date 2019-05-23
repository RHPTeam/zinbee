/**
 * Controller users or account for project
 * author: Sky Albert
 * updater: ___
 * date up: 21/05/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require( "../models/Account.model" );
const Role = require( "../models/Role.model" );

const fs = require( "fs" );
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
  "active": async () => {},
  "signIn": async () => {},
  "signUp": async () => {},
  "signInByAdmin": async () => {

  },
  "signUpByAdmin": async ( req, res ) => {
    // check code admin from headers
    const key = JSON.parse( fs.readFileSync( "./src/databases/key.json" ) );

    console.log( key );
    if ( key.isAdmin.includes( req.headers.token ) ) {
      return;
    }
    console.log( await Role.find( {} ) );
  }

};
