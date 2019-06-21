/**
 * Controller campaign example for project
 * author: hoc-anms
 * updater: ___
 * date up: 21/06/2019
 * date to: ___
 * team: BE-RHP
 */
const MarketProductPost = require( "../models/market/products/post.model" );
const CampaignDefault = require( "../models/CampaignDefault.model" );
const jsonResponse = require( "../configs/response" );


module.exports = {
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await CampaignDefault.findOne( { "_id": req.query._id } ).populate( "postList" ).populate( { "path": "_account", "select": "name imageAvatar" } ).populate( { "path": "_editor", "select": "name imageAvatar" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await CampaignDefault.find( {} ).populate( "postList" ).populate( { "path": "_account", "select": "name imageAvatar" } ).populate( { "path": "_editor", "select": "name imageAvatar" } ).lean();
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  },
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" || req.body.title === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề chiến dịch không được bỏ trống!" } } );
    }
    // Handle create with mongodb
    const i = 1,
      listPost = await MarketProductPost.find( {} ).lean(),
      newCampaignDefault = await new CampaignDefault( {
        "title": req.body.title,
        "totalDay": req.body.totalDay,
        "description": req.body.description ? req.body.description : "",
        "_account": req.uid
      } );

    while ( i <= req.body.totalDay * 2 ) {
      let postSelectedFromRandom = await MarketProductPost.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean();

      console.log( postSelectedFromRandom )

      newCampaignDefault.postList.push( postSelectedFromRandom._id );
    }

    // Save mongodb
    await newCampaignDefault.save();

    res.status( 200 ).json( jsonResponse( "success", newCampaignDefault ) );
  },
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề chiến dịch mẫu không được bỏ trống!" } } );
    }

    const campaignDefaultInfo = await CampaignDefault.findOne( { "_id": req.query._id } );

    // Check catch when update post categories
    if ( !campaignDefaultInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch mẫu không tồn tại!" } );
    }

    // Last person update
    req.body._editor = req.uid;

    res.status( 201 ).json( jsonResponse( "success", await CampaignDefault.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) ) );
  },
  "delete": async ( req, res ) => {
    const campaignDefaultInfo = await CampaignDefault.findOne( { "_id": req.query._id } );

    // Check catch when delete post categories
    if ( !campaignDefaultInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch mẫu không tồn tại!" } );
    }

    await CampaignDefault.findByIdAndRemove( req.query._id );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }

};
