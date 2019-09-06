/**
 * Create route Role for project
 * author: Sky Albert
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const RoleController = require( "../../controllers/role.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( auth, permission, RoleController.index );

router
  .route( "/sync" )
  .get( RoleController.sync );
module.exports = router;
