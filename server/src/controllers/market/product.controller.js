const MarketProduct = require( "../../models/market/Product.model" );
const Server = require( "../../models/Server.model" );
const MarketPost = require( "../../models/market/products/post.model" );

const { createSyncFromMarket } = require( "../../microservices/synchronize/productPost" );

module.exports = {
  "index": async ( req, res ) => {
    let data;

    if ( req.query._id ) {
      data = await MarketProduct.findOne( { "_id": req.query._id } );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      data = await MarketProduct.find( {} ).populate( { "path": "_creator", "select": "name" } ).populate( { "path": "_category", "select": "name" } ).lean();
    }

    res.status( 200 ).json( { "status": "success", "data": data } );
  },
  "create": async ( req, res ) => {
    let { body } = req, newProduct,
      findMarketPost = await MarketPost.findOne( { "_id": body.content } );

    // Check catch
    if ( body.name === "" || body.name === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "name": "Tiêu đề blog không được bỏ trống!" } } );
    }

    // set value default product
    body._creator = req.uid;
    body.trending = false;

    // set new object mongo
    newProduct = await new MarketProduct( body );

    await newProduct.save();
    findMarketPost.assign = true;
    await findMarketPost.save();
    res.status( 201 ).json( { "status": "success", "data": newProduct } );
  },
  "update": async ( req, res ) => {
    const { body, query } = req,
      productInfo = await MarketProduct.findOne( { "_id": query._id } );

    // check catch
    if ( body.name === "" || body.name === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "name": "Tiêu đề blog không được bỏ trống!" } } );
    } else if ( !productInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sản phẩm này không tồn tại!" } );
    }


    if ( req.body.content ) {
      const findMarketPostOlder = await MarketPost.findOne( { "_id": productInfo.content } ),
        findMarketPostUpdate = await MarketPost.findOne( { "_id": req.body.content } );

      findMarketPostOlder.assign = false;
      await findMarketPostOlder.save();
      findMarketPostUpdate.assign = true;
      await findMarketPostUpdate.save();
    }
    res.status( 200 ).json( { "status": "success", "data": ( await MarketProduct.findByIdAndUpdate( query._id, { "$set": body }, { "new": true } ) ) } );
  },
  "delete": async ( req, res ) => {
    const { query } = req,
      productInfo = await MarketProduct.findOne( { "_id": query._id } ),
      findMarketPostOlder = await MarketPost.findOne( { "_id": productInfo.content } );

    // check catch
    if ( !productInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sản phẩm này không tồn tại!" } );
    }
    findMarketPostOlder.assign = false;
    await findMarketPostOlder.save();
    await productInfo.remove();

    res.status( 200 ).json( { "status": "success", "data": null } );
  },
  "upload": async ( req, res ) => {
    let previewImageUrl;

    if ( !req.file ) {
      return res.status( 403 ).json( { "status": "fail", "photos": "Không có ảnh upload, vui lòng kiểm tra lại!" } );
    }

    if ( req.file.fieldname === "previewImage" && req.file.mimetype.includes( "image" ) ) {
      previewImageUrl = `${process.env.APP_URL}:${process.env.PORT_BASE}/${req.file.path}`;
    }

    return res.status( 200 ).json( { "status": "success", "data": previewImageUrl } );
  },
  "addToCollection": async ( req, res ) => {
    const productsSelected = await MarketProduct.findOne( { "_id": req.query._id } ),
      serverContainUser = await Server.findOne( { "userAmount": req.uid } ).lean();

    // Check catch
    if ( !productsSelected ) {
      return res.status( 404 ).json( { "status": "error", "message": "Không tồn tại sản phẩm này!" } );
    }


    if ( productsSelected.typeProduct === 0 ) {
      const postSelected = await MarketPost.findOne( { "_id": productsSelected.content } ),
        attachmentsList = await Promise.all( postSelected.photos.map( ( photo ) => {
          return {
            "link": photo,
            "typeAttachment": 1
          };
        } ) ),

        // add post from product to post of user
        resPostSync = await createSyncFromMarket( `${serverContainUser.info.domain}:${serverContainUser.info.serverPort}/api/v1/posts/sync`, {
          "title": postSelected.title,
          "content": postSelected.content,
          "attachments": attachmentsList
        }, {
          "Authorization": req.headers.authorization
        } );

      if ( resPostSync.data.status !== "success" ) {
        return res.status( 500 ).json( { "status": "error", "message": "Có lỗi xảy ra trong quá trình thêm vào kho. Vui lòng liên hệ với bộ CSKH!" } );
      }
    }

    // Increase number of sales
    productsSelected.numberOfSales += 1;

    await productsSelected.save();

    res.status( 201 ).json( { "status": "success", "data": productsSelected } );
  },
  "getAllProductsByCategory": async ( req, res ) => {
    const data = await MarketProduct.find( { "_category": req.params.categoryId } ).populate( { "path": "_creator", "select": "name" } );

    res.status( 200 ).json( { "status": "success", "data": data } );
  },
  "search": async ( req, res ) => {
    if ( req.query.keyword === undefined ) {
      return res.status( 404 ).json( { "status": "fail", "keyword": "Vui lòng cung cấp từ khóa để tìm kiếm!" } );
    }

    let page = null, dataResponse = null, data = ( await MarketProduct.find( { "$text": { "$search": `\"${req.query.keyword}\"`, "$language": "none" } } ).sort( { "numberOfSales": "desc" } ).populate( { "path": "_creator", "select": "name" } ).lean() );

    if ( req.query._size && req.query._page ) {
      dataResponse = data.slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = data.slice( 0, Number( req.query._size ) );
    }

    if ( req.query._size ) {
      if ( data.length % req.query._size === 0 ) {
        page = Math.floor( data.length / req.query._size );
      } else {
        page = Math.floor( data.length / req.query._size ) + 1;
      }
    }

    res.status( 200 ).json( { "status": "success", "data": { "results": dataResponse, "page": page } } );
  },
  "getNewestProduct": async ( req, res ) => {
    const data = await MarketProduct.find( { } ).populate( { "path": "_creator", "select": "name" } )
      .sort( { "$natural": -1 } )
      .limit( parseInt( req.query.number ) );

    res.status( 200 ).json( { "status": "success", "data": data } );
  },
  "statisticHomepage": async( req, res ) => {
    const totalPostProducts = await MarketProduct.countDocuments( { "typeProduct": 0 } );

    res.status( 200 ).json( { "status": "success", "data": { "totalPostProducts": totalPostProducts, "totalCampaignProducts": 0, "totalTrendingProducts": 0 } } );
  }
};
