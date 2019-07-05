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
const Agency = require( "../models/agency/Agency.model" );
const Server = require( "../models/Server.model" );
const { writeForgotPassword } = require( "../databases/templates/email" );

const fs = require( "fs" );
const jsonResponse = require( "../configs/response" );

const { findSubString } = require( "../helpers/utils/functions/string" );
const { signToken } = require( "../configs/jwt" );
const { signUpSync, createNewPasswordSync, activeAccountSync, changeStatusAccountSync } = require( "../microservices/synchronize/account" ),
  mail = require( "nodemailer" ),
  CronJob = require( "cron" ).CronJob;

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
    const { id } = req.body,
      userInfo = await Account.findOne( { "_id": id } ),
      vpsContainServer = await Server.findOne( { "userAmount": userInfo._id } ).select( "info" ).lean();

    userInfo.status = !userInfo.status;
    let data = await Account.findByIdAndUpdate( id, { "$set": { "status": userInfo.status } }, { "new": true } ).select( "-password" ),
      resUserSync = await changeStatusAccountSync( `${vpsContainServer.info.domain}:${vpsContainServer.info.serverPort}/api/v1/users/sync/change-status`, req.body, req.headers.authorization );

    if ( resUserSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }
    res.status( 200 ).json( jsonResponse( "success", data ) );
  },
  "getUserInfo": async ( req, res ) => {
    const data = await Account.findOne( { "_id": req.uid } ).select( "-password" ).lean();

    res.status( 200 ).json( jsonResponse( "success", data ) );
  },
  "index": async ( req, res ) => {
    let dataResponse = null;

    // Check if query get one item from _id
    if ( req.query._id ) {
      dataResponse = await Account.findOne( { "_id": req.query._id } ).select( "-password" ).populate( { "path": "_role", "select": "_id level" } ).lean();
      return res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Account.find( req.query ).select( "-password" ).lean();
      return res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
    }

    // Handle get items by pagination from database
    if ( req.query._size && req.query._page ) {
      const pageNo = parseInt( req.query._page ),
        size = parseInt( req.query._size ),
        query = {},
        totalPosts = await Account.countDocuments( {} );

      // Check catch
      if ( pageNo < 0 || pageNo === 0 ) {
        return res.status( 403 ).json( { "status": "error", "message": "Dữ liệu số trang không đúng, phải bắt đầu từ 1." } );
      }

      // Handle input data before connect to mongodb
      query.skip = size * ( pageNo - 1 );
      query.limit = size;
      query.sort = { "$natural": -1 };

      // Handle with mongodb
      dataResponse = await Account.find( {}, "-password -created_at -updated_at -__v", query ).lean();

      return res.status( 200 ).json( jsonResponse( "success", { "results": dataResponse, "page": Math.ceil( totalPosts / size ), "size": size } ) );
    }
    res.status( 304 ).json( jsonResponse( "fail", "API này không được cung cấp!" ) );
  },
  "searchUser": async ( req, res ) => {
    const findAccount = await Account.findOne( { "$or": [ { "email": req.query._keyword }, { "phone": req.query._keyword } ] } ).select( "-password" ).populate( { "path": "_role", "select": "_id level" } ).lean();

    if ( !findAccount ) {
      return res.status( 403 ).json( { "status": "fail", "message": "Tài khoản không tồn tại" } );
    }
    res.status( 200 ).json( jsonResponse( "success", findAccount ) );
  },
  "renewById": async ( req, res ) => {
    let data, resUserSync;

    // Check validator
    if ( req.body.id === undefined || req.body.id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "id": "Vui lòng cung cấp id người dùng để kích hoạt!" } );
    } else if ( req.body.expireDate < new Date() ) {
      return res.status( 403 ).json( { "status": "fail", "expireDate": "Ngày gia hạn cần phải ở tương lai!" } );
    }

    const { id, maxAccountFb, expireDate } = req.body,
      userInfo = await Account.findOne( { "_id": id } ),
      vpsContainServer = await Server.findOne( { "userAmount": userInfo._id } ).select( "info" ).lean();


    // Check exists
    if ( !userInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Người dùng này không tồn tại!" } );
    }

    // Update expire date
    data = await Account.findByIdAndUpdate( id, { "$set": { "status": 1, "expireDate": expireDate, "maxAccountFb": maxAccountFb } }, { "new": true } ).select( "-password" );

    resUserSync = await activeAccountSync( `${vpsContainServer.info.domain}:${vpsContainServer.info.serverPort}/api/v1/users/active`, req.body, req.headers.authorization );
    if ( resUserSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }

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
        const vpsContainServer = await Server.findOne( { "userAmount": user._id } ).select( "info" ).lean();
        let resUserSync,
          id = user._id;

        user.status = 1;
        user.expireDate = req.body.expireDate;

        await Account.findByIdAndUpdate(
          user._id,
          { "$set": user },
          { "new": true }
        );
        // Update expire date
        resUserSync = await activeAccountSync( `${vpsContainServer.info.domain}:${vpsContainServer.info.serverPort}/api/v1/users/active`, { "id": id, "expireDate": req.body.expireDate }, req.body.headers );
        if ( resUserSync.data.status !== "success" ) {
          return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
        }
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
    cookie = `sid=${ signToken( userInfo ) }; uid=${userInfo._id}; cfr=${memberRole.level};`;

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
      return res.status( 405 ).json( { "status": "fail", "phone": "Số điện thoại đã tồn tại!" } );
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
    cookie = `sid=${signToken( newUser )}; uid=${newUser._id}; cfr=${memberRole.level};`;
    res.set( "Cookie", cookie );

    // check browser user have link and cookie affiliate
    if ( req.headers.authorization && findSubString( req.headers.authorization, "aid=", ";" ) ) {
      const findAgency = await Agency.findOne( { "_id": findSubString( req.headers.authorization, "aid=", ";" ) } );

      if ( findAgency ) {
        findAgency.customer.total += 1;
        findAgency.customer.listOfUser.push( { "user": newUser._id, "typeUser": 0 } );
        await findAgency.save();
      }
    }

    res.status( 201 ).json( jsonResponse( "success", {
      "message": `${newUser.email} đăng ký thành công!`,
      "domain": process.env.APP_ENV === "production" ? `${optimalServer.info.domain}/#/` : `${optimalServer.info.domain}:${optimalServer.info.clientPort}/#/`
    } ) );
  },
  "signUpAccountBackup": async ( objectData ) => {
    const { name, email, phone, status, expireDate, presenter, other01 } = objectData,
      isEmailExist = await Account.findOne( { email } ),
      isPhoneExist = await Account.findOne( { phone } ),
      memberRole = await Role.findOne( { "level": "Member" } ),
      optimalServer = await Server.findOne( { "region": 0, "status": 1 } ).sort( { "slot": -1 } ),
      character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let newUser, resSyncNestedServer, isEnvironment, code = "";

    // Random get six character
    for ( let i = 0; i < 6; i++ ) {
      code += character.charAt( Math.floor( Math.random() * character.length ) );
    }
    if ( isEmailExist ) {
      return;
    } else if ( isPhoneExist ) {
      return;
    }
    newUser = await new Account( { name, email, phone, "password": code, status, expireDate, presenter, other01, "_role": memberRole._id } );

    // Sync with nested server
    isEnvironment = process.env.APP_ENV === "production" ? `${optimalServer.info.domain}:${optimalServer.info.serverPort}/api/v1/signup` : `${optimalServer.info.domain}:${optimalServer.info.serverPort}/api/v1/signup`;
    resSyncNestedServer = await signUpSync( isEnvironment, newUser.toObject() );
    if ( resSyncNestedServer.data.status !== "success" ) {
      return;
    }

    await newUser.save();

    // Push account to server
    optimalServer.userAmount.push( newUser._id );
    optimalServer.slot = optimalServer.amountMax - optimalServer.userAmount.length;
    optimalServer.save();
    // Send password to user
  },
  "resetPassword": async ( req, res, next ) => {
    const { email } = req.body,
      character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let code = "", cronCode, transporter, userAssignCode, userInfo;

    // Check validator
    if ( !email ) {
      return res.status( 404 ).json( { "status": "error", "message": "Vui lòng cung cấp email!" } );
    }

    userInfo = await Account.findOne( { email } );

    // Check errors
    if ( !userInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Email không tồn tại trên hệ thống!" } );
    }

    // Random get six character
    for ( let i = 0; i < 6; i++ ) {
      code += character.charAt( Math.floor( Math.random() * character.length ) );
    }

    // Use Smtp Protocol to send Email
    transporter = await mail.createTransport( {
      "service": "Gmail",
      "auth": {
        "user": process.env.MAIL_USERNAME,
        "pass": process.env.MAIL_PASSWORD
      }
    } );

    // Setup template email
    await transporter.sendMail(
      {
        "from": process.env.MAIL_USERNAME,
        "to": req.body.email,
        "subject": "Xác nhận thay đổi mật khẩu",
        "html": writeForgotPassword( code )
      },
      ( err ) => {
        if ( err ) {
          return next( err );
        }
      }
    );

    // Update code temp
    userAssignCode = await Account.findOneAndUpdate( { "_id": userInfo._id }, { "code": code } ).select( "-password" );

    if ( !userAssignCode ) {
      return res.status( 404 ).json( { "status": "error", "message": "[Email] Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }

    res.status( 201 ).json( { "status": "success", "message": `Vui lòng check email ${req.body.email} để lấy code` } );

    cronCode = await new CronJob( "* 5 * * * *", async () => {
      const user = await Account.findOne( { "_id": userInfo._id } );

      if ( user.code === "" || user.code === null ) {
        return;
      }

      await Account.findByIdAndUpdate( userInfo._id, { "$set": { "code": "" } }, { "new": true } ).select( "-password" );
    }, () => {
      cronCode.stop();
    }, null,
    true,
    "Asia/Ho_Chi_Minh" );
  },
  "checkCode": async ( req, res ) => {
    const { email, code } = req.body;

    let userInfo;

    if ( !email || !code ) {
      return res.status( 405 ).json( { "status": "error", "message": "Vui lòng cung cấp mã!" } );
    }

    userInfo = await Account.findOne( { email, code } );

    if ( !userInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Mã xác thực không chính xác!" } );
    }

    return res.status( 201 ).json( { "status": "success", "message": `${email} xác thực code thành công!` } );
  },
  "createNewPassword": async ( req, res ) => {
    const { code, email, password } = req.body,
      userInfo = await Account.findOne( { code, email } ),
      memberRole = await Role.findOne( { "_id": userInfo._role } ),
      vpsContainServer = await Server.findOne( { "userAmount": userInfo._id } ).select( "info" ).lean();

    let resUserSync;

    if ( !userInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Phiên tạo mới mật khẩu của bạn đã hết hạn!" } );
    }

    // Sync
    console.log( "du ma sai gon" );
    resUserSync = await createNewPasswordSync( `${vpsContainServer.info.domain}:${vpsContainServer.info.serverPort}/api/v1/users/create-password`, { password }, { "Authorization": `sid=${signToken( userInfo._id )}; uid=${userInfo._id}; cfr=${memberRole.level};` } );
    if ( resUserSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }

    userInfo.password = password;
    // Save
    await userInfo.save();

    // Reset code
    await Account.findByIdAndUpdate( userInfo._id, { "$set": { "code": "" } }, { "new": true } ).select( "-password" );

    res.status( 201 ).json( jsonResponse( "Change Password successfully!", null ) );
  },
  "getUserInfoLostPass": async ( req, res ) => {
    const userInfo = await Account.findOne( { "email": req.query.email } ).select( "name email imageAvatar" );

    if ( !userInfo ) {
      return res.status( 405 ).json( { "status": "error", "message": "Tài khoản không tồn tại!" } );
    }
    res.status( 200 ).json( jsonResponse( "success", userInfo ) );
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
      collaboratorRole = await Role.findOne( { "level": "Collaborator" } ),
      isEmail = await Account.findOne( { "email": email } ),
      isPhone = await Account.findOne( { "phone": phone } );

    // Check exists
    if ( isEmail ) {
      return res.status( 404 ).json( { "status": "error", "message": "Email đã tồn tại." } );
    } else if ( isPhone ) {
      return res.status( 404 ).json( { "status": "error", "message": "Số điện thoại đã tồn tại." } );
    }

    let buffer, header, key, newUser, roleCurrent;

    buffer = fs.readFileSync( "./src/databases/key.json" );
    key = JSON.parse( buffer );

    if ( key.staffKey.includes( req.headers.token ) === false && key.collaboratorKey.includes( req.headers.token ) === false ) {
      return res.status( 404 ).json( { "status": "error", "message": "Mã xác thực nhân viên của bạn không đúng hoặc IP không hợp lệ!" } );
    }

    // Check role
    if ( key.collaboratorKey.includes( req.headers.token ) === true ) {
      roleCurrent = collaboratorRole._id;
    } else if ( key.staffKey.includes( req.headers.token ) === true ) {
      roleCurrent = adminRole._id;
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
      "_role": roleCurrent
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
