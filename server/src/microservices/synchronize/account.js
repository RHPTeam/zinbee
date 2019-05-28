const request = require( "axios" );

module.exports = {
  "signUpSync": ( url, data ) => {
  	console.log({url:url,data:data})
    return request( {
      "method": "post",
      "url": url,
      "data": data
    } );
  }
};
