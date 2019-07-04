/**
 * Create route main agency for project
 * author: sky albert
 * date: 26/06/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const AgencyController = require( "../../../controllers/agency/agency.controller" );

const auth = require( "../../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../../helpers/middleware/permission.middleware" );
const agency = require( "../../../helpers/middleware/agency.middleware" );

router
  .route( "/" )
  .get( AgencyController.index )
  .patch( auth, permission, AgencyController.update )
  .post( auth, permission, AgencyController.create )
  .delete( auth, permission, AgencyController.delete );
router.route( "/user" )
  .get( AgencyController.setCookieWithLinkAffiliate )
  .post( auth, agency, AgencyController.createUserByAgency )
  .patch( auth, agency, AgencyController.expireUserByAgency );

module.exports = router;
