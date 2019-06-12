// import ListProductStore from "@/services/modules/market/list.services";

const state = {
  showMarketListSidebar: true
};

const getters = {
  showMarketListSidebar: state => state.showMarketListSidebar
};

const mutations = {
  setFilterSidebarList: (state, payload) => {
    state.showMarketListSidebar = payload;
  }
};

const actions = {
  changeMarketListSidebar: async ({ commit }) => {
    const check = state.showMarketListSidebar;
    if (check === true) {
      commit("setFilterSidebarList", false);
    } else {
      commit("setFilterSidebarList", true);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
