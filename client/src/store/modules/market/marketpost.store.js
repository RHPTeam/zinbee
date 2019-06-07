import MarketPostService from "@/services/modules/market/marketpost.service";

const state = {
  allMarketPosts: [],
  marketPost: {},
  marketPostStatus: "",
  marketPostPhotosUpload: []
};
const getters = {
  allMarketPosts: state => state.allMarketPosts,
  marketPost: state => state.marketPost,
  marketPostStatus: state => state.marketPostStatus,
  marketPostPhotosUpload: state => state.marketPostPhotosUpload
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
  }
};
const actions = {
  /**
   * Create a market post
   */
  createMarketPost: async ({ commit }, payload) => {
    await MarketPostService.create(payload);
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
  }

};

export default {
  state,
  getters,
  mutations,
  actions
};
