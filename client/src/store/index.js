import Vue from "vue";
import Vuex from "vuex";

import AccountStore from "./modules/account.store";
import DashBoard from "./modules/dashboard.store";
import ServerStore from "./modules/server.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AccountStore,
    DashBoard,
    ServerStore
  }
});
