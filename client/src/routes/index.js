import Vue from "vue";
import Router from "vue-router";

import adminGeneralRouter from "./modules/admin";
import signinRouterAdmin from "./modules/admin/signin";
import signupRouterAdmin from "./modules/admin/signup";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [adminGeneralRouter, signinRouterAdmin, signupRouterAdmin]
});
