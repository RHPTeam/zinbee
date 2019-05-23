/**
 * Rule in store modules
 * State: use noun, not use verb
 * Getters: use name in state (if getter use filter or handle other, use bellow: filter + name in state ~ filterUser)
 * Mutations: user bellow: set + name in state ~ setUser
 * Actions: use verb, not use noun. As bellow: get + name in state ~ getUser .Sometimes, If actions don't use to get, u must have use verb not use noun.
 */
import AccountServices from "@/services/modules/account.services";

const state = {
  authError: "",
  authStatus: ""
};
const getters = {
  authError: state => state.authError,
  authStatus: state => state.authStatus
};
const mutations = {
  auth_request: state => {
    state.authStatus = "loading";
  },
  auth_success: state => {
    state.authStatus = "success";
  },
  auth_error: (state, payload) => {
    state.authError = payload;
  }
};
const actions = {
  signUp: async ({ commit }, payload) => {
    try {
      commit("auth_request");
      await AccountServices.signUp(payload);
      commit("auth_success");
    } catch (e) {
      if (e.response.status === 403) {
        commit("auth_error", e.response.data);
      }
    }
  },
  signIn: async ({ commit }, payload) => {
    try {
      commit("auth_request");
      await AccountServices.signIn(payload);
      commit("auth_success");
    } catch (e) {
      if (e.response.status === 401) {
        commit("auth_error", "401");
      }
    }
  },
  set_error: async ({ commit }, payload) => {
    commit("auth_error", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
