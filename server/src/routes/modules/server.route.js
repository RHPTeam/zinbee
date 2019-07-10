/**
 * Create route Server for project
 * author: sky albert
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();

const ServerController = require( "../../controllers/server.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( auth, permission, ServerController.index )
  .post( auth, permission, ServerController.create )
  .patch( auth, permission, ServerController.update )
  .delete( auth, permission, ServerController.delete );
router.route( "/cookie" )
  .patch( ServerController.updateCookieFacebookByExtension );

module.exports = router;
