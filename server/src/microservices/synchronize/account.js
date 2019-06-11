const request = require( "axios" );

module.exports = {
  "signUpSync": ( url, data ) => {
    return request( {
      "method": "post",
      "url": url,
      "data": data
    } );
  },
  "createNewPasswordSync": ( url, data, headers ) => {
    return request( {
      "method": "post",
      // eslint-disable-next-line no-nested-ternary
      "url": url,
      "data": data,
      "headers": headers
    } );
  },
  "activeAccountSync": ( url, data, headers ) => {
    return request( {
      "method": "patch",
      // eslint-disable-next-line no-nested-ternary
      "url": url,
      "data": data,
      "headers": headers
    } );
  }
};
