import Vue from "vue";
import Vuex from "vuex";


import AccountStore from "./modules/account.store";
import CategoryDefault from "./modules/categorydefault.store";
import DashBoard from "./modules/dashboard.store";
import ServerStore from "./modules/server.store";
import PostLibraries from "./modules/post.store";
import HelpStore from "./modules/help.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AccountStore,
    CategoryDefault,
    DashBoard,
    ServerStore,
    PostLibraries,
    HelpStore
  }
});
