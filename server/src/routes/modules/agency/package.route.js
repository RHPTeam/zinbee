/**
 * Create route package agency for project
 * author: sky albert
 * date: 26/06/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const PackageController = require( "../../../controllers/agency/package.controller" );

const auth = require( "../../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( PackageController.index )
  .patch( auth, permission, PackageController.update )
  .post( auth, permission, PackageController.create )
  .delete( auth, permission, PackageController.delete );

module.exports = router;
