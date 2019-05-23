import Vue from "vue";
import Router from "vue-router";

import adminGeneralRouter from "./modules/admin";
import signinRouterAdmin from "./modules/admin/signin";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [adminGeneralRouter, signinRouterAdmin]
});
