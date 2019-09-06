const request = require( "axios" );

module.exports = {
  "syncPostFolderExample": ( url, data, headers ) => {
    return request( {
      "method": "post",
      "url": url,
      "data": data,
      "headers": {
        "Authorization": headers
      }
    } );
  },
  "syncFolderExample": ( url, data, headers ) => {
    return request( {
      "method": "post",
      "url": url,
      "data": data,
      "headers": {
        "Authorization": headers
      }
    } );
  },
  "syncKeyWordSearch": ( url, data, headers ) => {
    return request( {
      "method": "patch",
      "url": url,
      "data": data,
      "headers": {
        "Authorization": headers
      }
    } );
  }
};
