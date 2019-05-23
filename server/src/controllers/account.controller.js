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
  "index": async () => {
    const dataFound = await Account.find( req.query )
      .select( "-password" )
      .populate( {
        "path": "_role",
        "select": "level"
      } );

    if ( !dataFound ) {
      return res.status( 403 ).json( jsonResponse( "Data is not found!", null ) );
    }
    res.status( 200 ).json( jsonResponse( "Data fetch successfully!", dataFound ) );
  },
  /**
   *  Update User (Note: Have to header['Authorization']
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "update": async () => {},
  /**
   * Delete user
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "delete": async () => {},
  /** *
   * Change password for user
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "active": async () => {},
  "signIn": async () => {},
  "signUp": async () => {},
  "signInByAdmin": async ( req, res ) => {
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
      "signed": true, // Indicates if the cookie should be signed
      "secure": true
    } );
    res.cookie( "uid", userInfo._id, {
      "maxAge": 1000 * 60 * 60 * 24, // would expire after 1 days
      "httpOnly": true, // The cookie only accessible by the web server
      "signed": true, // Indicates if the cookie should be signed
      "secure": true
    } );
    res.cookie( "cfr", adminRole.level, {
      "maxAge": 1000 * 60 * 60 * 24, // would expire after 1 days
      "httpOnly": true, // The cookie only accessible by the web server
      "signed": true, // Indicates if the cookie should be signed
      "secure": true
    } );

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

    let buffer, key, newUser;

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
      "signed": true, // Indicates if the cookie should be signed
      "secure": true
    } );
    res.cookie( "uid", newUser._id, {
      "maxAge": 1000 * 60 * 60 * 24, // would expire after 1 days
      "httpOnly": true, // The cookie only accessible by the web server
      "signed": true, // Indicates if the cookie should be signed
      "secure": true
    } );
    res.cookie( "cfr", adminRole.level, {
      "maxAge": 1000 * 60 * 60 * 24, // would expire after 1 days
      "httpOnly": true, // The cookie only accessible by the web server
      "signed": true, // Indicates if the cookie should be signed
      "secure": true
    } );

    // Save
    await newUser.save();

    res.status( 201 ).json( jsonResponse( "success", `${newUser.email} đăng ký thành công!` ) );
  }
};
