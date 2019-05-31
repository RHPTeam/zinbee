/**
 * Create route Sign In for project
 * author: Sky Albert
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const passport = require( "passport" );
const AccountController = require( "../../controllers/account.controller" );

router
  .route( "/" )
  .post(
    passport.authenticate( "local", { "session": false } ),
    AccountController.signIn
  );

router
  .route( "/bz" )
  .post( passport.authenticate( "local", { "session": false } ), AccountController.signInByAdmin );

module.exports = router;
