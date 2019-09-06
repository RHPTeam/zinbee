/**
 * Create Category Default for project
 * author: Sky Albert
 * date: 04/06/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const CategoryDefaultController = require( "../../controllers/categorydefault.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( auth, CategoryDefaultController.index )
  .post( auth, permission, CategoryDefaultController.create )
  .patch( auth, permission, CategoryDefaultController.update )
  .delete( auth, permission, CategoryDefaultController.delete );

router
  .route( "/:categoryId/post/:postId" )
  .post( auth, permission, CategoryDefaultController.createPostByCategory )
  .delete( auth, permission, CategoryDefaultController.removePostByCategory );
module.exports = router;
