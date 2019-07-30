import HelpCategoryServices from "@/services/modules/user/help/category.service";

const state = {
  allHelpCategories: [],
  allHelpCategoriesChild: [],
  categoryChildren: [],
  cateLevel: [],
  cateChildren: [],
  children: [],
  helpCategory: {},
  helpCategoryStatus: "",
  helpCategoryById: [],
  helpCategoryIconUpload: "",
  parentCate: [],
  variableControlBlog: 0,
  variableControlCate: 0
};
const getters = {
  allHelpCategories: state => state.allHelpCategories,
  allHelpCategoriesChild: state => state.allHelpCategoriesChild,
  categoryChildren: state => state.categoryChildren,
  cateLevel: state => state.cateLevel,
  cateChildren: state => state.cateChildren,
  children: state => state.children,
  helpCategory: state => state.helpCategory,
  helpCategoryStatus: state => state.helpCategoryStatus,
  helpCategoryById: state => state.helpCategoryById,
  helpCategoryIconUpload: state => state.helpCategoryIconUpload,
  parentCate: state => state.parentCate,
  variableControlBlog: state => state.variableControlBlog,
  variableControlCate: state => state.variableControlCate
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
  setHelpCategoryIconUpload: (state, payload) => {
    state.helpCategoryIconUpload = payload;
  },
  setAllHelpCategoriesChild: (state, payload) => {
    if (payload === undefined) {
      return;
    }

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
  },
  setVariableControlCate: (state, payload) => {
    state.variableControlCate = payload;
  },
  setDeleteCategory: (state, payload) => {
    state.allHelpCategories = payload;
  },
  setUpdateCategory: (state, payload) => {
    const position = state.allHelpCategories
      .map((item, index) => {
        if (item._id === payload._id) return index;
      })
      .filter(item => item !== undefined);
    state.allHelpCategories[position] = payload;
  }
};
const actions = {
  createHelpCategory: async ({ commit }, payload) => {
    commit("help_category_request");

    if (payload._blogHelp && payload._blogHelp.length > 0) {
      payload._blogHelp = payload._blogHelp.map(blog => {
        return blog._id;
      });
    }
    if (payload.parent && payload.parent.length > 0) {
      payload.parent = payload.parent._id;
    }

    await HelpCategoryServices.createCategory(payload);
    const result = await HelpCategoryServices.getAllCategories();
    commit("setAllHelpCategories", result.data.data);
    commit("help_category_success");

    const rsGetAllCategoriesChild = await HelpCategoryServices.getAllCategoriesChild();
    commit("setAllHelpCategoriesChild", rsGetAllCategoriesChild.data.data);
  },
  deleteHelpCategory: async ({ commit, state }, payload) => {
    const categories = state.allHelpCategories.filter(
      item => item._id !== payload._id
    );
    commit("setDeleteCategory", categories);
    await HelpCategoryServices.deleteCategory(payload);

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
      label: "",
      icon: "",
      description: "",
      content: "",
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
  getHelpCategoryBySlug: async ({ commit }, payload) => {
    commit("help_category_request");
    const result = await HelpCategoryServices.getCategoryBySlug(payload);
    commit("setHelpCategory", result.data.data);
    commit("help_category_success");
  },
  getAllCategoriesChildren: async ({ commit }) => {
    const rsGetAllCategoriesChild = await HelpCategoryServices.getAllCategoriesChild();
    commit("setAllHelpCategoriesChild", rsGetAllCategoriesChild.data.data);
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
  setHelpCategoryChildrenLevel: async ({ commit }, payload) => {
    commit("setCategoryChildren", payload);
  },
  setVaribleControlBlog: async ({ commit }, payload) => {
    await commit("setControlBlog", payload);
  },
  setVariableControlCate: async ({ commit }, payload) => {
    await commit("setVariableControlCate", payload);
  },
  updateHelpCategory: async ({ commit }, payload) => {
    commit("help_category_request");

    commit("setUpdateCategory", payload);

    if (payload._blogHelp && payload._blogHelp.length > 0) {
      payload._blogHelp = payload._blogHelp.map(blog => {
        return blog._id;
      });
    }
    if (payload.parent && payload.parent.length > 0) {
      payload.parent = payload.parent._id;
    }

    await HelpCategoryServices.updateCategory(payload._id, payload);

    const rsGetAllCategoriesChild = await HelpCategoryServices.getAllCategoriesChild();
    commit("setAllHelpCategoriesChild", rsGetAllCategoriesChild.data.data);
    commit("help_category_success");
  },
  uploadHelpCategoryIcon: async ({ commit }, payload) => {
    const res = await HelpCategoryServices.uploadFile(payload);
    commit("setHelpCategoryIconUpload", res.data.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};
