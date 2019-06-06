import HelpCategoryServices from "@/services/modules/user/help/category.service";

const state = {
  allHelpCategories: [],
  helpCategory: [],
  helpCategoryStatus: "",
  allHelpCategoriesChild: [],
  helpCategoryById: [],
  categoryChildren: [],
  parentCate: [],
  cateLevel: [],
  cateChildren: []
};
const getters = {
  allHelpCategories: state => state.allHelpCategories,
  helpCategory: state => state.helpCategory,
  helpCategoryStatus: state => state.helpCategoryStatus,
  allHelpCategoriesChild: state => state.allHelpCategoriesChild,
  helpCategoryById: state => state.helpCategoryById,
  categoryChildren: state => state.categoryChildren,
  parentCate: state => state.parentCate,
  cateLevel: state => state.cateLevel,
  cateChildren: state => state.cateChildren
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
    const level = [];
    const children = [];

    const parent = payload.filter(item => {
      if (item.level === 0) return item;
    });
    parent.forEach(item => {
      if (item.children) {
        item.children.map(chill => {
          if (chill.level === 1) return level.push(chill);
        });
      }
    });
    level.forEach(item => {
      if (item.children) {
        item.children.map(chill => {
          if (chill.level === 2) return children.push(chill);
        });
      }
    });

    state.parentCate = parent;
    state.cateLevel = level;
    state.cateChildren = children;

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
