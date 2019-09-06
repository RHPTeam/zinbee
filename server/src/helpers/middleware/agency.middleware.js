const Account = require( "../../models/Account.model" );
const Role = require( "../../models/Role.model" );
const { findSubString } = require( "../utils/functions/string" );

module.exports = async ( req, res, next ) => {
  const isAllowed = async ( id ) => {
    const userInfo = await Account.findOne( { "_id": id } ),
      roleInfo = await Role.findOne( { "_id": userInfo._role } );

    return !( roleInfo.level.toLowerCase() !== "agency" && roleInfo.level.toLowerCase() !== "admin" && roleInfo.level.toLowerCase() !== "superadmin" );
  };

  if ( await isAllowed( findSubString( req.headers.authorization, "uid=", ";" ) ) ) {
    req.uid = findSubString( req.headers.authorization, "uid=", ";" );
    next();
  } else {
    res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền truy cập!" } );
  }
};
