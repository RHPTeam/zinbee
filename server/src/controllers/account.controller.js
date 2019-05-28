/**
 * Controller users or account for project
 * author: Sky Albert
 * updater: ___
 * date up: 21/05/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require( "../models/Account.model" );
const Role = require( "../models/Role.model" );
const Server = require( "../models/Server.model" );

const fs = require( "fs" );
const jsonResponse = require( "../configs/response" );
const { signToken } = require( "../configs/jwt" );
const { signUpSync } = require( "../microservices/synchronize/account" );

module.exports = {
  "changePasswordSync": async ( req, res ) => {
    const { body } = req,
      userInfo = await Account.findOne( { "_id": req.uid } ),
      isPassword = await userInfo.isValidPassword( body.password );

    // Check errors
    if ( !isPassword ) {
      return res.send( { "status": "error", "message": "Mật khẩu không chính xác!" } );
    }

    // Assign new password
    userInfo.password = body.newPassword;

    // Save to mongodb
    await userInfo.save();

    res.send( { "status": "success", "data": null } );
  },
  "changeStatus": async ( req, res ) => {
    let data;

    const { id } = req.body,
      userInfo = await Account.findOne( { "_id": id } );

    userInfo.status = !userInfo;
    data = await Account.findByIdAndUpdate( id, { "$set": { "status": userInfo.status } }, { "new": true } ).select( "-password" );

    res.status( 200 ).json( jsonResponse( "success", data ) );
  },
  "createNewPasswordSync": async ( req, res ) => {
    const { password } = req.body,
      userInfo = await Account.findOne( { "_id": req.uid } );

    userInfo.password = password;

    await userInfo.save();

    res.send( { "status": "success", "message": "Tạo mới mất khẩu thành công!" } );
  },
  "index": async ( req, res ) => {
    let data;

    if ( req.query._id ) {
      data = await Account.findOne( { "_id": req.query._id } ).select( "-password" ).populate( { "path": "_role", "select": "_id level" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      data = await Account.find( {} ).select( "-password" ).lean();
    } else {
      data = await Account.find( req.query ).select( "-password" ).lean();
    }

    res.status( 200 ).json( jsonResponse( "success", data ) );
  },
  "renewById": async ( req, res ) => {
    let data;

    // Check validator
    if ( req.body.id === undefined || req.body.id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "id": "Vui lòng cung cấp id người dùng để kích hoạt!" } );
    } else if ( req.body.expireDate < new Date() ) {
      return res.status( 403 ).json( { "status": "fail", "expireDate": "Ngày gia hạn cần phải ở tương lai!" } );
    }

    const { id, expireDate } = req.body,
      userInfo = await Account.findOne( { "_id": id } );

    // Check exists
    if ( !userInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Người dùng này không tồn tại!" } );
    }

    // Update expire date
    data = await Account.findByIdAndUpdate( id, { "$set": { "status": 1, "expireDate": expireDate } }, { "new": true } ).select( "-password" );

    res.status( 200 ).json( jsonResponse( "success", data ) );
  },
  "renewByCode": async ( req, res ) => {
    // Check validator
    if ( req.body.presenter === undefined || req.body.presenter.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "presenter": "Mã kích hoạt không được để trống" } );
    }

    // Active by key
    if ( req.body.presenter && req.body.presenter.length > 0 ) {
      // find all user have key
      const userList = await Account.find( { "presenter": req.body.presenter } );

      if ( userList.length === 0 ) {
        return res.status( 404 ).json( { "status": "error", "message": "Mã kích hoạt không tồn tại!" } );
      }

      await Promise.all( userList.map( async ( user ) => {
        user.status = 1;
        user.expireDate = req.body.expireDate;

        await Account.findByIdAndUpdate(
          user._id,
          { "$set": user },
          { "new": true }
        );
      } ) );
    }

    res.status( 201 ).json( jsonResponse( "success", null ) );
  },
  "signIn": async ( req, res ) => {
    const { email } = req.body,
      userInfo = await Account.findOne( { "email": email } ),
      memberRole = await Role.findOne( { "_id": userInfo._role } ),
      serverContainUser = await Server.findOne( { "userAmount": userInfo._id } );

    let cookie;

    // Check expire date
    if ( new Date( userInfo.expireDate ) < new Date() ) {
      await Account.findByIdAndUpdate( userInfo._id, { "$set": { "status": 0 } }, { "new": true } );
      return res.status( 405 ).json( { "status": "error", "message": "Tài khoản của bạn đã hết hạn. Vui lòng liên hệ với bộ phận CSKH!" } );
    }
    cookie = `sid=${ signToken( userInfo ) }; uid=${userInfo._id}; cfr=${memberRole.level}`;

    res.set( "Cookie", cookie );

    res.status( 201 ).json( jsonResponse( "success", {
      "message": `${userInfo.email} đăng nhập thành công!`,
      "domain": process.env.APP_ENV === "production" ? `${serverContainUser.info.domain}/#/` : `${serverContainUser.info.domain}:${serverContainUser.info.clientPort}/#/`
    } ) );
  },
  "signUp": async ( req, res ) => {
    const { name, email, phone, password, presenter, region } = req.body,
      isEmailExist = await Account.findOne( { email } ),
      isPhoneExist = await Account.findOne( { phone } ),
      memberRole = await Role.findOne( { "level": "Member" } ),
      optimalServer = await Server.findOne( { region, "status": 1 } ).sort( { "slot": -1 } );

    let cookie, newUser, resSyncNestedServer, isEnvironment;

    if ( isEmailExist ) {
      return res.status( 403 ).json( { "status": "fail", "phone": "Email đã tồn tại!" } );
    } else if ( isPhoneExist ) {
      return res.status( 403 ).json( { "status": "fail", "phone": "Số điện thoại đã tồn tại!" } );
    }

    newUser = await new Account( {
      name,
      email,
      phone,
      presenter,
      password,
      "status": 1,
      "expireDate": new Date().setDate( new Date().getDate() + 3 ),
      "_role": memberRole._id
    } );

    // Sync with nested server
    isEnvironment = process.env.APP_ENV === "production" ? `${optimalServer.info.domain}:${optimalServer.info.serverPort}/api/v1/signup` : `${optimalServer.info.domain}:${optimalServer.info.serverPort}/api/v1/signup`;
    resSyncNestedServer = await signUpSync( isEnvironment, newUser.toObject() );
    if ( resSyncNestedServer.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Quá trình đăng ký xảy ra vấn đề!" } );
    }

    await newUser.save();

    // Push account to server
    optimalServer.userAmount.push( newUser._id );
    optimalServer.slot = optimalServer.amountMax - optimalServer.userAmount.length;
    optimalServer.save();

    // Assign cookie to headers
    cookie = `sid=${signToken( newUser )}; uid=${newUser._id}; cfr=${memberRole.level}`;
    res.set( "Cookie", cookie );

    res.status( 201 ).json( jsonResponse( "success", {
      "message": `${newUser.email} đăng ký thành công!`,
      "domain": process.env.APP_ENV === "production" ? `${optimalServer.info.domain}/#/` : `${optimalServer.info.domain}:${optimalServer.info.clientPort}/#/`
    } ) );
  },
  "signInByAdmin": async ( req, res ) => {
    const { email } = req.body,
      userInfo = await Account.findOne( { "email": email } ),
      adminRole = await Role.findOne( { "_id": userInfo._role } ),
      cookie = `sid=${ signToken( userInfo ) }; uid=${userInfo._id}; cfr=${adminRole.level}`;

    res.set( "Cookie", cookie );

    res.status( 201 ).json( jsonResponse( "success", `${userInfo.email} đăng nhập thành công!` ) );
  },
  "signUpByAdmin": async ( req, res ) => {
    // check code admin from headers
    const { name, email, phone, password } = req.body,
      adminRole = await Role.findOne( { "level": "Admin" } ),
      isEmail = await Account.findOne( { "email": email } ),
      isPhone = await Account.findOne( { "phone": phone } );

    // Check exists
    if ( isEmail ) {
      return res.status( 404 ).json( { "status": "error", "message": "Email đã tồn tại." } );
    } else if ( isPhone ) {
      return res.status( 404 ).json( { "status": "error", "message": "Số điện thoại đã tồn tại." } );
    }

    let buffer, header, key, newUser;

    buffer = fs.readFileSync( "./src/databases/key.json" );
    key = JSON.parse( buffer );

    if ( key.staffKey.includes( req.headers.token ) === false ) {
      return res.status( 404 ).json( { "status": "error", "message": "Mã xác thực nhân viên của bạn không đúng hoặc IP không hợp lệ!" } );
    }

    // Check validator
    if ( name === undefined || name.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "name": "Tên không được để trống!" } );
    } else if ( phone === undefined || phone.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "phone": "Số điện thoại không được để trống!" } );
    } else if ( email === undefined || email.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "email": "Email không được để trống!" } );
    } else if ( password === undefined || password.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "password": "Mật khẩu không được để trống!" } );
    }

    // Create object mongo
    newUser = new Account( {
      "name": name,
      "email": email,
      "phone": phone,
      "password": password,
      "status": 1,
      "_role": adminRole._id
    } );

    // Save
    await newUser.save();

    header = `sid=${signToken( newUser )}; uid=${newUser._id}; cfr=${adminRole.level}`;

    res.set( "Cookie", header );

    res.status( 201 ).json( jsonResponse( "success", `${newUser.email} đăng ký thành công!` ) );
  },
  "updateSync": async ( req, res ) => {
    const { info, id } = req.body,
      userInfo = await Account.findOne( { "_id": id } );
    
    if ( !userInfo ) {
      res.send( { "status": "error", "message": "Tài không được đồng bộ trên server!" } );
    }

    let data = await Account.findByIdAndUpdate(
      userInfo._id,
      {
        "$set": info
      },
      {
        "new": true
      }
    ).select( "-password -__v" );

    res.send( { "status": "success", "data": data } );
  }
};
