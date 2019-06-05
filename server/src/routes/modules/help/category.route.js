/**
 * Create route help category for project
 * author: hocpv
 * date: 15/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const HelpCategoryController = require( "../../../controllers/help/category.controller" );

const auth = require( "../../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( HelpCategoryController.index )
  .patch( auth, permission, HelpCategoryController.update )
  .post( auth, permission, HelpCategoryController.create )
  .delete( auth, permission, HelpCategoryController.delete );

module.exports = router;
