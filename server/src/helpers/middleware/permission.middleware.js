export default function isRole( ...allowed ) {
  const isAllowed = ( role ) => allowed.indexOf( role ) > -1;

  return ( req, res, next ) => {
    if ( req.user && isAllowed( req.user.role ) ) {
      next();
    } else {
      res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền truy cập!" } );
    }
  };
}
