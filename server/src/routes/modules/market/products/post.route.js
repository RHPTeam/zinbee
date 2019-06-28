const router = require( "express-promise-router" )();
const MarketPostController = require( "../../../../controllers/market/products/post.controller" );
const auth = require( "../../../../helpers/middleware/authenticate.middleware" );
const collaborator = require( "../../../../helpers/middleware/collaborator.middleware" );

// Handle upload file image
const multer = require( "multer" ),
  fs = require( "fs-extra" ),
  storage = multer.diskStorage( {
    "destination": ( req, file, cb ) => {
      const path = `./uploads/market/post/${req.uid}`;

      fs.mkdirsSync( path );
      cb( null, path );
    },
    "filename": ( req, file, cb ) => {
      cb(
        null,
        `${new Date().toISOString().replace( /:|\./g, "" )}-${file.originalname}`
      );
    }
  } ),
  upload = multer( {
    "storage": storage,
    "limits": {
      "fileSize": 1024 * 1024 * 5
    },
    "fileFilter": function( req, file, cb ) {
      if ( !file.originalname.match( /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/ ) ) {
        return cb( new Error( "Ảnh không đúng dạng, vui lòng thử lại!" ) );
      }
      cb( null, true );
    }
  } );

router.route( "/" )
  .get( auth, MarketPostController.index )
  .post( auth, collaborator, MarketPostController.create )
  .patch( auth, collaborator, MarketPostController.update )
  .delete( auth, collaborator, MarketPostController.delete );
router.route( "/search" ).post( auth, MarketPostController.search );
router.route( "/upload" ).post( auth, collaborator,
  upload.array( "photos" ), MarketPostController.upload );

module.exports = router;
