/**
 * Create route User for project
 * author: hoc-anms
 * date: 20/04/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const AccountController = require( "../../controllers/account.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( auth, permission, AccountController.index );

router.route( "/sync" ).patch( auth, AccountController.updateSync );

router.route( "/status" ).post( auth, permission, AccountController.changeStatus );
router.route( "/renew/id" ).post( auth, permission, AccountController.renewById );
router.route( "/renew/code" ).post( auth, permission, AccountController.renewByCode );
router.route( "/change-password/sync" ).patch( auth, AccountController.changePasswordSync );
router.route( "/info/code" ).post( AccountController.checkCode ); // check code
router.route( "/info/reset-password" ).get( AccountController.getUserInfoLostPass ); // get use info by email
router.route( "/reset-password" ).post( AccountController.resetPassword );
router.route( "/create-password" ).post( AccountController.createNewPassword );// final reset password

router.route( "/info" ).get( auth, AccountController.getUserInfo );

module.exports = router;
