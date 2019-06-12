const MarketPost = require( "../../../models/market/products/post.model" );

module.exports = {
  "index": async ( req, res ) => {
    let data;

    if ( req.query._id ) {
      data = await MarketPost.findOne( { "_id": req.query._id } );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      data = await MarketPost.find( {} ).lean();
    }

    res.status( 200 ).json( { "status": "success", "data": data } );
  },
  "create": async ( req, res ) => {
    let { body } = req, newPost;

    // Check catch
    if ( body.title === "" || body.title === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "title": "Tiêu đề bài viết mẫu không được bỏ trống!" } );
    } else if ( body.content === "" || body.content === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "content": "Nội dung bài viết mẫu này không được bỏ trống!" } );
    }
    // set value default post
    body.content = body.content.replace( /(<br \/>)|(<br>)/gm, "\n" ).replace( /(<\/p>)|(<\/div>)/gm, "\n" ).replace( /(<([^>]+)>)/gm, "" );
    body._creator = req.uid;

    // set new object mongo
    newPost = await new MarketPost( body );

    await newPost.save();

    res.status( 201 ).json( { "status": "success", "data": newPost } );
  },
  "update": async ( req, res ) => {
    const { body, query } = req,
      postInfo = await MarketPost.findOne( { "_id": query._id } );

    // check catch
    if ( body.title === "" || body.title === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "title": "Tiêu đề bài viết mẫu không được bỏ trống!" } );
    } else if ( body.content === "" || body.content === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "content": "Nội dung bài viết mẫu này không được bỏ trống!" } );
    } else if ( !postInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sản phẩm này không tồn tại!" } );
    }

    body.content = body.content.replace( /(<br \/>)|(<br>)/gm, "\n" ).replace( /(<\/p>)|(<\/div>)/gm, "\n" ).replace( /(<([^>]+)>)/gm, "" );

    res.status( 200 ).json( { "status": "success", "data": ( await MarketPost.findByIdAndUpdate( query._id, { "$set": body }, { "new": true } ) ) } );
  },
  "delete": async ( req, res ) => {
    const { query } = req,
      postInfo = await MarketPost.findOne( { "_id": query._id } );

    // check catch
    if ( !postInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sản phẩm này không tồn tại!" } );
    }

    await postInfo.remove();

    res.status( 200 ).json( { "status": "success", "data": null } );
  },
  "upload": async ( req, res ) => {
    if ( !req.files || req.files.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "photos": "Không có ảnh upload, vui lòng kiểm tra lại!" } );
    }
    const photosList = req.files.map( ( file ) => {
      if ( file.fieldname === "photos" && file.mimetype.includes( "image" ) ) {
        return `${process.env.APP_URL}:${process.env.PORT_BASE}/${file.path.replace( /\\/gi, "/" )}`;
      }
    } );

    return res.status( 200 ).json( { "status": "success", "data": photosList } );
  }
};
