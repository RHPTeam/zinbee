// Require module process
require( "./scrape" );

const Role = require( "../models/Role.model" );
const Help = require( "../models/help/Help.model" );
const Product = require( "../models/market/Product.model" );
const MarketPost = require( "../models/market/products/post.model" );

( async () => {
  const foundHelp = await Help.find( {} ),
    foundRole = await Role.find( {} );

  // Check Role First Time Server running
  if ( foundRole.length === undefined || foundRole.length === 0 ) {
    const arr = [
      { "level": "SuperAdmin" },
      { "level": "Admin" },
      { "level": "Member" }
    ];

    await Role.insertMany( arr );
    console.log( "Create role successfully!" );
  }

  // Check Help First Time Server running
  if ( foundHelp.length === undefined || foundHelp.length === 0 ) {
    const defaultHelp = await new Help( {} );

    await defaultHelp.save();
  }

  let foundProduct = await Product.find( {} );

  await Promise.all( foundProduct.map( async ( product ) => {
    await MarketPost.findByIdAndUpdate( { "_id": product.content }, { "$set": { "assign": true } }, { "new": true } );
  } ) );
} )();
