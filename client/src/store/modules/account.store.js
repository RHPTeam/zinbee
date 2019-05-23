/**
 * Rule in store modules
 * State: use noun, not use verb
 * Getters: use name in state (if getter use filter or handle other, use bellow: filter + name in state ~ filterUser)
 * Mutations: user bellow: set + name in state ~ setUser
 * Actions: use verb, not use noun. As bellow: get + name in state ~ getUser .Sometimes, If actions don't use to get, u must have use verb not use noun.
 */
import AccountServices from "@/services/modules/account.services";

const state = {
  authStatus: ""
};
const getters = {
  authStatus: state => state.authStatus
};
const mutations = {
  auth_request: state => {
    state.authStatus = "loading";
  },
  auth_success: state => {
    state.authStatus = "success";
  }
};
const actions = {
  signUp: async ({ commit }, payload) => {
    try {
      commit("auth_request");
      await AccountServices.signUp(payload);
      commit("auth_success");
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
  signIn: async ({ commit }, payload) => {
    try {
      commit("auth_request");
      await AccountServices.signIn(payload);
      commit("auth_success");
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
