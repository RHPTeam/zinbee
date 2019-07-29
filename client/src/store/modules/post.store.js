import PostLibrariesServices from "@/services/modules/post.services";

const state = {
  allPostLibraries: [],
  newPostLibraries: [],
  postLibraries: {
    content: "",
    like: null,
    share: null,
    postID: ""
  },
  postSearch: [],
  statusLib: ""
};
const getters = {
  allPostLibraries: state => state.allPostLibraries,
  newPostLibraries: state => state.newPostLibraries,
  postLibraries: state => state.postLibraries,
  postSearch: state => state.postSearch,
  statusLib: state => state.statusLib
};
const mutations = {
  lib_request: state => {
    state.statusLib = "loading";
  },
  lib_success: state => {
    state.statusLib = "success";
  },
  setAllPostLibraries: (state, payload) => {
    state.allPostLibraries = payload;
  },
  setNewPostLibraries: (state, payload) => {
    state.newPostLibraries = payload;
  },
  setPostLibraries: (state, payload) => {
    state.postLibraries = payload;
  },
  setPostSearchFromLibraries: (state, payload) => {
    state.postSearch = payload;
  }
};
const actions = {
  createNewPostLibraries: async ({ commit }, payload) => {
    commit("lib_request");

    const result = await PostLibrariesServices.create(payload);
    commit("setNewPostLibraries", result.data.data);

    const resultUpdate = await PostLibrariesServices.index();
    commit("setAllPostLibraries", resultUpdate.data.data);

    commit("lib_success");
  },
  getAllPostLibraries: async ({ commit }) => {
    commit("lib_request");

    const result = await PostLibrariesServices.index();
    commit("setAllPostLibraries", result.data.data);

    commit("lib_success");
  },
  getPostLibrariesById: async ({ commit }, payload) => {
    commit("lib_request");

    const result = await PostLibrariesServices.getById(payload);
    commit("setPostLibraries", result.data.data);

    commit("lib_success");
  },
  updatePostLibraries: async ({ commit }, payload) => {
    commit("lib_request");
    await PostLibrariesServices.updatePost(payload.postId, payload.content);
    const result = await PostLibrariesServices.getById(payload.postId);
    commit("setPostLibraries", result.data.data);

    const resultUpdate = await PostLibrariesServices.index();
    commit("setAllPostLibraries", resultUpdate.data.data);

    commit("lib_success");

    commit("setPostLibraries", { content: "" });
  },
  updateAttachmentPostLibraries: async ({ commit, state }, payload) => {
    await PostLibrariesServices.updatePost(payload.id, {
      content: state.postLibraries.content
    });

    await PostLibrariesServices.updateAttachmentPost(
      payload.id,
      payload.formData
    );
    const result = await PostLibrariesServices.getById(payload.id);
    commit("setPostLibraries", result.data.data);

    const resultUpdate = await PostLibrariesServices.index();
    commit("setAllPostLibraries", resultUpdate.data.data);
  },
  deletePostLibrariesFacebook: async ({ commit }, payload) => {
    await PostLibrariesServices.deletePostFacebook(payload);
    const result = await PostLibrariesServices.index();
    commit("setAllPostLibraries", result.data.data);
  },
  deleteItemAttachmentLibraries: async ({ commit }, payload) => {
    await PostLibrariesServices.deleteItemAttachment(
      payload.postId,
      payload.attachmentId
    );
    const result = await PostLibrariesServices.getById(payload.postId);
    commit("setPostLibraries", result.data.data);

    const results = await PostLibrariesServices.index();
    commit("setAllPostLibraries", results.data.data);
  },
  searchPostFromLibrariesByKey: async ({ commit }, payload) => {
    commit("lib_request");
    const result = await PostLibrariesServices.searchPostFromLibararies(
      payload.key,
      payload.size
    );
    commit("setAllPostLibraries", result.data.data.results);
    commit("lib_success");
  },
  searchPostFromLibrariesByPage: async ({ commit }, payload) => {
    commit("lib_request");
    const result = await PostLibrariesServices.searchPostLibrariesByPage(
      payload.key,
      payload.size,
      payload.page
    );
    commit("setPostSearchFromLibraries", result.data.data);
    commit("lib_success");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
