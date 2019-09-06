/**
 * Create Market Category Default for project
 * author: Sky Albert
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const BackupMarketCategoryDefaultController = require( "../../../controllers/backup/marketCategoryDefault.controller" );

router
  .route( "/category/default" )
  .post( BackupMarketCategoryDefaultController.backupMarketCategoryDefault );

router
  .route( "/posts/category/:id" )
  .post( BackupMarketCategoryDefaultController.backupPostDefaultForCategory );
module.exports = router;
