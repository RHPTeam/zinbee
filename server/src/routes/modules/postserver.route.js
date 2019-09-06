/**
 * Create route Post Server for project
 * author: sky albert
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();

const PostServerController = require( "../../controllers/postserver.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( auth, permission, PostServerController.index )
  .post( auth, permission, PostServerController.create )
  .patch( auth, permission, PostServerController.update )
  .delete( auth, permission, PostServerController.delete );

router.route( "/:uid/status" ).post( PostServerController.changeStatus );
router.route( "/online" ).post( PostServerController.getServerOnline );

module.exports = router;
