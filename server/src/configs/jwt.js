const JWT = require( "jsonwebtoken" );
const { findSubString } = require( "../helpers/utils/functions/string" );

module.exports = {
  "signToken": ( user ) => {
    return JWT.sign(
      {
        "iss": "RHPTeam",
        "sub": user._id,
        "iat": new Date().getTime(),
        "exp": new Date().setDate( new Date().getDate() + 3 )
      },
      process.env.APP_KEY
    );
  },
  "signAffiliate": () => {
    return JWT.sign(
      {
        "iss": "RHPTeam",
        "iat": new Date().getTime(),
        "exp": new Date().setDate( new Date().getDate() + 30 )
      },
      process.env.APP_KEY
    );
  },
  "decodeToken": ( token ) => {
    return JWT.verify( findSubString( token, "token=", "&" ), process.env.APP_KEY );
  }
};
