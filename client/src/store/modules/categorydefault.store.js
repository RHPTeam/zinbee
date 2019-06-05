import CategoryDefaultServices from "@/services/modules/categorydefault.services";

const state = {
  cateStatus: "",
  allCategoryDefault: [],
  infoCateDefault: [],
  listPost: []
};
const getters = {
  cateStatus: state => state.cateStatus,
  allCategoryDefault: state => state.allCategoryDefault,
  infoCateDefault: state => state.infoCateDefault,
  listPost: state => state.listPost
};
const mutations = {
  cate_request: state => {
    state.cateStatus = "loading";
  },
  cate_success: state => {
    state.cateStatus = "success";
  },
  setAllCategoryDefault: (state, payload) => {
    state.allCategoryDefault = payload;
  },
  setCategoryDefault: (state, payload) => {
    state.infoCateDefault = payload;
  },
  setContent: (state, payload) => {
    state.listPost.push(payload);
  }
};
const actions = {
  createNewCategoryDefault: async ({ commit }, payload) => {
    commit("cate_request");
    await CategoryDefaultServices.createCategoryDefault(payload);
    const result = await CategoryDefaultServices.getAllCategoryDefault();
    commit("setAllCategoryDefault", result.data.data);
    commit("cate_success");
  },
  getAllCategoryDefault: async ({ commit }) => {
    commit("cate_request");
    const result = await CategoryDefaultServices.getAllCategoryDefault();
    commit("setAllCategoryDefault", result.data.data);
    commit("cate_success");
  },
  getInfoCategoryDefault: async ({ commit }, payload) => {
    commit("cate_request");
    const result = await CategoryDefaultServices.getCategoryDefaultById(
      payload
    );
    commit("setCategoryDefault", result.data.data);
    commit("cate_success");
  },
  setContentToCateDefault: async ({ commit }, payload) => {
    commit("setContent", payload);
  },
  updateTitleCategoryDefault: async ({ commit }, payload) => {
    commit("cate_request");
    await CategoryDefaultServices.updateCategoryDefault(payload._id, payload);
    const result = await CategoryDefaultServices.getCategoryDefaultById(
      payload._id
    );
    commit("setCategoryDefault", result.data.data);
    const resultUpdate = await CategoryDefaultServices.getAllCategoryDefault();
    commit("setAllCategoryDefault", resultUpdate.data.data);
    commit("cate_success");
  },
  updatePostToCategory: async ({ commit }, payload) => {
    commit("cate_request");
    await CategoryDefaultServices.pushCategoryDefault(
      payload.cateId,
      payload.postId
    );
    const result = await CategoryDefaultServices.getCategoryDefaultById(
      payload.cateId
    );
    commit("setCategoryDefault", result.data.data);
    commit("cate_success");
  },
  deleteCategoryDefault: async ({ commit }, payload) => {
    commit("cate_request");
    await CategoryDefaultServices.delete(payload);
    const result = await CategoryDefaultServices.getAllCategoryDefault();
    commit("setAllCategoryDefault", result.data.data);
    commit("cate_success");
  },
  deletePostFromCategory: async ({ commit }, payload) => {
    commit("cate_request");
    await CategoryDefaultServices.deletePostCategory(
      payload.cateId,
      payload.postId
    );
    const result = await CategoryDefaultServices.getCategoryDefaultById(
      payload.cateId
    );
    commit("setCategoryDefault", result.data.data);
    commit("cate_success");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
