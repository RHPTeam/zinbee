const Code = require( "../models/Code.model" );
const { generateProductKey } = require( "../helpers/utils/functions/generateCode" );
const jsonResponse = require( "../configs/response" );

module.exports = {
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await Code.findOne( { "_id": req.query._id } ).populate( { "path": "_users", "select": "name imageAvatar email phone" } ).populate( { "path": "_creator", "select": "name imageAvatar" } ).populate( { "path": "_editor", "select": "name imageAvatar" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Code.find( {} ).populate( { "path": "_creator", "select": "name imageAvatar" } ).populate( { "path": "_editor", "select": "name imageAvatar" } ).lean();
    }

    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
  },
  "create": async ( req, res ) => {
    const objSave = {
        "code": generateProductKey(),
        "expireDate": req.body.expireDate,
        "typeExpire": parseFloat( req.body.typeExpire ),
        "maxUser": parseFloat( req.body.maxUser ),
        "_creator": req.uid
      },
      newCode = await new Code( objSave );

    await newCode.save();
    res.status( 200 ).json( jsonResponse( "success", newCode ) );
  },
  "update": async ( req, res ) => {
    const findCode = await Code.findOne( { "_id": req.query._id } );

    // Check if don't use query
    if ( req.query._id === undefined || req.query._id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp query _id để xác thực code muốn xóa!" } );
    }
    if ( !findCode ) {
      return res.status( 403 ).json( { "status": "fail", "message": "Mã kích hoạt khôn được tìm thấy!" } );
    }
    // Handle _editor
    req.body._editor = req.uid;

    res.status( 200 ).json( jsonResponse( "success", await Code.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) ) );
  },
  "delete": async ( req, res ) => {
    const findCode = await Code.findOne( { "_id": req.query._id } );

    // Check if don't use query
    if ( req.query._id === undefined || req.query._id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp query _id để xác thực code muốn xóa!" } );
    }
    if ( !findCode ) {
      return res.status( 403 ).json( { "status": "fail", "message": "Mã kích hoạt khôn được tìm thấy!" } );
    }

    await findCode.remove();
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
