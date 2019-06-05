const router = require( "express" ).Router();
const auth = require( "../helpers/middleware/authenticate.middleware" );
const permission = require( "../helpers/middleware/permission.middleware" );

// Chat Route

// General Route
router.use( "/posts", require( "./modules/post.route" ) );
router.use( "/roles", require( "./modules/role.route" ) );
router.use( "/signin", require( "./modules/signin.route" ) );
router.use( "/signup", require( "./modules/signup.route" ) );
router.use( "/users", require( "./modules/account.route" ) );
router.use( "/keywords", require( "./modules/keyword.route" ) );
router.use( "/category-default", require( "./modules/categorydefault.route" ) );

// Help Route
router.use( "/help", require( "./modules/help/help.route" ) );
router.use( "/help/posts", require( "./modules/help/blog.route" ) );
router.use( "/help/categories", require( "./modules/help/category.route" ) );

// Market Route
router.use( "/market/categories", require( "./modules/market/category.route" ) );
router.use( "/market/products", require( "./modules/market/product.route" ) );

// Server Route
router.use( "/vps", auth, permission, require( "./modules/server.route" ) );

module.exports = router;
