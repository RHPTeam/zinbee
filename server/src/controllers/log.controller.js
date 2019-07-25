const Log = require( "../models/Log.model" );

module.exports = {
  "index": async ( req, res ) => {
    let data;

    if ( req.query._id ) {
      data = await Log.findOne( { "_id": req.query._id } ).populate( { "path": "_account", "select": "-password" } ).lean();
    } else if ( req.query._accountId ) {
      data = await Log.findOne( { "_account": req.query._accountId } ).populate( { "path": "_account", "select": "-password" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      data = await Log.find( {} ).populate( { "path": "_account", "select": "-password" } ).lean();
    }

    res.status( 200 ).send( { "status": "success", "data": data } );
  },
  "create": async ( req, res ) => {
    const { body } = req,
      findLog = await Log.findOne( { "_account": body._account } );

    if ( !findLog ) {
      const newLog = await new Log( { "_account": body._account } );

      Promise.all( body.data.map( async ( log ) => {
        newLog.logs.push( log.logs );
      } ) );
      await newLog.save();
      return res.send( { "status": "success", "data": "Synchronized..." } );
    }
    Promise.all( body.data.map( async ( log ) => {
      findLog.logs.push( log.logs );
    } ) );
    await findLog.save();
    res.send( { "status": "success", "data": "Synchronized..." } );
  }
};
