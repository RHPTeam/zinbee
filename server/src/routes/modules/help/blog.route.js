/**
 * Create route help category for project
 * author: hocpv
 * editor: sky albert
 * date: 15/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const BlogHelpController = require( "../../../controllers/help/blog.controller" );

const auth = require( "../../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../../helpers/middleware/permission.middleware" );


// Handle upload file image
const multer = require( "multer" ),
  fs = require( "fs-extra" ),
  storage = multer.diskStorage( {
    "destination": ( req, file, cb ) => {
      const path = "./uploads/help/blog";

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
      "fileSize": 1024 * 1024 * 25
    },
    "fileFilter": function( req, file, cb ) {
      if ( !file.originalname.match( /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/ ) ) {
        return cb( new Error( "Ảnh không đúng dạng, vui lòng thử lại!" ) );
      }
      cb( null, true );
    }
  } );

router
  .route( "/" )
  .get( BlogHelpController.index )
  .patch( auth, permission, BlogHelpController.update )
  .post( auth, permission, BlogHelpController.create )
  .delete( auth, permission, BlogHelpController.delete );

router.route( "/search" ).post( BlogHelpController.search );

router.route( "/upload" ).post( upload.single( "file" ), BlogHelpController.upload );

module.exports = router;
