/**
 * Create route Sign Up for project
 * author: Sky Albert
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const AccountController = require( "../../controllers/Account.controller" );

router
  .route( "/" )
  .post( AccountController.signUp );

router
  .route( "/bz" )
  .post( AccountController.signUpByAdmin );

module.exports = router;
