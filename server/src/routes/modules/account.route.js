/**
 * Create route User for project
 * author: hoc-anms
 * date: 20/04/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const AccountController = require( "../../controllers/account.controller" );

router
  .route( "/" )
  .get( AccountController.index )

router.route( "/active" ).post( AccountController.active );

module.exports = router;
