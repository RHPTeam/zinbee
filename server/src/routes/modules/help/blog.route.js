/**
 * Create route help category for project
 * author: hocpv
 * date: 15/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const BlogHelpController = require( "../../../controllers/help/blog.controller" );

const auth = require( "../../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( BlogHelpController.index )
  .patch( auth, permission, BlogHelpController.update )
  .post( auth, permission, BlogHelpController.create )
  .delete( auth, permission, BlogHelpController.delete );

router.route( "/search" ).post( BlogHelpController.search );

module.exports = router;
