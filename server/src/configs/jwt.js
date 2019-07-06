const JWT = require( "jsonwebtoken" );

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
  }
};
