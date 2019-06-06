const MarketProduct = require( "../../models/market/Product.model" );

module.exports = {
  "index": async ( req, res ) => {
    let data;

    if ( req.query._id ) {
      data = await MarketProduct.findOne( { "_id": req.query._id } );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      data = await MarketProduct.find( {} ).populate( { "path": "_creator", "select": "name" } ).lean();
    }

    res.status( 200 ).json( { "status": "success", "data": data } );
  },
  "create": async ( req, res ) => {
    let { body } = req, newProduct;

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

    res.status( 200 ).json( { "status": "success", "data": ( await MarketProduct.findByIdAndUpdate( query._id, { "$set": body }, { "new": true } ) ) } );
  },
  "delete": async ( req, res ) => {
    const { query } = req,
      productInfo = await MarketProduct.findOne( { "_id": query._id } );

    // check catch
    if ( !productInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sản phẩm này không tồn tại!" } );
    }

    await productInfo.remove();

    res.status( 200 ).json( { "status": "success", "data": null } );
  }
};
