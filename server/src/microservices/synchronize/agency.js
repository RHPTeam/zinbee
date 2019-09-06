const request = require( "axios" );

module.exports = {
  "roleSync": ( url, data, headers ) => {
    console.log(headers)
    return request( {
      "method": "post",
      // eslint-disable-next-line no-nested-ternary
      "url": url,
      "data": data,
      "headers": {
        "Authorization": headers + ","
      }
    } );
  }
};
