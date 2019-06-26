import MarketPostService from "@/services/modules/market/marketpost.service";

const state = {
  allMarketPosts: [],
  marketPost: {},
  marketPostStatus: "",
  marketControlStatus: 0,
  marketPostPhotosUpload: [],
  postMarket: {},
  variableControl: 0
};
const getters = {
  allMarketPosts: state => state.allMarketPosts,
  marketPost: state => state.marketPost,
  marketPostStatus: state => state.marketPostStatus,
  marketControlStatus: state => state.marketControlStatus,
  marketPostPhotosUpload: state => state.marketPostPhotosUpload,
  postMarket: state => state.postMarket,
  variableControl: state => state.variableControl
};
const mutations = {
  setAllMarketPosts: (state, payload) => {
    state.allMarketPosts = payload;
  },
  setMarketPost: (state, payload) => {
    state.marketPost = payload;
  },
  setMarketPostStatus: (state, payload) => {
    state.marketPostStatus = payload;
  },
  setMarketPostPhotosUpload: (state, payload) => {
    state.marketPostPhotosUpload = payload;
  },
  setPostDefault: (state, payload) => {
    state.postMarket = payload;
  },
  setStatus: (state, payload) => {
    state.marketControlStatus = payload;
  },
  setVariableControl: (state, payload) => {
    state.variableControl = payload;
  }
};
const actions = {
  /**
   * Create a market post
   */
  createMarketPost: async ({ commit }, payload) => {
    const result = await MarketPostService.create(payload);
    commit("setMarketPost", result.data.data);
    const res = await MarketPostService.index();
    await commit("setAllMarketPosts", res.data.data);
  },
  /**
   * Delete a market post
   */
  deleteMarketPost: async ({ commit }, payload) => {
    await MarketPostService.delete(payload);
    const res = await MarketPostService.index();
    await commit("setAllMarketPosts", res.data.data);
  },
  /**
   * Get all market posts
   */
  getAllMarketPosts: async ({ commit }) => {
    commit("setMarketPostStatus", "loading");
    const res = await MarketPostService.index();
    await commit("setAllMarketPosts", res.data.data);
    commit("setMarketPostStatus", "success");
  },
  /**
   * Get a market post by id
   */
  getMarketPostById: async ({ commit }, payload) => {
    const res = await MarketPostService.getMarketPostById(payload);
    await commit("setMarketPost", res.data.data);
  },
  /**
   * Update a market post
   */
  updateMarketPost: async ({ commit }, payload) => {
    await MarketPostService.update(payload._id, payload);
    const res = await MarketPostService.index();
    await commit("setAllMarketPosts", res.data.data);
  },
  /**
   * Upload photos
   */
  uploadMarketPostPhotos: async ({ commit }, payload) => {
    const res = await MarketPostService.uploadFiles(payload);
    await commit("setMarketPostPhotosUpload", res.data.data);
  },
  setPostDefaultStatus: async ({ commit }, payload) => {
    await commit("setStatus", payload);
  },
  setPostDefaultMarket: async ({ commit }) => {
    await commit("setPostDefault", {
      title: "",
      content: "",
      photos: []
    });
  },
  setVariableControl: async ({ commit }, payload) => {
    await commit("setVariableControl", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
