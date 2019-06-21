/**
 * Create Campaign Default for project
 * author: hoc_anms
 * date: 21/06/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const CampaignDefaultRoute = require( "../../controllers/campaignDefault.controller" );

router
  .route( "/" )
  .get( CampaignDefaultRoute.index );

module.exports = router;
