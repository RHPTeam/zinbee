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

const jsonResponse = require( "../../configs/response" );

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
    const help = await Help.find( {} )[ 0 ];
      
    if ( req.body.popular_blog && req.body.popular_blog.length <= 5 ) {
      if ( help.popular_blog.length + req.body.popular_blog.length > 5 ) {
        const temp = help.popular_blog.length + req.body.popular_blog.length - 5;

        for ( let i = help.popular_blog.length; i > 5 - temp; i-- ) {
          help.popular_blog.pull( help.popular_blog[ i ] );
        }
        await help.save();

      }
      await Promise.all( help.vote.map( ( vote ) => {
        delete vote._id;
      } ) );
      req.body.vote = req.body.vote.concat( findBlogHelp.vote );
    }
    res.status( 201 ).json( jsonResponse( "success", await BlogHelp.findByIdAndUpdate( help._id, { "$set": req.body }, { "new": true } ) ) );

  }
};
