import Vue from "vue";
import Vuex from "vuex";

import AccountStore from "./modules/account.store";
import CategoryDefault from "./modules/categorydefault.store";
import CampaignsDefault from "./modules/campaign.store";
import DashBoard from "./modules/dashboard.store";
import ServerStore from "./modules/server.store";
import PostLibraries from "./modules/post.store";
import HelpBlogStore from "./modules/user/help/blog.store";
import HelpCategoriesStore from "./modules/user/help/category.store";
import HelpStore from "./modules/help.store";

// Market
import CategoryMarket from "./modules/market/category.store";
import MarketPostStore from "./modules/market/marketpost.store";
import ProductMarket from "./modules/market/product.store";
import ListProduct from "./modules/market/list.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AccountStore,
    CategoryDefault,
    CampaignsDefault,
    DashBoard,
    ServerStore,
    PostLibraries,
    HelpBlogStore,
    HelpCategoriesStore,
    HelpStore,
    // Market
    CategoryMarket,
    MarketPostStore,
    ProductMarket,
    ListProduct
  }
});
