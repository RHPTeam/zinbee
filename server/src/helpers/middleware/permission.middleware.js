const Account = require( "../../models/Account.model" );
const Role = require( "../../models/Role.model" );

module.exports = async ( req, res, next ) => {
  const isAllowed = async ( id ) => {
    const userInfo = await Account.findOne( { "_id": id } ),
      roleInfo = await Role.findOne( { "_id": userInfo._role } );

    if ( roleInfo.level.toLowerCase() !== "admin" && roleInfo.level.toLowerCase() !== "superadmin" ) {
      return false;
    }
    return true;
  };

  if ( await isAllowed( req.headers.uid ) ) {
    next();
  } else {
    res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền truy cập!" } );
  }
};
