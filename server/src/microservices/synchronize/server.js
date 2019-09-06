const request = require( "axios" );

module.exports = {
  "syncUpdateCookie": ( url, data ) => {
    return request( {
      "method": "patch",
      "url": url,
      "data": data
    } );
  }
};
