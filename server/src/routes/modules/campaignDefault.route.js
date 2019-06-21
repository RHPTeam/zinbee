/**
 * Create Campaign Default for project
 * author: hoc_anms
 * date: 21/06/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const CampaignDefaultRoute = require( "../../controllers/campaignDefault.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( auth, CampaignDefaultRoute.index )
  .post( auth, permission, CampaignDefaultRoute.create )
  .patch( auth, permission, CampaignDefaultRoute.update )
  .delete( auth, permission, CampaignDefaultRoute.delete );

module.exports = router;
