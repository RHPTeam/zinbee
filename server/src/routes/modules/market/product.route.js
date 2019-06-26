const router = require( "express-promise-router" )();
const ProductController = require( "../../../controllers/market/product.controller" );
const auth = require( "../../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../../helpers/middleware/permission.middleware" );
const collaborator = require( "../../../helpers/middleware/collaborator.middleware" );

// Handle upload file image
const multer = require( "multer" ),
  fs = require( "fs-extra" ),
  storage = multer.diskStorage( {
    "destination": ( req, file, cb ) => {
      const path = `./uploads/market/product/${req.uid}`;

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

// General
router.route( "/" )
  .get( ProductController.index )
  .post( auth, collaborator, permission, ProductController.create )
  .patch( auth, collaborator, permission, ProductController.update )
  .delete( auth, collaborator, permission, ProductController.delete );

// Upload
router.route( "/upload" )
  .post( auth, collaborator, permission, upload.single( "previewImageUrl" ), ProductController.upload );

// Add to Collection
router.route( "/add/product/user" )
  .post( auth, ProductController.addToCollection );

// Get all products by category
router.route( "/:categoryId/products" )
  .get( ProductController.getAllProductsByCategory );

// search product by keyword - /market/products/search?keyword=example&_size=12&_page=1
router.route( "/search" ).post( auth, ProductController.search );

// get newest product
router .route( "/newest" )
  .get( ProductController.getNewestProduct );

module.exports = router;
