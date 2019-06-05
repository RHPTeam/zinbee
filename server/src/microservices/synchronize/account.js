const request = require( "axios" );

module.exports = {
  "signUpSync": ( url, data ) => {
    return request( {
      "method": "post",
      "url": url,
      "data": data
    } );
  },
  "createNewPasswordSync": ( region, url, data, headers ) => {
    return request( {
      "method": "post",
      // eslint-disable-next-line no-nested-ternary
      "url": region === 0 ? `${process.env.SERVER_CHILDRENT_NORTH }/` + url : region === 1 ? `${process.env.SERVER_CHILDRENT_CENTRAL }/` + url : `${process.env.SERVER_CHILDRENT_SOUTH }/` + url,
      "data": data,
      "headers": headers
    } );
  }
};
