const axios = require( "axios" );

module.exports = {
  "signUp": ( url, data ) => {
    return axios( {
      "method": "post",
      "url": url,
      "data": data
    } );
  },
  "signIn": ( url, data ) => {
    return axios( {
      "method": "post",
      "url": url,
      "data": data
    } );
  }
};
