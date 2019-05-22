const io = require( "socket.io-client" ),
  socket = io.connect( process.env.SOCKET_SCRAPE_URL, { "reconnection": true } ),
  Account = require( "./src/models/Account.model" ),
  PostFacebook = require( "./src/models/user/PostFacebook.model" );

( async () => {
  socket.on( "connect", async () => {
    console.log( `Zinbee Server listen from ${process.env.SOCKET_SCRAPE_URL} Scrape Server.` );

    socket.emit( "newKey", "handle here" );

    // Listen keyword user send and move to crawl server
    socket.on( "getKey", async ( data ) => {
      console.log( data );
      // Get keyword from database
      const foundAccount = await Account.find( {} ).select( "keywords" ),
        findPostFacebook = await PostFacebook.find( {} ).select( "title -_id" );

      socket.emit( "postFacebook", findPostFacebook );
      Promise.all( foundAccount.map( async ( account ) => {
        return account.keywords;
      } ) ).then( async ( item ) => {
        // Create event to send keyword search user
        socket.emit( "crawl", item.toString().split( "," ) );
      } );
    } );

    // Listen data response and process
    socket.on( "dataRes", async ( data ) => {
      // handling
      const newPostFacebook = await new PostFacebook( data );

      await newPostFacebook.save();

    } );

  } );
} )();
