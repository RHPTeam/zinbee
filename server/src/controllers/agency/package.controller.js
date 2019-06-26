/**
 * Controller package for project
 * author: Sky Albert
 * updater: ___
 * date up: 26/06/2019
 * date to: ___
 * team: BE-RHP
 */

const jsonResponse = require( "../../configs/response" );
const Package = require( "../../models/agency/Package.model" );

module.exports = {
  "create": async ( req, res ) => {
    // Handle creator
    req.body._creator = req.uid;

    const newPackage = new Package( req.body );

    await newPackage.save();

    res.status( 201 ).json( jsonResponse( "success", newPackage ) );
  },
  "delete": async ( req, res ) => {
    // Check if don't use query
    if ( req.query._id === undefined || req.query._id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp query _id để xác thực gói đại lý muốn xóa!" } );
    }

    const packageInfo = await Package.findOne( { "_id": req.query._id } );

    // Check error
    if ( !packageInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Gói đại lý không tồn tại!" } );
    }

    // Remove postFacebook
    await packageInfo.remove();
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await Package.findOne( { "_id": req.query._id } ).populate( { "path": "_creator", "select": "_id name" } ).populate( { "path": "_editor", "select": "_id name" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Package.find( {} ).populate( { "path": "_creator", "select": "_id name" } ).populate( { "path": "_editor", "select": "_id name" } ).lean();
    }

    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );

  },
  "update": async ( req, res ) => {
    const packageInfo = await Package.findOne( { "_id": req.query._id } );

    // Check error
    if ( !packageInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Gói đại lý không tồn tại!" } );
    }

    // Handle _editor
    req.body._editor = req.uid;

    res.status( 200 ).json( jsonResponse( "success", await Package.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) ) );
  }
};
