const jwt = require( "jsonwebtoken" );
const Account = require( "../../models/Account.model" );
const { findSubString } = require( "../utils/functions/string" );

/**
 *  The Auth Checker middleware function.
 */

module.exports = ( req, res, next ) => {
  console.log(req.headers);
  if ( !req.headers.authorization ) {
    return res
      .status( 405 )
      .json( { "status": "error", "message": "Vui lòng cung cấp cookie!" } );
  }
  const token = findSubString( req.headers.authorization, "sid=", ";" );

  return jwt.verify( token, process.env.APP_KEY, ( err, decoded ) => {
    if ( err ) {
      return res
        .status( 405 )
        .json( { "status": "error", "message": "Cookie không đúng!" } );
    }
    const userId = decoded.sub;

    return Account.findById( userId, ( userErr, user ) => {
      if ( userErr || !user ) {
        return res
          .status( 405 )
          .json( { "status": "error", "message": "Tài khoản không tồn tại!" } );
      }
      return next();
    } );
  } );
};
