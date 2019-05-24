/**
 * Controller users or account for project
 * author: Sky Albert
 * updater: ___
 * date up: 21/05/2019
 * date to: ___
 * team: BE-RHP
 */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */

const JWT = require( "jsonwebtoken" );
const randomString = require( "randomstring" );

const Account = require( "../models/Account.model" );
const Role = require( "../models/Role.model" );

const fs = require( "fs" );
const jsonResponse = require( "../configs/response" );
const checkPhone = require( "../helpers/utils/checkPhone.util" ),
  secure = require( "../helpers/utils/secure.util" ),
  { signUp, signIn } = require( "../services/account.service" ),
  // set one cookie
  option = {
    "maxAge": 1000 * 60 * 60 * 24, // would expire after 1 days
    "httpOnly": true, // The cookie only accessible by the web server
    "signed": true, // Indicates if the cookie should be signed
    "secure": true
  },
  signToken = ( user ) => {
    return JWT.sign(
      {
        "iss": "RHPTeam",
        "sub": user._id,
        "iat": new Date().getTime(), // current time
        "exp": new Date().setDate( new Date().getDate() + 1 ) // current time + 1 day ahead
      },
      process.env.APP_KEY
    );
  };

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
  /**
   *  Update User (Note: Have to header['Authorization']
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "update": async ( req, res ) => {
    const { body } = req;
    const email = secure( res, req.headers.authorization );
    const foundUser = await Account.findOne( { "email": email } );

    if ( !foundUser ) {
      return res
        .status( 403 )
        .json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    const dataResponse = await Account.findByIdAndUpdate(
      foundUser._id,
      {
        "$set": body
      },
      {
        "new": true
      }
    ).select( "-password" );

    res
      .status( 201 )
      .json( jsonResponse( "Update account successfull!", dataResponse ) );
  },
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
  "signIn": async ( req, res ) => {
    const foundUser = await Account.findOne( req.user._id ).select( "-password" ).lean(),
      sendData = {
        "email": req.value.body.email,
        "password": req.value.body.password
      };
    // check expire date

    if ( Date.now() >= foundUser.expireDate.getTime() ) {
      await Account.findByIdAndUpdate(
        req.user._id,
        { "$set": { "status": 0 } },
        { "new": true }
      );
      return res.status( 403 ).json( { "status": "error", "message": "Tài khoản của bạn đã hết hạn ngừng hoạt động vui lòng liên hệ hỗ trợ!" } );
    }
    if ( foundUser.status === false ) {
      return res.status( 403 ).json( { "status": "error", "message": "Tài khoản của bạn đã ngừng hoạt động vui lòng liên hệ hỗ trợ!" } );
    }
    if ( req.body.ip && req.body.ip !== null ) {
      let checkExist = false;

      if ( foundUser.ip === undefined || foundUser.ip.length === 0 ) {
        await Account.findByIdAndUpdate(
          foundUser._id,
          { "$push": { "ip": req.body.ip } },
          { "new": true }
        ).select( "-password" );
      } else {
        foundUser.ip.map( async ( ip ) => {
          if ( ip.query === req.body.ip.query ) {
            checkExist = true;
            return checkExist;
          }
        } );
        if ( checkExist === false ) {
          await Account.findByIdAndUpdate(
            foundUser._id,
            { "$push": { "ip": req.body.ip } },
            { "new": true }
          ).select( "-password" );
        }
      }
    }
    // Role for user
    let roleMember;
    let roleAdmin;
    let roleSuperAdmin;
    const foundRoleMember = await Role.findOne( { "level": "Member" } );
    const foundRoleAdmin = await Role.findOne( { "level": "Admin" } );
    const foundRoleSuperAdmin = await Role.findOne( { "level": "SuperAdmin" } );

    roleMember = foundRoleMember._id;
    roleAdmin = foundRoleAdmin._id;
    roleSuperAdmin = foundRoleSuperAdmin._id;
    // Generate the token
    const sessionToken = await signToken( req.user );

    res.cookie( "sid", sessionToken, option );
    res.cookie( "uid", foundUser._id.toString(), option );
    foundUser._role.toString() === roleMember.toString() ? res.cookie( "c_fr", 0 ) : foundUser._role.toString() === roleAdmin.toString() ? res.cookie( "c_fr", 1, option ) : foundUser._role.toString() === roleSuperAdmin.toString() ? res.cookie( "c_fr", 2, option ) : res.status( 405 ).json( jsonResponse( "You are not assign!", null ) );
    if ( foundUser._role.toString() === roleMember.toString() ) {
      role = randomString.generate( 10 ) + 0 + randomString.generate( 1997 );
    } else if ( foundUser._role.toString() === roleAdmin.toString() ) {
      role = randomString.generate( 10 ) + 1 + randomString.generate( 1997 );
    } else if ( foundUser._role.toString() === roleSuperAdmin.toString() ) {
      role = randomString.generate( 10 ) + 2 + randomString.generate( 1997 );
    }
    signIn( `${ process.env.SERVER_CHILDRENT_NORTH }/signin`, sendData );
    res.status( 200 ).json(
      jsonResponse( "Successfully!", {
        "token": sessionToken,
        "user": foundUser,
        "role": role
      } )
    );
  },
  "signUp": async ( req, res ) => {
    const { email, phone } = req.value.body,
      isPhone = checkPhone( req.value.body.phone ),
      foundUserEmail = await Account.findOne( { email } ),
      foundUserPhone = await Account.findOne( { phone } ),
      foundRoleMember = await Role.findOne( { "level": "Member" } ),
      foundRoleAdmin = await Role.findOne( { "level": "Admin" } ),
      foundRoleSuperAdmin = await Role.findOne( { "level": "SuperAdmin" } );

    if ( isPhone === false ) {
      return res.status( 403 ).json( { "status": "error", "message": "Số điện thoại không đúng!" } );
    }
    if ( foundUserEmail ) {
      return res.status( 404 ).json( { "status": "error", "message": "Email đã tồn tại!" } );
    }
    if ( foundUserPhone ) {
      return res.status( 404 ).json( { "status": "error", "message": "Số điện thoại đã tồn tại!" } );
    }
    // Role for user
    let roleMember,
      roleAdmin,
      roleSuperAdmin;

    roleMember = foundRoleMember._id;
    roleAdmin = foundRoleAdmin._id;
    roleSuperAdmin = foundRoleSuperAdmin._id;

    const objDefine = {
        "email": req.value.body.email,
        "name": req.value.body.name,
        "phone": req.value.body.phone,
        "password": req.value.body.password,
        "presenter": req.value.body.presenter,
        "imageAvatar": "",
        "_role": roleMember
      },
      sendData = {
        "email": req.value.body.email,
        "name": req.value.body.name,
        "phone": req.value.body.phone,
        "password": req.value.body.password,
        "presenter": req.value.body.presenter
      },
      newUser = await new Account( objDefine ),
      sessionToken = await signToken( newUser );

    await res.cookie( "sid", sessionToken, option );
    await res.cookie( "uid", newUser._id, option );
    const expireDate = new Date( newUser.created_at );

    newUser.expireDate = expireDate.setDate( expireDate.getDate() + 3 );
    Date.now() >= newUser.expireDate.getTime() ? ( newUser.status = 0 ) : ( newUser.status = 1 );
    await newUser.save();
    req.body.ip ? await Account.findByIdAndUpdate(
      newUser._id,
      { "$push": { "ip": req.body.ip } },
      { "new": true }
    ).select( "-password" ) : newUser.ip;
    newUser._role.toString() === roleMember.toString() ? res.cookie( "c_fr", 0, option ) : newUser._role.toString() === roleAdmin.toString() ? res.cookie( "c_fr", 1, option ) : newUser._role.toString() === roleSuperAdmin.toString() ? res.cookie( "c_fr", 2, option ) : res.status( 405 ).json( jsonResponse( "You are not assign!", null ) );
    // Add cfr to data storage of browser
    if ( newUser._role.toString() === roleMember.toString() ) {
      role = randomString.generate( 10 ) + 0 + randomString.generate( 1997 );
    } else if ( newUser._role.toString() === roleAdmin.toString() ) {
      role = randomString.generate( 10 ) + 1 + randomString.generate( 1997 );
    } else if ( newUser._role.toString() === roleSuperAdmin.toString() ) {
      role = randomString.generate( 10 ) + 2 + randomString.generate( 1997 );
    }
    // send axios to server children
    signUp( `${ process.env.SERVER_CHILDRENT_NORTH }/signup`, sendData );
    res.status( 200 ).json(
      jsonResponse( "Successfully!", {
        "_id": newUser._id,
        "email": newUser.email,
        "token": sessionToken,
        "role": role
      } )
    );
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

    header = `sid=${JWT.sign(
      {
        "iss": "RHPTeam",
        "sub": userInfo._id,
        "iat": new Date().getTime(),
        "exp": new Date().setDate( new Date().getDate() + 1 )
      },
      process.env.APP_KEY )}; uid=${userInfo._id}; cfr=${adminRole.level}`;

    res.set( "Cookie", header );

    console.log( res );

    res.status( 201 ).json( jsonResponse( "success", `${newUser.email} đăng ký thành công!` ) );
  }
};
