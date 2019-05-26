/**
 * Rule in store modules
 * State: use noun, not use verb
 * Getters: use name in state (if getter use filter or handle other, use bellow: filter + name in state ~ filterUser)
 * Mutations: user bellow: set + name in state ~ setUser
 * Actions: use verb, not use noun. As bellow: get + name in state ~ getUser .Sometimes, If actions don't use to get, u must have use verb not use noun.
 */
import AccountServices from "@/services/modules/account.services";

import CookieFunction from "@/utils/functions/string";
import LocalStorageFunction from "@/utils/functions/cookie";
import axios from "axios";

const state = {
  allUser: [],
  userInfo: [],
  authError: "",
  authStatus: "",
  roles: []
};
const getters = {
  allUser: state => state.allUser,
  authError: state => state.authError,
  authStatus: state => state.authStatus,
  userInfo: state => state.userInfo,
  roles: state => state.roles,
  token: state => state.token
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
  },
  setAllUser: (state, payload) => {
    state.allUser = payload;
  },
  setUserById: (state, payload) => {
    state.userInfo = payload;
  },
  setRoles: (state, payload) => {
    state.roles = payload;
  }
};
const actions = {
  signUp: async ({ commit }, payload) => {
    try {
      commit("auth_request");
      const resData = await AccountServices.signUp(payload);

      const newSid = CookieFunction.findSubString(
        resData.headers.cookie,
        "sid=",
        ";"
      );

      const newUid = CookieFunction.findSubString(
        resData.headers.cookie,
        "uid=",
        ";"
      );

      const newCfr = CookieFunction.findSubString(
        resData.headers.cookie,
        "cfr=",
        ""
      );

      LocalStorageFunction.setCookie("sid", newSid, 1);
      LocalStorageFunction.setCookie("uid", newUid);
      LocalStorageFunction.setCookie("cfr", newCfr);

      // remove localStorage
      // localStorage.removeItem("rid");

      axios.defaults.headers.common.Authorization = newSid;
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
      const resData = await AccountServices.signIn(payload);

      const newSid = CookieFunction.findSubString(
        resData.headers.cookie,
        "sid=",
        ";"
      );

      const newUid = CookieFunction.findSubString(
        resData.headers.cookie,
        "uid=",
        ";"
      );

      const newCfr = CookieFunction.findSubString(
        resData.headers.cookie,
        "cfr=",
        ""
      );

      LocalStorageFunction.setCookie("sid", newSid, 1);
      LocalStorageFunction.setCookie("uid", newUid);
      LocalStorageFunction.setCookie("cfr", newCfr);

      // remove localStorage
      // localStorage.removeItem("rid");

      axios.defaults.headers.common.Authorization = newSid;

      commit("auth_success");
    } catch (e) {
      if (e.response.status === 401) {
        commit("auth_error", "401");
      }
    }
  },
  logOut: async ({ commit }) => {
    commit("auth_request");
    // remove cookie
    LocalStorageFunction.removeCookie("sid");
    LocalStorageFunction.removeCookie("uid");
    LocalStorageFunction.removeCookie("cfr");
    // remove localstorage
    // localStorage.removeItem( "rid" );
    // delete token on headers
    delete axios.defaults.headers.common.Authorization;
    commit("auth_success");
  },
  set_error: async ({ commit }, payload) => {
    commit("auth_error", payload);
  },
  getAllUserAdmin: async ({ commit }) => {
    commit("auth_request");
    const result = await AccountServices.getAllUser();
    commit("setAllUser", result.data.data);
    commit("auth_success");
  },
  getUserAdminById: async ({ commit }, payload) => {
    commit("auth_request");
    const result = await AccountServices.getUserById(payload);
    commit("setUserById", result.data.data);
    commit("auth_success");
  },
  getUserInfo: async ({ commit }) => {
    commit("auth_request");
    const dataSender = LocalStorageFunction.getCookie("uid");
    const userInfoRes = await AccountServices.getUserById(dataSender);
    commit("setUserById", userInfoRes.data.data);
    commit("auth_success");
  },
  getRoles: async ({ commit }) => {
    const result = await AccountServices.getRole();
    commit("setRoles", result.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
