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
  "update": async ( req, res ) => {
    const { body } = req;
    const userId = secure( res, req.headers.authorization );
    const foundUser = await Account.findOne( userId );

    if ( !foundUser ) {
      return res
        .status( 403 )
        .json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    const dataResponse = await Account.findByIdAndUpdate(
      userId,
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
  "signInByAdmin": async () => {

  },
  "signUpByAdmin": async ( req ) => {
    // check code admin from headers
    const key = JSON.parse( fs.readFileSync( "./src/databases/key.json" ) );

    console.log( key );
    if ( key.isAdmin.includes( req.headers.token ) ) {
      return;
    }
    console.log( await Role.find( {} ) );
  }

};
