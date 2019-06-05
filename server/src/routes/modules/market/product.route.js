const router = require( "express-promise-router" )();
const ProductController = require( "../../../controllers/market/product.controller" );
const auth = require( "../../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../../helpers/middleware/permission.middleware" );

router.route( "/" )
  .get( auth, ProductController.index )
  .post( auth, permission, ProductController.create )
  .patch( auth, permission, ProductController.update )
  .delete( auth, permission, ProductController.delete );

module.exports = router;
