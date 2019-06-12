import CategoryMarket from "@/services/modules/market/category.services";

const state = {
  allCategory: [],
  allMarketCategoriesTree: [],
  currentParentMarketCategory: {},
  currentChildrenMarketCategory: {},
  categoriesChild: []
};

const getters = {
  allCategory: state => state.allCategory,
  allMarketCategoriesTree: state => state.allMarketCategoriesTree,
  currentParentMarketCategory: state => state.currentParentMarketCategory,
  currentChildrenMarketCategory: state => state.currentChildrenMarketCategory,
  categoriesChild: state => {
    state.allCategory.map(item => {
      if (item.level > 0) {
        state.categoriesChild.push(item);
      }
    });
  }
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
  },
  currentChildrenMarketCategory: (state, payload) => {
    state.currentChildrenMarketCategory = payload;
  },
  setProductsChild: (state, payload) => {
    state.categoriesChild = payload;
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
   * Set current selected parent market category
   */
  currentParentMarketCategory: ({ commit }, payload) => {
    commit("currentParentMarketCategory", payload);
  },
  /**
   * Set current selected children market category
   */
  currentChildrenMarketCategory: ({ commit }, payload) => {
    commit("currentChildrenMarketCategory", payload);
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
  },

  // get products level 1
  getCategoryChild: async ({ commit }) => {
    commit("setProductsChild");
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
