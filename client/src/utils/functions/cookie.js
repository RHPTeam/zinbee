/* eslint-disable prettier/prettier */
export default {
  setCookie( name, value, exp ) {
    const d = new Date();

    let expires;

    d.setTime( d.getTime() + exp * 24 * 60 * 60 * 1000 );
    expires = `expires=${ d.toUTCString()}`;

    document.cookie = `${name }=${ value };${ expires };path=/`;
  },
  getCookie( cname ) {
    const name = `${cname }=`,
      decodedCookie = decodeURIComponent( document.cookie ),
      ca = decodedCookie.split( ";" );

    for ( let i = 0; i < ca.length; i++ ) {
      let c = ca[ i ];

      while ( c.charAt( 0 ) === " " ) {
        c = c.substring( 1 );
      }
      if ( c.indexOf( name ) === 0 ) {
        return c.substring( name.length, c.length );
      }
    }
    return "";
  },
  removeCookie( cname ) {
    const d = new Date();

    let expires;

    d.setTime( d.getTime() - 1000 * 60 * 60 * 24 );
    expires = `expires=${ d.toGMTString()}`;

    document.cookie = `${cname }=; path=/; ${ expires}`;
  }
};
