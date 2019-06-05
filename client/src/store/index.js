import Vue from "vue";
import Vuex from "vuex";

import AccountStore from "./modules/account.store";
import CategoryDefault from "./modules/categorydefault.store";
import DashBoard from "./modules/dashboard.store";
import ServerStore from "./modules/server.store";
import PostLibraries from "./modules/post.store";
import HelpBlogStore from "./modules/user/help/blog.store";
import HelpCaterogiesStore from "./modules/user/help/category.store";
import HelpStore from "./modules/help.store";
import CategoryMarket from "./modules/market/category.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AccountStore,
    CategoryDefault,
    DashBoard,
    ServerStore,
    PostLibraries,
    HelpBlogStore,
    HelpCaterogiesStore,
    HelpStore,
    CategoryMarket
  }
});
