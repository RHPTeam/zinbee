/**
 * Create Category Default for project
 * author: Sky Albert
 * date: 04/06/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const CategoryDefaultController = require( "../../controllers/categorydefault.controller" );

router
  .route( "/" )
  .get( CategoryDefaultController.index )
  .post( CategoryDefaultController.create )
  .patch( CategoryDefaultController.update )
  .delete( CategoryDefaultController.delete );

router
  .route( "/:categoryId/post/:postId" )
  .post( CategoryDefaultController.createPostByCategory )
  .delete( CategoryDefaultController.removePostByCategory );
module.exports = router;
