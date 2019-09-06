const request = require( "axios" );

module.exports = {
  "createSyncFromMarket": ( url, data, headers ) => {
    return request( {
      "method": "post",
      "url": url,
      "data": data,
      "headers": headers
    } );
  }
};
