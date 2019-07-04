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
const Account = require( "../../models/Account.model" );
const Role = require( "../../models/Role.model" );
const Server = require( "../../models/Server.model" )

const { signUp } = require( "../account.controller" );
const { activeAccountSync } = require( "../../microservices/synchronize/account" );
const { signAffiliate } = require( "../../configs/jwt" );


module.exports = {
  "create": async ( req, res ) => {
    if ( req.body._account === undefined || req.body._account.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_account": "Vui lòng cung cấp người dùng làm đại lý!" } );
    } else if ( req.body._package === undefined || req.body._package.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_package": "Vui lòng cung cấp gói đại lý cho người dùng này!" } );
    }
    const packageInfo = await Package.findOne( { "_id": req.body._package } ),
      findAccount = await Account.findOne( { "_id": req.body._account } ),
      findRole = await Role.findOne( { "level": "Agency" } );

    if ( !findAccount ) {
      return res.status( 404 ).json( { "status": "fail", "_account": "Người dùng không tồn tại!" } );
    }

    // Handle creator

    req.body._creator = req.uid;
    req.body.customer.total = req.body.customer.listOfUser.length;
    req.body.expire.leftTime = packageInfo.total;


    let newAgency = new Agency( req.body );

    newAgency.linkAffiliate = process.env.APP_URL + "/#/?a=" + newAgency._id.toString();
    await newAgency.save();
    await Account.findByIdAndUpdate( { "_id": req.body._account }, { "$set": { "_role": findRole._id } }, { "new": true } );

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
  },
  "createUserByAgency": async ( req, res ) => {
    const findAgency = await Agency.findOne( { "_account": req.uid } );

    if ( !findAgency ) {
      return res.status( 404 ).json( { "status": "error", "message": "Đại lý không tồn tại!" } );
    }

    await signUp( req, res );

    // eslint-disable-next-line one-var
    const findAccount = await Account.findOne( { "email": req.body.email } );

    findAgency.customer.total += 1;
    findAgency.customer.listOfUser.push( findAccount._id );
    await findAgency.save();
  },
  "expireUserByAgency": async ( req, res ) => {
    const findAgency = await Agency.findOne( { "_account": req.uid } ),
      findAccount = await Account.findOne( { "_id": req.query._account } ).select( "-password" ).lean(),
      vpsContainServer = await Server.findOne( { "userAmount": findAccount._id } ).select( "info" ).lean(),
      { expireDate } = req.body;

    if ( !findAccount ) {
      return res.status( 404 ).json( { "status": "fail", "_account": "Người dùng không tồn tại!" } );
    }
    if ( findAgency.customer.listOfUser.indexOf( req.query._account ) < 0 ) {
      return res.status( 405 ).json( { "status": "fail", "_account": "Bạn không có quyền gia hạn cho người dùng này!" } );
    }
    // handle date agency
    // eslint-disable-next-line one-var
    const dateNowExpire = new Date( findAccount.expireDate.toString() ),
      dateNewExpire = new Date( req.body.expireDate ),
      oneMonth = 30 * 24 * 60 * 60 * 1000; // days*hours*minutes*seconds*milliseconds

    findAgency.expire.usedTime = findAgency.expire.usedTime + parseFloat( Math.abs( ( dateNowExpire.getTime() - dateNewExpire.getTime() ) / ( oneMonth ) ) ).toFixed( 2 );
    findAgency.expire.leftTime = findAgency.expire.leftTime - parseFloat( Math.abs( ( dateNowExpire.getTime() - dateNewExpire.getTime() ) / ( oneMonth ) ) ).toFixed( 2 );

    // Check agency use expire date
    if ( findAgency.expire.leftTime <= 0 ) {
      return res.status( 405 ).json( { "status": "error", "message": "Đại lý đã dùng hết số giờ gia hạn!  " } );
    }

    await findAgency.save();
    // Update expire date
    let data = await Account.findByIdAndUpdate( req.query._account, { "$set": { "status": 1, "expireDate": expireDate, "maxAccountFb": 2 } }, { "new": true } ).select( "-password" ),
      resUserSync = await activeAccountSync( `${vpsContainServer.info.domain}:${vpsContainServer.info.serverPort}/api/v1/users/active`, { "id": req.query._account, "expireDate": req.body.expireDate, "maxAccountFb": 2 }, req.headers.authorization );

    if ( resUserSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }
    res.status( 200 ).json( jsonResponse( "success", data ) );
  },
  "setCookieWithLinkAffiliate": async ( req, res ) => {
    const findAgency = await Agency.findOne( { "$or": [ { "_id": req.query._agency }, { "subDomain": req.query._subDomain } ] } );

    console.log( findAgency )
    if ( !findAgency ) {
      return res.status( 404 ).json( { "status": "error", "message": "Đại lý không tồn tại!" } );
    }

    let cookie = `aff=${signAffiliate()}; aid=${findAgency._id}`;

    res.set( "Cookie", cookie );
    res.status( 201 ).json( jsonResponse( "success", null ) );
  }
};
