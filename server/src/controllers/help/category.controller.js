/**
 * Controller help categories for project
 * author: hoc-anms
 * updater:
 * date up: 15/05/2019
 * date to:
 * team: BE-RHP
 */

const BlogHelp = require( "../../models/help/Blog.model" );
const HelpCategory = require( "../../models/help/category.model" );
const Account = require( "../../models/Account.model" );

const jsonResponse = require( "../../configs/response" );
const secure = require( "../../helpers/secures/rcrypt" );

module.exports = {
  "index": async ( req, res ) => {
    let data;

    if ( req.query._id ) {
      data = await HelpCategory.findOne( { "_id": req.query._id } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      data = await HelpCategory.find( {} ).lean();
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", data ) );
  },
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" || !req.body.title ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề blog không được bỏ trống!" } } );
    }

    let newCategory;

    // Create
    const { title, parent } = req.body;
    
    // Set default parent
    req.body.level = 0;

    // Handle parent category id
    if ( parent !== undefined && parent !== "" ) {
      const categoryParent = await HelpCategory.findOne( { "_id": parent } );

      if ( !categoryParent ) {
        return res.status( 404 ).json( { "status": "error", "message": "Danh mục cha không tồn tại!" } );
      }

      req.body.level = parseInt( categoryParent.level ) + 1;
    }

    newCategory = await new HelpCategory( {
      "title": title,
      "level": req.body.level,
      "parent": parent !== undefined && parent !== "" ? parent : "",
      "_account": req.headers.uid
    } );

    // Save mongodb
    await newCategory.save();

    res.status( 200 ).json( jsonResponse( "success", newCategory ) );
  },
  /**
   * Update category help
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" || !req.body.title ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề danh mục help không được bỏ trống!" } } );
    }

    const userId = secure( res, req.headers.authorization ),
      findHelpCategory = await HelpCategory.findById( req.query._categoryId );

    // Check catch when update user categories
    if ( !findHelpCategory ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục help không tồn tại!" } );
    } else if ( findHelpCategory._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho danh mục này!" } );
    }
    if ( req.body.parent ) {
      const findParentHelpCategory = await HelpCategory.findOne( { "_id": req.body.parent } );

      if ( findHelpCategory.level < findParentHelpCategory.level ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "title": "Bạn không thể cập nhật danh mục nhỏ cấp hơn!" } } );
      }
      findHelpCategory.parent = req.body.parent;
      findHelpCategory.level = findParentHelpCategory.level + 1;
      await findHelpCategory.save();
    }
    if ( req.body._blogHelp ) {
      req.body.vote = req.body._blogHelp.concat( findHelpCategory._blogHelp );
    }

    res.status( 201 ).json( jsonResponse( "success", await HelpCategory.findByIdAndUpdate( req.query._categoryId, { "$set": req.body }, { "new": true } ) ) );

  },
  /**
   * Delete category help
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      findHelpCategory = await HelpCategory.findById( req.query._categoryId ),
      findAccount = await Account.findOne( { "_id": userId } );
    // Check ctach when delete help categories

    if ( !findHelpCategory ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục không tồn tại!" } );
    }
    if ( !findAccount ) {
      return res.status( 404 ).json( { "status": "error", "message": "Người dùng không tồn tại!" } );
    }

    // When delete auto which all of help of that auto will deleted
    await Promise.all( findHelpCategory._blogHelp.map( async ( blogHelp ) => {
      let findBlogHelp = await BlogHelp.findOne( { "_id": blogHelp } );

      await findBlogHelp.remove();
    } ) );
    await HelpCategory.findByIdAndRemove( req.query._categoryId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
