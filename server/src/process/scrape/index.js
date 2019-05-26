const Account = require( "../../models/Account.model" );
const PostFacebook = require( "../../models/Post.model" );

const io = require( "socket.io-client" ),
  socket = io.connect( process.env.SOCKET_SCRAPE_URL );

let keywords = [];

( async () => {
  console.log( "Process: Scrape started..." );

  socket.on( "connect", async () => {
    console.log(
      `Connected to crawl server which address is ${
        process.env.SOCKET_SCRAPE_URL
      }`
    );

    socket.emit( "newKey", "handle here" );

    // Step 1: Listen keyword user send and move to crawl server
    socket.on( "getKey", async ( data ) => {
      console.log( data );

      // Step 1.1: Get keyword from database
      const accountList = await Account.find( {} )
          .select( "keywords" )
          .lean(),
        postList = await PostFacebook.find( { "generate": 1 } )
          .select( "feedId like share photos content generate -_id" )
          .lean();

      // Step 1.2: concat all keywords
      await Promise.all(
        accountList.map( ( account ) => {
          keywords = keywords.concat( account.keywords );
        } )
      );

      // Step 1.3: Send info to crawl server
      socket.emit( "infoCrawl", {
        "keywords": keywords,
        "postList": postList
      } );
    } );

    // Step final: Listen data response and process
    socket.on( "listPostCrawled", async ( data ) => {
      console.log( data );
      console.log( typeof data );
      await PostFacebook.insertMany( data, function( error, docs ) {
        if ( error ) {
          console.log( error );
        }
        console.log( "successfully!" );
      } );

      console.log( "Crawler post facebook finnished!" );
    } );
  } );
} )();
