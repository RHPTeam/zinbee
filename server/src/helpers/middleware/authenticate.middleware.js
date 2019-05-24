const jwt = require( "jsonwebtoken" );
const Account = require( "../../models/Account.model" );

/**
 *  The Auth Checker middleware function.
 */

module.exports = ( req, res, next ) => {
  if ( !req.headers.authorization ) {
    return res
      .status( 405 )
      .json( { "status": "error", "message": "Vui lòng cung cấp cookie!" } );
  }
  const token = req.headers.authorization;

  return jwt.verify( token, process.env.APP_KEY, ( err, decoded ) => {
    if ( err ) {
      return res
        .status( 405 )
        .json( { "status": "error", "message": "Cookie không đúng!" } );
    }
    const email = decoded.sub;

    return Account.findOne( { "email": email }, ( userErr, user ) => {
      if ( userErr || !user ) {
        return res
          .status( 405 )
          .json( { "status": "error", "message": "Tài khoản không tồn tại!" } );
      }
      return next();
    } );
  } );
};
