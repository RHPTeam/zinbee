/**
 * Create route post facebook for project
 * author: Sky Albert
 * date: 23/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const PostController = require( "../../controllers/post.controller" );
const permission = require( "../../helpers/middleware/permission.middleware" );

// Handle upload file image
const multer = require( "multer" ),
  fs = require( "fs-extra" ),
  storage = multer.diskStorage( {
    "destination": ( req, file, cb ) => {
      const path = `./uploads/post_facebook/person/${req.uid}`;

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
        return cb( new Error( "Only image files are allowed!" ) );
      }
      cb( null, true );
    }
  } );

router
  .route( "/" ).get( PostController.index )
  .post( permission, PostController.create )
  .patch( permission, upload.array( "attachments", 20 ), PostController.update )
  .delete( permission, PostController.delete );

router.route( "/search" ).post( PostController.search );

module.exports = router;
