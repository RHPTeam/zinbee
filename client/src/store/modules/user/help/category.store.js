import HelpCategoryServices from "@/services/modules/user/help/category.service";

const state = {
  allHelpCategories: [],
  helpCategory: [],
  helpCategoryStatus: "",
  allHelpCategoriesChild: [],
  helpCategoryById: [],
  categoryChildren: []
};
const getters = {
  allHelpCategories: state => state.allHelpCategories,
  helpCategory: state => state.helpCategory,
  helpCategoryStatus: state => state.helpCategoryStatus,
  allHelpCategoriesChild: state => state.allHelpCategoriesChild,
  helpCategoryById: state => state.helpCategoryById,
  categoryChildren: state => state.categoryChildren
};
const mutations = {
  help_category_request: state => {
    state.helpCategoryStatus = "loading";
  },
  help_category_success: state => {
    state.helpCategoryStatus = "success";
  },
  setAllHelpCategories: (state, payload) => {
    state.allHelpCategories = payload;
  },
  setHelpCategory: (state, payload) => {
    state.helpCategory = payload;
  },
  setHelpCategoryById: (state, payload) => {
    state.helpCategoryById = payload;
  },
  setAllHelpCategoriesChild: (state, payload) => {
    state.allHelpCategoriesChild = payload;
  },
  setCategoryChildren: (state, payload) => {
    state.categoryChildren = payload;
  }
};
const actions = {
  createHelpCategory: async ({ commit }, payload) => {
    commit("help_category_request");
    await HelpCategoryServices.createCategory(payload);
    const result = await HelpCategoryServices.getAllCategories();
    commit("setAllHelpCategories", result.data.data);
    commit("help_category_success");

    const rsGetAllCategoriesChild = await HelpCategoryServices.getAllCategoriesChild();
    commit("setAllHelpCategoriesChild", rsGetAllCategoriesChild.data.data);
  },
  getAllHelpCategories: async ({ commit }) => {
    commit("help_category_request");
    const result = await HelpCategoryServices.getAllCategories();
    commit("setAllHelpCategories", result.data.data);
    commit("help_category_success");
  },
  getHelpCategoryDefault: async ({ commit }) => {
    commit("setHelpCategory", {
      title: "",
      parent: "",
      _blogHelp: []
    });
  },
  getHelpCategoryById: async ({ commit }, payload) => {
    commit("help_category_request");
    const result = await HelpCategoryServices.getCategoryById(payload);
    commit("setHelpCategory", result.data.data);
    commit("help_category_success");
  },
  updateHelpCategory: async ({ commit }, payload) => {
    await HelpCategoryServices.updateCategory(payload._id, payload);
    const result = await HelpCategoryServices.getAllCategories();
    commit("setAllHelpCategories", result.data.data);

    const rsGetAllCategoriesChild = await HelpCategoryServices.getAllCategoriesChild();
    commit("setAllHelpCategoriesChild", rsGetAllCategoriesChild.data.data);
  },
  deleteHelpCategory: async ({ commit }, payload) => {
    await HelpCategoryServices.deleteCategory(payload);
    const result = await HelpCategoryServices.getAllCategories();
    commit("setAllHelpCategories", result.data.data);

    const rsGetAllCategoriesChild = await HelpCategoryServices.getAllCategoriesChild();
    commit("setAllHelpCategoriesChild", rsGetAllCategoriesChild.data.data);
  },
  getAllCategoriesChildren: async ({ commit }) => {
    const rsGetAllCategoriesChild = await HelpCategoryServices.getAllCategoriesChild();
    commit("setAllHelpCategoriesChild", rsGetAllCategoriesChild.data.data);
  },
  setHelpCategoryChildrenLevel: async ({ commit }, payload) => {
    commit("setCategoryChildren", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
