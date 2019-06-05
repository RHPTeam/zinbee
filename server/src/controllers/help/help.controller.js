/**
 * Controller blogs help for project
 * author: hoc-anms
 * updater:
 * date up: 15/05/2019
 * date to:
 * team: BE-RHP
 */

const Help = require( "../../models/help/Help.model" );

const jsonResponse = require( "../../configs/response" );

module.exports = {
  "getHelpHomePageDefault": async ( req, res ) => {
    const data = await Help.findOne( { "name": "help_homepage" } ).populate( "popular_blog" ).populate( "popular_section" ).lean();

    res
      .status( 200 )
      .json( jsonResponse( "success", data ) );
  },
  "update": async ( req, res ) => {
    let helpHomePageInfo = await Help.findOne( { "name": "help_homepage" } );
    
    if ( !helpHomePageInfo ) {
      const newHelpHomePage = new Help( {
        "name": "help_homepage",
        "text": "Help Homepage Default"
      } );

      await newHelpHomePage.save();

      helpHomePageInfo = newHelpHomePage;

    }
      
    if ( req.body.popular_blog && req.body.popular_blog.length > 5 ) {
      return res.status( 403 ).json( { "status": "fail", "popular_blog": "Bài viết phổ biến không được quá 5 bài" } );
    } else if ( req.body.popular_section && req.body.popular_section.length > 4 ) {
      return res.status( 403 ).json( { "status": "fail", "popular_section": "Danh mục phổ biến không được quá 4 danh mục" } );
    }
    res.status( 201 ).json( jsonResponse( "success", await Help.findByIdAndUpdate( helpHomePageInfo._id, { "$set": req.body }, { "new": true } ) ) );

  }
};
