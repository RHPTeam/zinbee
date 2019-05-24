const bodyParser = require( "body-parser" );
const cors = require( "cors" );
const http = require( "http" );
const https = require( "https" );
const express = require( "express" ),
  app = express(),
  logger = require( "morgan" );
const api = require( "./src/routes" );
const mongoose = require( "mongoose" );
const passport = require( "passport" );

let server = null;

if ( process.env.APP_ENV === "production" ) {
  const options = {
    "pfx": fs.readFileSync( process.env.HTTPS_URL ),
    "passphrase": process.env.HTTPS_PASSWORD
  };

  server = https.createServer( options, app );
} else {
  server = http.createServer( app );
}

// Combine module process to handle multi process
require( "./src/helpers/services/passport.service" );
require( "./src/process" );

// connect to mongoose NoSQL DB
mongoose.connect( `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, {
  "useCreateIndex": true,
  "useNewUrlParser": true
} );
mongoose.set( "useFindAndModify", false );

app.set( "port", process.env.PORT_BASE );

app.use( cors( {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "allowedHeaders": [ "Content-Type", "Authorization" ],
  "exposedHeaders": [ "Cookie" ] } ) );
app.use( bodyParser.json( { "limit": "500MB", "extended": true } ) );
app.use( bodyParser.urlencoded( { "limit": "500MB", "extended": true } ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( logger( "dev" ) );
app.use( "/uploads", express.static( "uploads" ) );
app.use( "/api/v1", api );
app.use( "/", ( req, res ) => res.send( "API running!" ) );

// listen a port
server.listen( process.env.PORT_BASE, () => {
  console.log( `Api server running on ${process.env.APP_URL}:${process.env.PORT_BASE}` );
} );

module.exports = app;
