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


const fs = require( "fs" );
const jsonResponse = require( "../configs/response" );
const JWT = require( "jsonwebtoken" );

module.exports = {
  "changeStatus": async ( req, res ) => {
    let data;

    const { id } = req.body,
      userInfo = await Account.findOne( { "_id": id } );

    userInfo.status = !userInfo;
    data = await Account.findByIdAndUpdate( id, { "$set": { "status": userInfo.status } }, { "new": true } ).select( "-password" );

    res.status( 200 ).json( jsonResponse( "success", data ) );
  },
  "index": async ( req, res ) => {
    let data;

    if ( req.query._id ) {
      data = await Account.findOne( { "_id": req.query._id } ).select( "-password" ).lean();
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
  "signIn": async () => {},
  "signUp": async () => {},
  "signInByAdmin": async ( req, res ) => {
    let header;

    const { email } = req.body,
      userInfo = await Account.findOne( { "email": email } ),
      adminRole = await Role.findOne( { "_id": userInfo._role } );

    // Check expire date
    if ( new Date( userInfo.expireDate ) < new Date() ) {
      await Account.findByIdAndUpdate( userInfo._id, { "$set": { "status": 0 } }, { "new": true } );
      return res.status( 405 ).json( { "status": "error", "message": "Tài khoản của bạn đã hết hạn. Vui lòng liên hệ với bộ phận CSKH!" } );
    }

    // Set cookie user
    res.cookie( "sid", JWT.sign(
      {
        "iss": "RHPTeam",
        "sub": userInfo._id,
        "iat": new Date().getTime(),
        "exp": new Date().setDate( new Date().getDate() + 1 )
      },
      process.env.APP_KEY
    ), {
      "maxAge": 1000 * 60 * 60 * 24, // would expire after 1 days
      "httpOnly": true, // The cookie only accessible by the web server
      "secure": true
    } );
    res.cookie( "uid", userInfo._id.toString(), {
      "maxAge": 1000 * 60 * 60 * 24, // would expire after 1 days
      "httpOnly": true, // The cookie only accessible by the web server
      "secure": true
    } );
    res.cookie( "cfr", adminRole.level, {
      "maxAge": 1000 * 60 * 60 * 24, // would expire after 1 days
      "httpOnly": true, // The cookie only accessible by the web server
      "secure": true
    } );

    header = `sid=${JWT.sign(
      {
        "iss": "RHPTeam",
        "sub": userInfo._id,
        "iat": new Date().getTime(),
        "exp": new Date().setDate( new Date().getDate() + 1 )
      },
      process.env.APP_KEY )}; uid=${userInfo._id}; cfr=${adminRole.level}`;

    res.set( "Cookie", header );

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
      "_role": adminRole._id
    } );

    // Set cookie user
    res.cookie( "sid", JWT.sign(
      {
        "iss": "RHPTeam",
        "sub": newUser._id,
        "iat": new Date().getTime(),
        "exp": new Date().setDate( new Date().getDate() + 1 )
      },
      process.env.APP_KEY
    ), {
      "maxAge": 1000 * 60 * 60 * 24, // would expire after 1 days
      "httpOnly": true, // The cookie only accessible by the web server
      "secure": true
    } );
    res.cookie( "uid", newUser._id, {
      "maxAge": 1000 * 60 * 60 * 24, // would expire after 1 days
      "httpOnly": true, // The cookie only accessible by the web server
      "secure": true
    } );
    res.cookie( "cfr", adminRole.level, {
      "maxAge": 1000 * 60 * 60 * 24, // would expire after 1 days
      "httpOnly": true, // The cookie only accessible by the web server
      "secure": true
    } );

    // Save
    await newUser.save();

    header = `sid=${JWT.sign(
      {
        "iss": "RHPTeam",
        "sub": userInfo._id,
        "iat": new Date().getTime(),
        "exp": new Date().setDate( new Date().getDate() + 1 )
      },
      process.env.APP_KEY )}; uid=${newUser._id}; cfr=${adminRole.level}`;

    res.set( "Cookie", header );

    console.log( res );

    res.status( 201 ).json( jsonResponse( "success", `${newUser.email} đăng ký thành công!` ) );
  }
};
