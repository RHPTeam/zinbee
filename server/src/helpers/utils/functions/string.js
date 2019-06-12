/* eslint-disable strict */
/* eslint-disable no-param-reassign */
module.exports = {
  "convertSourceUnix": ( url ) => {
    return url.replace( /\\\//gi, "/" );
  },
  "convertUnicode": ( str ) => {
    str = str.replace( /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a" );
    str = str.replace( /è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e" );
    str = str.replace( /ì|í|ị|ỉ|ĩ/g, "i" );
    str = str.replace( /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o" );
    str = str.replace( /ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u" );
    str = str.replace( /ỳ|ý|ỵ|ỷ|ỹ/g, "y" );
    str = str.replace( /đ/g, "d" );
    str = str.replace( /À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A" );
    str = str.replace( /È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E" );
    str = str.replace( /Ì|Í|Ị|Ỉ|Ĩ/g, "I" );
    str = str.replace( /Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O" );
    str = str.replace( /Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U" );
    str = str.replace( /Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y" );
    str = str.replace( /Đ/g, "D" );
    return str;
  },
  "convertUnicodeToCharacter": ( str ) => {
    return str.replace( /\\u[\dA-F]{4}/gi, ( match ) => {
      return String.fromCharCode( parseInt( match.replace( /\\u/g, "" ), 16 ) );
    } );
  },
  "findSubString": ( str, start, end ) => {
    if ( !end ) {
      return str.substring( str.indexOf( start ) + start.length );
    }
    return str.substring(
      str.indexOf( start ) + start.length,
      str.indexOf( end, str.indexOf( start ) + start.length )
    );
  },
  "getObjectDate": ( str ) => {
    const date = new Date( str );

    return {
      "second": date.getSeconds(),
      "minute": date.getMinutes(),
      "hour": date.getHours(),
      "date": date.getDate(),
      "month": date.getMonth(),
      "day": date.getDay(),
      "year": date.getFullYear()
    };
  },
  "getWords": ( str, num ) => {
    let result = "", strArr = str.split( " " );

    for ( let i = 0; i <= num - 1; i++ ) {
      result += strArr[ i ];
      if ( i < num - 1 ) {
        result += " ";
      }
    }

    return result;
  }
};
