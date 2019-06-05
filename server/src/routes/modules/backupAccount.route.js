/**
 * Create route backup for project
 * author: hoc-anms
 * date: 05/06/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const BackupAccountController = require( "../../controllers/backupAccount.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .post( auth, permission, BackupAccountController.index );

module.exports = router;
