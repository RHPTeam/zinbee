import BlogHelpServices from "@/services/modules/user/help/blog.service";

const state = {
  blogHelpStatus: "",
  blogHelpError: "",
  allBlog: [],
  blog: []
};
const getters = {
  blogHelpStatus: state => state.blogHelpStatus,
  blogHelpError: state => state.blogHelpError,
  allBlog: state => state.allBlog,
  blog: state => state.blog
};
const mutations = {
  blog_help_request: state => {
    state.blogHelpStatus = "loading";
  },
  blog_help_success: state => {
    state.blogHelpStatus = "success";
  },
  blog_help_error: (state, payload) => {
    state.blogHelpError = payload;
  },
  setAllBlog: (state, payload) => {
    state.allBlog = payload;
  },
  setBlog: (state, payload) => {
    state.blog = payload;
  }
};
const actions = {
  createNewBlog: async ({ commit }, payload) => {
    commit("blog_help_request");
    await BlogHelpServices.createBlog(payload);
    const result = await BlogHelpServices.getAllBlog();
    commit("setAllBlog", result.data.data);
    commit("blog_help_success");
  },
  getAllBlog: async ({ commit }) => {
    commit("blog_help_request");
    const result = await BlogHelpServices.getAllBlog();
    commit("setAllBlog", result.data.data);
    commit("blog_help_success");
  },
  getBlogDefault: async ({ commit }) => {
    commit("setBlog", {
      title: "",
      content: ""
    });
  },
  getBlogById: async ({ commit }, payload) => {
    try {
      commit("blog_help_error", "");
      commit("blog_help_request");
      const result = await BlogHelpServices.getBlogById(payload);
      commit("setBlog", result.data.data);
      commit("blog_help_success");
    } catch (e) {
      if (e.response.status === 500) {
        commit("blog_help_error", 500);
      }
    }
  },
  updateBlog: async ({ commit }, payload) => {
    commit("blog_help_request");
    await BlogHelpServices.updateBlog(payload._id, payload);
    const result = await BlogHelpServices.getAllBlog();
    commit("setAllBlog", result.data.data);
    commit("blog_help_success");
  },
  deleteBlog: async ({ commit }, payload) => {
    await BlogHelpServices.deleteBlog(payload);
    const result = await BlogHelpServices.getAllBlog();
    commit("setAllBlog", result.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
