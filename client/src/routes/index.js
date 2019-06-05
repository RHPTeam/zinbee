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
import signInRouter from "./modules/user/signin";
import signUpRouter from "./modules/user/signup";
import redirectRouter from "./modules/user/redirect";
import changePasswordRouter from "./modules/user/password";
/**
 * Router for Help
 */
Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    adminGeneralRouter,
    userGeneralRouter,
    signinRouterAdmin,
    signupRouterAdmin,
    signInRouter,
    signUpRouter,
    redirectRouter,
    changePasswordRouter
  ]
});
