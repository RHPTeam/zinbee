/**
 * Controller Market Category Default Backup for project
 * author: sky albert
 * updater: _________
 * date up: 10/06/2019
 * date to:
 * team: BE-RHP
 */
const MarketCategory = require( "../../models/market/Category.model" );
const MarketPost = require( "../../models/market/products/post.model" );
const fs = require( "fs" ),
  { convertUnicode, getWords } = require( "../../helpers/utils/functions/string" ),
  insertCategoryMany = ( data ) => {
    return new Promise( ( resolve ) => {
      MarketCategory.insertMany( data, function ( error, docs ) {
        if ( error ) {
          throw new Error( error );
        }
        resolve( docs );
      } );
    } );
  },
  insertPostMany = ( data ) => {
    return new Promise( ( resolve ) => {
      MarketPost.insertMany( data, function ( error, docs ) {
        if ( error ) {
          throw new Error( error );
        }
        resolve( docs );
      } );
    } );
  };

module.exports = {
  "backupMarketCategoryDefault": async ( req, res ) => {
    let fileUrl, postDefaultInfo = await MarketCategory.findOne( { "name": "Bài viết mẫu" } );

    if ( __dirname.includes( "/" ) ) {
      fileUrl = __dirname.replace( "controllers/backup", "databases/backup/market_post_default.json" );
    } else {
      fileUrl = __dirname.replace( "controllers\\backup", "databases\\backup\\market_post_default.json" );
    }

    // Check exists "Bài viết mẫu" parent category
    if ( !postDefaultInfo ) {
      const newPost = new MarketCategory( { "name": "Bài viết mẫu", "parent": "", "level": 0, "_creator": req.uid } );

      await newPost.save();

      console.log( "Finished create category default!" );

      postDefaultInfo = newPost;
    }

    // Handle
    fs.readFile( fileUrl, "utf8", async function ( error, content ) {
      if ( error ) {
        return res.status( 404 ).json( { "status": "error", "message": `Không tìm thấy file tại: ${fileUrl}` } );
      }

      // Parse text to json
      let body = JSON.parse( content ).data.categoryDefault;

      body = await Promise.all( body.map( ( category ) => {
        category.parent = postDefaultInfo._id;
        category._creator = req.uid;

        return category;
      } ) );

      await insertCategoryMany( body );
    } );

    res.status( 201 ).json( { "status": "success" } );
  },
  "backupPostDefaultForCategory": async ( req, res ) => {
    let fileUrl, categoryInfo = await MarketCategory.findOne( { "_id": req.params.id } );

    if ( !categoryInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục này không tồn tại!" } );
    }

    if ( __dirname.includes( "/" ) ) {
      fileUrl = __dirname.replace( "controllers/backup", "databases/backup/market_product_old.json" );
    } else {
      fileUrl = __dirname.replace( "controllers\\backup", "databases\\backup\\market_product_old.json" );
    }

    fs.readFile( fileUrl, async function ( error, content ) {
      if ( error ) {
        return res.status( 404 ).json( { "status": "error", "message": `Không tìm thấy file tại: ${fileUrl}` } );
      }

      // Parse text to json
      let body = JSON.parse( content ).data;

      body = body.filter( ( post ) => convertUnicode( post.cat_data ).toLowerCase() === convertUnicode( categoryInfo.name ).toLowerCase() );

      body = await Promise.all( body.map( ( post ) => {
        let photos;

        if ( post.image !== null && post.image !== undefined && post.image.includes( "[" ) ) {
          photos = JSON.parse( post.image );
        } else if ( post.image !== null && post.image !== undefined ) {
          photos = [ post.image ];
        } else {
          photos = [];
        }

        return {
          "title": getWords( post.message, 5 ),
          "content": post.message,
          "photos": photos.length > 0 ? photos.filter( ( photo ) => photo.includes( ".jpg" ) || photo.includes( ".png" ) ) : photos,
          "_creator": req.uid
        };
      } ) );

      await insertPostMany( body );
    } );

    res.status( 201 ).json( { "status": "success" } );
  }
};
