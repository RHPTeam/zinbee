import Vue from "vue";
import Router from "vue-router";

/**
 * Router for Sytem Admin
 */
import adminGeneralRouter from "./modules/admin";
import signinRouterAdmin from "./modules/admin/signin";
import signupRouterAdmin from "./modules/admin/signup";

/**
 * Router for Sytem Member
 */
import userGeneralRouter from "./modules/user";
import signInRouter from "./modules/user/_general/signin";
import signUpRouter from "./modules/user/_general/signup";
import redirectRouter from "./modules/user/_general/redirect";
import changePasswordRouter from "./modules/user/_general/password";
import landingPageRouter from "./modules/user/_general/landingpage";

/**
 * Router for Help
 */
import helpGeneralRouter from "./modules/user/help";

/**
 * Router for Market
 */
import marketRouter from "./modules/user/market";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    /**
     * Router for Sytem Admin
     */
    adminGeneralRouter,
    signinRouterAdmin,
    signupRouterAdmin,
    /**
     * Router for Sytem Member
     */
    userGeneralRouter,
    signInRouter,
    signUpRouter,
    redirectRouter,
    changePasswordRouter,
    landingPageRouter,
    /**
     * Router for Help
     */
    helpGeneralRouter,
    /**
     * Router for Market
     */
    marketRouter
  ]
});
