/**
 * Create route Sign In for project
 * author: Sky Albert
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const passport = require( "passport" );

const AccountController = require( "../../controllers/Account.controller" );
const {
  validateBody,
  schemas
} = require( "../../helpers/validator/router.validator" );

router
  .route( "/" )
  .post(
    validateBody( schemas.userSignInSchema ),
    passport.authenticate( "local", { "session": false } ),
    AccountController.signIn
  );

router
  .route( "/bz" )
  .post( AccountController.signInByAdmin );

module.exports = router;
