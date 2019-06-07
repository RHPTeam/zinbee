import CategoryMarket from "@/services/modules/market/category.services";

const state = {
  allCategory: [],
  allMarketCategoriesTree: [],
  currentParentMarketCategory: {}
};

const getters = {
  allCategory: state => state.allCategory,
  allMarketCategoriesTree: state => state.allMarketCategoriesTree,
  currentParentMarketCategory: state => state.currentParentMarketCategory
};

const mutations = {
  setAllCategory: (state, payload) => {
    state.allCategory = payload;
  },
  setAllCategoriesTree: (state, payload) => {
    state.allMarketCategoriesTree = payload;
  },
  currentParentMarketCategory: (state, payload) => {
    state.currentParentMarketCategory = payload;
  }
};

const actions = {
  // Get all category market
  getcategories: async ({ commit }) => {
    const rsGetAllCategory = await CategoryMarket.getAll();
    commit("setAllCategory", rsGetAllCategory.data.data);
  },
  /**
   * Get all market categories tree
   */
  getAllMarketCategoriesTree: async ({ commit }) => {
    const res = await CategoryMarket.getCategoriesTree();
    commit("setAllCategoriesTree", res.data.data);
    commit("currentParentMarketCategory", res.data.data[0]);
  },
  /**
   * Set current parent market category
   */
  currentParentMarketCategory: ({ commit }, payload) => {
    commit("currentParentMarketCategory", payload);
  },
  // create
  createCategory: async ({ commit }, payload) => {
    await CategoryMarket.create(payload);

    const rsGetAllCategory = await CategoryMarket.getAll();
    commit("setAllCategory", rsGetAllCategory.data.data);
  },
  // update
  updateCategory: async ({ commit }, payload) => {
    await CategoryMarket.update(payload._id, payload);

    const rsGetAllCategory = await CategoryMarket.getAll();
    commit("setAllCategory", rsGetAllCategory.data.data);
  },
  // delete
  deleteCategory: async ({ commit }, payload) => {
    await CategoryMarket.delete(payload._id);

    const rsGetAllCategory = await CategoryMarket.getAll();
    commit("setAllCategory", rsGetAllCategory.data.data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
