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
router.use( "/campaign-default", require( "./modules/campaignDefault.route" ) );
router.use( "/backup-account", require( "./modules/backupAccount.route" ) );
router.use( "/log", require( "./modules/log.route" ) );

// Help Route
router.use( "/help", require( "./modules/help/help.route" ) );
router.use( "/help/posts", require( "./modules/help/blog.route" ) );
router.use( "/help/categories", require( "./modules/help/category.route" ) );

// Market Route
router.use( "/market/categories", require( "./modules/market/category.route" ) );
router.use( "/market/products", require( "./modules/market/product.route" ) );
router.use( "/market/p/posts", require( "./modules/market/products/post.route" ) );

// Server Route
router.use( "/vps", require( "./modules/server.route" ) );
router.use( "/server/post", require( "./modules/postserver.route" ) );

// Backup Route
router.use( "/backup", auth, permission, require( "./modules/backup/marketCategoryDefault.route" ) );

// Agency Route
router.use( "/package", auth, permission, require( "./modules/agency/package.route" ) );
router.use( "/agency", require( "./modules/agency/agency.route" ) );

// Code Route
router.use( "/code", auth, permission, require( "./modules/code.route" ) );

module.exports = router;
