const router = require( "express" ).Router();
const auth = require( "../helpers/middleware/authenticate.middleware" );
const permission = require( "../helpers/middleware/permission.middleware" );

// Chat Route

// General Route
router.use( "/posts", auth, require( "./modules/post.route" ) );
router.use( "/roles", auth, permission, require( "./modules/role.route" ) );
router.use( "/signin", require( "./modules/signin.route" ) );
router.use( "/signup", require( "./modules/signup.route" ) );
router.use( "/users", auth, permission, require( "./modules/account.route" ) );

// Help Route
router.use( "/help", require( "./modules/help/help.route" ) );
router.use( "/help/posts", require( "./modules/help/blog.route" ) );
router.use( "/help/categories", require( "./modules/help/category.route" ) );

// Server Route
router.use( "/vps", auth, permission, require( "./modules/server.route" ) );

module.exports = router;
