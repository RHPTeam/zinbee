import CategoryMarket from "@/services/modules/market/category.services";

const state = {
  allCategory: []
};

const getters = {
  allCategory: state => state.allCategory
};

const mutations = {
  setAllCategory: (state, payload) => {
    state.allCategory = payload;
  }
};

const actions = {
  // Get all category market
  getcategories: async ({ commit }) => {
    const rsGetAllCategory = await CategoryMarket.getAll();
    commit("setAllCategory", rsGetAllCategory.data.data);
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
