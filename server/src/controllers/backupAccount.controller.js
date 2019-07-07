/**
 * Controller backup account
 * author: hoc-anms
 * date up: 05/06/2019
 * date to: ___
 * team: BE-RHP
 */
const fs = require( "fs" );
const jsonResponse = require( "../configs/response" );

const AccountController = require( "./account.controller" );

module.exports = {
  /**
   * Backup data from older zinbee
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*|Promise<any>>}
   */
  "index": async ( req, res ) => {
    fs.readFile( __dirname.includes( "/" ) ? __dirname.replace( "controllers", "databases/account_backup.txt" ) : __dirname.replace( "controllers", "databases\\account_backup.txt" ), "utf8", async function ( _err, contents ) {
      contents.split( ",," ).forEach( async ( item ) => {
        const itemObject = JSON.parse( item ),
          objectRes = {
            "name": itemObject.fullname,
            "email": itemObject.email,
            "phone": itemObject.pid,
            "status": new Date( itemObject.expiration_date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3" ) ) > Date.now() ? 1 : 0,
            "expireDate": new Date( itemObject.expiration_date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3" ) ),
            "presenter": itemObject.history_id,
            "other01": itemObject.id
          };

        await AccountController.signUpAccountBackup( objectRes );
      } );
    } );
    res.status( 200 ).json( jsonResponse( "Backup du lieu tai khoan thanh cong!", null ) );
  }
};
