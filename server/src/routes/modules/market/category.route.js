const router = require( "express-promise-router" )();
const CategoryController = require( "../../../controllers/market/category.controller" );
const auth = require( "../../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../../helpers/middleware/permission.middleware" );

router.route( "/" )
  .get( auth, CategoryController.index )
  .post( auth, permission, CategoryController.create )
  .patch( auth, permission, CategoryController.update )
  .delete( auth, permission, CategoryController.delete );

router.route( "/rs" ).get( auth, CategoryController.getTreeView );

module.exports = router;
