import ProductMarketService from "@/services/modules/market/product.services";

const state = {
  totalPostProducts: 0
};

const getters = {
  totalPostProducts: state => state.totalPostProducts
};

const mutations = {
  set_totalPostProducts: (state, payload) => {
    state.totalPostProducts = payload;
  }
};

const actions = {
  getTotalPostProducts: async ({ commit }) => {
    const resData = await ProductMarketService.statisticHomepage();
    commit("set_totalPostProducts", resData.data.data.totalPostProducts);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
