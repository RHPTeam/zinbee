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
  .patch( AccountController.update );

router.route( "/status" ).post( AccountController.changeStatus );
router.route( "/renew/id" ).post( AccountController.renewById );
router.route( "/renew/code" ).post( AccountController.renewByCode );

module.exports = router;
