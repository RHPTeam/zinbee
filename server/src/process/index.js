// Require module process
require( "./scrape" );

const Role = require( "../models/Role.model" );
const Help = require( "../models/help/Help.model" );

( async () => {
  const foundHelp = await Help.find( {} ),
    foundRole = await Role.find( {} ),
    collaboratorsInfo = await Role.findOne( { "level": "Collaborator" } );

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

  // Check Collaborators exists right way?
  if ( !collaboratorsInfo ) {
    const newRole = new Role( { "level": "Collaborator" } );

    await newRole.save();
  }

  // Check Help First Time Server running
  if ( foundHelp.length === undefined || foundHelp.length === 0 ) {
    const defaultHelp = await new Help( {} );

    await defaultHelp.save();
  }
} )();
