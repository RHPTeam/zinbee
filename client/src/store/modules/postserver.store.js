import PostServerServices from "@/services/modules/postserver.services";

const state = {
  postSvStatus: "",
  postServers: [],
  postServer: {},
  variableAction: 0
};
const getters = {
  postSvStatus: state => state.postSvStatus,
  postServers: state => state.postServers,
  postServer: state => state.postServer,
  variableAction: state => state.variableAction
};
const mutations = {
  postsv_request: state => {
    state.postSvStatus = "loading";
  },
  postsv_success: state => {
    state.postSvStatus = "success";
  },
  setPostServer: (state, payload) => {
    state.postServers = payload;
  },
  setPostServerDefault: (state, payload) => {
    state.postServer = payload;
  },
  setPostSrv: (state, payload) => {
    state.postServer = payload;
  },
  setDeletePostServer: (state, payload) => {
    state.postServers = payload;
  },
  setVariableControl: (state, payload) => {
    state.variableAction = payload;
  }
};
const actions = {
  /**
   * @Description: create new post server
   */
  createNewPostServer: async ({ commit }, payload) => {
    commit("postsv_request");
    await PostServerServices.create(payload);
    const result = await PostServerServices.index();
    commit("setPostServer", result.data.data);
    commit("postsv_success");
  },
  getPostServer: async ({ commit }) => {
    commit("postsv_request");
    const result = await PostServerServices.index();
    commit("setPostServer", result.data.data);
    commit("postsv_success");
  },
  getInfoPostServer: async ({ commit }, payload) => {
    commit("postsv_request");
    const result = await PostServerServices.show(payload);
    commit("setPostSrv", result.data.data);
    commit("postsv_success");
  },
  deletePostServer: async ({ commit, state }, payload) => {
    commit("postsv_request");
    const newPostSrv = state.postServers.filter(item => {
      if (item._id !== payload) return item;
    });
    commit("setDeletePostServer", newPostSrv);
    await PostServerServices.delete(payload);
    commit("postsv_success");
  },
  updatePostServer: async ({ commit }, payload) => {
    commit("postsv_request");

    await PostServerServices.update(payload._id, payload);

    const result = await PostServerServices.index();
    commit("setPostServer", result.data.data);

    commit("postsv_success");
  },
  setVariableControlButton: async ({ commit }, payload) => {
    commit("setVariableControl", payload);
  },
  setPostServerDefault: async ({ commit }) => {
    commit("setPostServerDefault", {
      name: "",
      server: "",
      status: true,
      uid: ""
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
