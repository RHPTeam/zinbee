import HelpServices from "@/services/modules/help.services";

const state = {
  allCategories: [],
  categories: [],
  helpStatus: "",
  allBlog: [],
  blog: []
};
const getters = {
  allCategories: state => state.allCategories,
  categories: state => state.categories,
  helpStatus: state => state.helpStatus,
  allBlog: state => state.allBlog,
  blog: state => state.blog,
};
const mutations = {
  help_request: state => {
    state.helpStatus = "loading";
  },
  help_success: state => {
    state.helpStatus = "success";
  },
  /**
   * Help Categories Admin
   * Create, show, update, delete
   */
  setAllCategories: (state, payload) => {
    state.allCategories = payload;
  },
  setCategories: (state, payload) => {
    state.categories = payload;
  },
  /**
   * Help Blogs Admin
   * Create, show, update, delete
   */
  setAllBlog: (state, payload) => {
    state.allBlog = payload;
  },
  setBlog: (state, payload) => {
    state.blog = payload;
  }
};
const actions = {
  /**
   * Help Categories Admin
   * Create, show, update, delete
   */
  createNewCategories: async ({ commit }, payload) => {
    commit("help_request");
    await HelpServices.createCategories(payload);
    const result = await HelpServices.getAllCategories();
    commit("setAllCategories", result.data.data);
    commit("help_success");
  },
  getAllCategories: async ({ commit }) => {
    commit("help_request");
    const result = await HelpServices.getAllCategories();
    commit("setAllCategories", result.data.data);
    commit("help_success");
  },
  getCategoriesDefault: async ({ commit }) => {
    commit("setCategories", {
      title: "",
      parent: ""
    });
  },
  getCategoriesById: async ({ commit }, payload) => {
    commit("help_request");
    const result = await HelpServices.getCategoriesById(payload);
    commit("setCategories", result.data.data);
    commit("help_success");
  },
  updateCategories: async ({ commit }, payload) => {
    await HelpServices.updateCategories(payload._id, payload);
    const result = await HelpServices.getAllCategories();
    commit("setAllCategories", result.data.data);
  },
  deleteCategories: async ({ commit }, payload) => {
    await HelpServices.deleteCategories(payload);
    const result = await HelpServices.getAllCategories();
    commit("setAllCategories", result.data.data);
  },
  /**
   * Help Blogs Admin
   * Create, show, update, delete
   */
  createNewBlog: async ({ commit }, payload) => {
    commit("help_request");
    await HelpServices.createBlog(payload);
    const result = await HelpServices.getAllBlog();
    commit("setAllBlog", result.data.data);
    commit("help_success");
  },
  getAllBlog: async ({ commit }) => {
    commit("help_request");
    const result = await HelpServices.getAllBlog();
    commit("setAllBlog", result.data.data);
    commit("help_success");
  },
  getBlogDefault: async ({ commit }) => {
    commit("setBlog", {
      title: "",
      content: ""
    });
  },
  getBlogById: async ({ commit }, payload) => {
    commit("help_request");
    const result = await HelpServices.getBlogById(payload);
    commit("setBlog", result.data.data);
    commit("help_success");
  },
  updateBlog: async ({ commit }, payload) => {
    commit("help_request");
    await HelpServices.updateBlog(payload._id, payload);
    const result = await HelpServices.getAllBlog();
    commit("setAllBlog", result.data.data);
    commit("help_success");
  },
  deleteBlog: async ({ commit }, payload) => {
    await HelpServices.deleteBlog(payload);
    const result = await HelpServices.getAllBlog();
    commit("setAllBlog", result.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
