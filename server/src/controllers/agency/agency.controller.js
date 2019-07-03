/**
 * Controller agency for project
 * author: Sky Albert
 * updater: ___
 * date up: 26/06/2019
 * date to: ___
 * team: BE-RHP
 */

const jsonResponse = require( "../../configs/response" );
const Agency = require( "../../models/agency/Agency.model" );
const Package = require( "../../models/agency/Package.model" );

module.exports = {
  "create": async ( req, res ) => {
    if ( req.body._account === undefined || req.body._account.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_account": "Vui lòng cung cấp người dùng làm đại lý!" } );
    } else if ( req.body._package === undefined || req.body._package.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_package": "Vui lòng cung cấp gói đại lý cho người dùng này!" } );
    }
    const packageInfo = await Package.findOne( { "_id": req.body._package } );
    // Handle creator

    req.body._creator = req.uid;
    req.body.customer.total = req.body.customer.listOfUser.length;
    req.body.expire.leftTime = packageInfo.total;

    let newAgency = new Agency( req.body );

    await newAgency.save();

    res.status( 201 ).json( jsonResponse( "success", newAgency ) );
  },
  "delete": async ( req, res ) => {
    // Check if don't use query
    if ( req.query._id === undefined || req.query._id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp query _id để xác thực đại lý muốn xóa!" } );
    }

    const agencyInfo = await Agency.findOne( { "_id": req.query._id } );

    // Check error
    if ( !agencyInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Đại lý không tồn tại!" } );
    }

    // Remove postFacebook
    await agencyInfo.remove();
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await Agency.findOne( { "_id": req.query._id } ).populate( { "path": "_account", "select": "_id name" } ).populate( { "path": "_creator", "select": "_id name" } ).populate( { "path": "_editor", "select": "_id name" } ).populate( { "path": "customer.listOfUser", "select": "_id name" } ).populate( { "path": "_package", "select": "_id title" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Agency.find( {} ).populate( { "path": "_account", "select": "_id name" } ).populate( { "path": "_creator", "select": "_id name" } ).populate( { "path": "_editor", "select": "_id name" } ).populate( { "path": "customer.listOfUser", "select": "_id name" } ).populate( { "path": "_package", "select": "_id title" } ).lean();
    }

    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );

  },
  "update": async ( req, res ) => {
    const agencyInfo = await Agency.findOne( { "_id": req.query._id } );

    // Check error
    if ( !agencyInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Đại lý không tồn tại!" } );
    }

    // Handle _editor
    req.body._editor = req.uid;

    res.status( 200 ).json( jsonResponse( "success", await Agency.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) ) );
  }
};
