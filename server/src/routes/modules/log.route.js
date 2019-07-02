/**
 * Create route log for project
 * author: hoc_anms
 * date: 02/07/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const LogController = require( "../../controllers/log.controller" );

const auth = require( "../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( auth, permission, LogController.index )
  .post( auth, LogController.create );

module.exports = router;
