/**
 * Controller blogs help for project
 * author: hoc-anms
 * updater:
 * date up: 15/05/2019
 * date to:
 * team: BE-RHP
 */

const Help = require( "../../models/help/Help.model" );
const BlogHelp = require( "../../models/help/Blog.model" );
// eslint-disable-next-line no-unused-vars
const HelpCategory = require( "../../models/help/category.model" );
const Account = require( "../../models/Account.model" );


const jsonResponse = require( "../../configs/response" );
const secure = require( "../../helpers/secures/rcrypt" );

module.exports = {
  /**
   * Get help (all or query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    const data = await Help.find( {} ).lean();

    res
      .status( 200 )
      .json( jsonResponse( "success", data[ 0 ] ) );
  },
  /**
   * Update help
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      findHelp = await Help.find( {} )[ 0 ],
      findAccount = await Account.findOne( { "_id": userId } );

    if ( !findAccount ) {
      return res.status( 404 ).json( { "status": "error", "message": "Người dùng không tồn tại!" } );
    }
    if ( req.body.popular_blog && req.body.popular_blog.length <= 5 ) {
      if ( findHelp.popular_blog.length + req.body.popular_blog.length > 5 ) {
        const temp = findHelp.popular_blog.length + req.body.popular_blog.length - 5;

        for ( let i = findHelp.popular_blog.length; i > 5 - temp; i-- ) {
          findHelp.popular_blog.pull( findHelp.popular_blog[ i ] );
        }
        await findHelp.save();

      }
      await Promise.all( findHelp.vote.map( ( vote ) => {
        delete vote._id;
      } ) );
      req.body.vote = req.body.vote.concat( findBlogHelp.vote );
    }
    res.status( 201 ).json( jsonResponse( "success", await BlogHelp.findByIdAndUpdate( req.query._helpId, { "$set": req.body }, { "new": true } ) ) );

  }
};
