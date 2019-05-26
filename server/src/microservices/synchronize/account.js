const request = require( "axios" );

module.exports = {
  "signUpSync": ( url, data ) => {
    return request( {
      "method": "post",
      "url": url,
      "data": data
    } );
  }
};
