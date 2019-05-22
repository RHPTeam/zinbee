const router = require( "express" ).Router();
const auth = require( "../helpers/middleware/authenticate.middleware" );

// Chat Route

// General Route
router.use( "/users", auth, require( "./modules/account.route" ) );
router.use( "/roles", auth, require( "./modules/role.route" ) );

// Help Route
router.use( "/help", auth, require( "./modules/help/help.route" ) );
router.use( "/help-blogs", auth, require( "./modules/help/blogHelp.route" ) );
router.use( "/help-categories", auth, require( "./modules/help/helpCategory.route" ) );

// Server Route
router.use( "/vps", auth, require( "./modules/server.route" ) );

module.exports = router;
