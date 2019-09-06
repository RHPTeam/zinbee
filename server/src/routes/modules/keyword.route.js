/**
 * Create keywords Role for project
 * author: Sky Albert
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const PostController = require( "../../controllers/post.controller" );

router
  .route( "/sync" )
  .get( PostController.sync );
module.exports = router;
