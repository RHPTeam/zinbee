const MarketCategory = require( "../../models/market/Category.model" );
const MarketProduct = require( "../../models/market/Product.model" );

let getNestedChildren = ( arr, parent ) => {
  if ( arr.length > 0 ) {
    const out = [];

    for ( let i in arr ) {
      if ( arr[ i ].parent.toString() === parent.toString() ) {
        let children = getNestedChildren( arr, arr[ i ]._id );

        if ( children.length ) {
          arr[ i ].children = children;
        }
        out.push( arr[ i ] );
      }
    }
    return out;
  }
};

module.exports = {
  "index": async ( req, res ) => {
    let data;

    if ( req.query._id ) {
      data = await MarketCategory.findOne( { "_id": req.query._id } );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      data = await MarketCategory.find( {} ).populate( { "path": "_creator", "select": "name" } ).populate( { "path": "_editor", "select": "name" } ).lean();
    }

    res.status( 200 ).json( { "status": "success", "data": data } );
  },
  "getTreeView": async ( req, res ) => {
    const data = getNestedChildren( ( await MarketCategory.find( {} ).lean() ), "" );

    res.status( 200 ).json( { "status": "success", "data": data } );
  },
  "create": async ( req, res ) => {
    let { body } = req, newCategory;

    // Check catch
    if ( body.name === "" || body.name === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "name": "Tiêu đề blog không được bỏ trống!" } } );
    }

    // set default level category parent
    body.level = 0;

    // set value default category
    body._creator = req.uid;
    body.parent = body.parent !== undefined && body.parent !== "" ? body.parent : "";

    // check if category is not parent
    if ( body.parent !== undefined && body.parent !== "" ) {
      const categoryParentInfo = await MarketCategory.findOne( { "_id": body.parent } );

      if ( !categoryParentInfo ) {
        return res.status( 404 ).json( { "status": "error", "message": "Danh mục cha không tồn tại!" } );
      }

      req.body.level = parseInt( categoryParentInfo.level ) + 1;
    }

    // set new object mongo
    newCategory = await new MarketCategory( body );

    await newCategory.save();

    res.status( 201 ).json( { "status": "success", "data": newCategory } );
  },
  "update": async ( req, res ) => {
    const { body, query } = req,
      categoryInfo = await MarketCategory.findOne( { "_id": query._id } );

    // check catch
    if ( body.name === "" || body.name === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "name": "Tiêu đề blog không được bỏ trống!" } } );
    } else if ( !categoryInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục này không tồn tại!" } );
    }

    // set new value when update
    body._editor = req.uid;
    body.level = 0;
    body.parent = body.parent !== undefined && body.parent !== "" ? body.parent : "";

    // check logic when update parent category
    if ( body.parent ) {
      const categoryParentInfo = await MarketCategory.findOne( { "_id": body.parent } );

      if ( !categoryParentInfo ) {
        return res.status( 404 ).json( { "status": "error", "message": "Danh mục cha không tồn tại!" } );
      } else if ( categoryInfo.level < categoryParentInfo.level ) {
        return res.status( 404 ).json( { "status": "error", "message": "Bạn không thể cập nhật danh mục nhỏ cấp hơn danh mục hiện tại làm cha!" } );
      }

      body.level = parseInt( categoryParentInfo.level ) + 1;
    }

    res.status( 200 ).json( { "status": "success", "data": ( await MarketCategory.findByIdAndUpdate( query._id, { "$set": body }, { "new": true } ) ) } );
  },
  "delete": async ( req, res ) => {
    const { query } = req,
      categoryInfo = await MarketCategory.findOne( { "_id": query._id } ),
      childrenCategoryList = await MarketCategory.find( { "parent": query._id } );

    // check catch
    if ( !categoryInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục không tồn tại!" } );
    }

    await Promise.all( childrenCategoryList.map( async ( category ) => {
      category.parent = "";

      await category.save();
    } ) );

    await MarketProduct.deleteMany( { "_category": query._id } );
    await categoryInfo.remove();

    res.status( 200 ).json( { "status": "success", "data": null } );
  }
};
