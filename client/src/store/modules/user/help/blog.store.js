import BlogHelpServices from "@/services/modules/user/help/blog.service";

const state = {
  blogHelpStatus: "",
  blogHelpError: "",
  allBlog: [],
  blog: [],
  blogIcon: [],
  resultSearch: [],
  resultSearchPage: 1,
  resultSearchTotal: null,
  keySearch: "",
  sizeDefault: 25
};
const getters = {
  blogHelpStatus: state => state.blogHelpStatus,
  blogHelpError: state => state.blogHelpError,
  allBlog: state => state.allBlog,
  blog: state => state.blog,
  blogIcon: state => state.blogIcon,
  resultSearch: state => state.resultSearch,
  resultSearchPage: state => state.resultSearchPage,
  resultSearchTotal: state => state.resultSearchTotal,
  keySearch: state => state.keySearch
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
  },
  setBlogIcon: (state, payload) => {
    state.blogIcon = payload;
  },
  setResultSearchBlog: (state, payload) => {
    state.resultSearch = payload;
  },
  setResultSearchBlogPage: (state, payload) => {
    state.resultSearchPage = payload;
  },
  setResultSearchBlogTotal: (state, payload) => {
    state.resultSearchTotal = payload;
  },
  setKeySearch: (state, payload) => {
    state.keySearch = payload;
  },
  setDeleteBlog: (state, payload) => {
    state.allBlog = payload;
  },
  setUpdateBlog: (state, payload) => {
    const position = state.allBlog
      .map((item, index) => {
        if (item._id === payload._id) return index;
      })
      .filter(item => item !== undefined);
    state.allBlog[position] = payload;
  }
};
const actions = {
  createNewBlog: async ({ commit }, payload) => {
    commit("blog_help_request");

    if (payload.popularBlog && payload.popularBlog.length > 0) {
      payload.popularBlog = payload.popularBlog.map(item => {
        return item._id;
      });
    }
    if (payload.popularCategory && payload.popularCategory.length > 0) {
      payload.popularCategory = payload.popularCategory.map(item => {
        return item._id;
      });
    }

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
      slug: "",
      content: "",
      label: "",
      icon: "",
      popularBlog: [],
      popularCategory: []
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
  getBlogBySlug: async ({ commit }, payload) => {
    try {
      commit("blog_help_error", "");
      commit("blog_help_request");
      const result = await BlogHelpServices.getBlogBySlug(payload);
      commit("setBlog", result.data.data);
      commit("blog_help_success");
    } catch (e) {
      if (e.response.status === 500) {
        commit("blog_help_error", 500);
      }
    }
  },
  uploadIconBlog: async ({ commit }, payload) => {
    commit("blog_help_request");
    const result = await BlogHelpServices.uploadIcon(payload);
    commit("setBlogIcon", result.data.data);
    commit("blog_help_success");
  },
  updateBlog: async ({ commit }, payload) => {
    commit("blog_help_request");

    commit("setUpdateBlog", payload);

    if (payload.popularBlog && payload.popularBlog.length > 0) {
      payload.popularBlog = payload.popularBlog.map(item => {
        return item._id;
      });
    }
    if (payload.popularCategory && payload.popularCategory.length > 0) {
      payload.popularCategory = payload.popularCategory.map(item => {
        return item._id;
      });
    }
    await BlogHelpServices.updateBlog(payload._id, payload);
    commit("blog_help_success");
  },
  deleteBlog: async ({ commit, state }, payload) => {
    const listBlog = state.allBlog.filter(item => item._id !== payload);
    commit("setDeleteBlog", listBlog);
    await BlogHelpServices.deleteBlog(payload);
  },
  searchBlog: async ({ commit }, payload) => {
    commit("blog_help_request");
    const result = await BlogHelpServices.searchBlog(
      payload.keyword,
      payload.size,
      payload.page
    );
    commit("setResultSearchBlog", result.data.data.results);
    commit("setResultSearchBlogPage", result.data.data.page);
    commit("setResultSearchBlogTotal", result.data.data.total);
    commit("blog_help_success");
  },
  setKeySearch: async ({ commit }, payload) => {
    commit("setKeySearch", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
