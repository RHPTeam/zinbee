import HelpServices from "@/services/modules/help.services";

const state = {
  popularHelp: [],
  contentDefault: [],
  categoryDefault: [],
  helpStatus: "",
  helpDefault: {
    left: 0,
    right: 0
  }
};
const getters = {
  helpStatus: state => state.helpStatus,
  popularHelp: state => state.popularHelp,
  contentDefault: state => state.contentDefault,
  categoryDefault: state => state.categoryDefault,
  helpDefault: state => state.helpDefault
};
const mutations = {
  help_request: state => {
    state.helpStatus = "loading";
  },
  help_success: state => {
    state.helpStatus = "success";
  },
  setPopularHelp: (state, payload) => {
    state.popularHelp = payload;
  },
  setContentDefault: (state, payload) => {
    state.contentDefault = payload;
  },
  setCategoryDefault: (state, payload) => {
    state.categoryDefault = payload;
  },
  setHelpDefault: (state, payload) => {
    state.helpDefault = payload;
  }
};
const actions = {
  getPopularHelp: async ({ commit }) => {
    commit("help_request");
    const result = await HelpServices.old();
    commit("setPopularHelp", result.data.data);
    commit("help_success");
  },
  updatePopularHelp: async ({ commit }, payload) => {
    commit("help_request");
    if (payload.listContent && payload.listCategory) {
      const objSender = {
        popular_blog: payload.listContent,
        popular_section: payload.listCategory
      };
      await HelpServices.update(objSender);
    } else if (payload.listContent === undefined) {
      const objSender = {
        popular_section: payload.listCategory
      };
      await HelpServices.update(objSender);
    } else if (payload.listCategory === undefined) {
      const objSender = {
        popular_blog: payload.listContent
      };
      await HelpServices.update(objSender);
    }

    const result = await HelpServices.old();
    commit("setPopularHelp", result.data.data);
    commit("help_success");
  },
  setIdContentBlog: async ({ commit }, payload) => {
    commit("setContentDefault", payload);
  },
  setIdCategoryPopular: async ({ commit }, payload) => {
    commit("setCategoryDefault", payload);
  },
  setHelpDefault: async ({ commit }, payload) => {
    commit("setHelpDefault", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
