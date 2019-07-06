import HelpCategoryServices from "@/services/modules/user/help/category.service";

const state = {
  allHelpCategories: [],
  helpCategory: {},
  helpCategoryStatus: "",
  allHelpCategoriesChild: [],
  helpCategoryById: [],
  categoryChildren: [],
  parentCate: [],
  cateLevel: [],
  cateChildren: [],
  children: [],
  variableControlBlog: 0
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
  cateChildren: state => state.cateChildren,
  children: state => state.children,
  variableControlBlog: state => state.variableControlBlog
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
  },
  setCateParent: (state, payload) => {
    const childs = payload.cate
      .map(item => {
        if (payload.parentId === item.parent) return item;
      })
      .filter(item => item !== undefined);

    state.children = childs;
  },
  setControlBlog: (state, payload) => {
    state.variableControlBlog = payload;
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
  },
  getHelpCategoryParent: async ({ commit }, payload) => {
    const result = await HelpCategoryServices.getAllCategories();
    // const results = result.data.data.filter(item =>
    //   item.parent === payload.parentId
    // );
    commit("setCateParent", {
      cate: result.data.data,
      parentId: payload.parentId
    });
  },
  setVaribleControlBlog: async ({ commit }, payload) => {
    await commit("setControlBlog", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
