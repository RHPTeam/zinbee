/**
 * Create route code for project
 * author: hoc_anms
 * date: 31/07/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const CodeController = require( "../../controllers/code.controller" );

router.route( "/" )
  .get( CodeController.index )
  .post( CodeController.create )
  .patch( CodeController.update )
  .delete( CodeController.delete );

module.exports = router;
