/**
 * Create route help for project
 * author: hocpv
 * date: 15/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const HelpController = require( "../../../controllers/help/help.controller" );

const auth = require( "../../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( HelpController.index )
  .patch( auth, permission, HelpController.update );
module.exports = router;
