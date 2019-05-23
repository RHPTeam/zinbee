/**
 * Rule in store modules
 * State: use noun, not use verb
 * Getters: use name in state (if getter use filter or handle other, use bellow: filter + name in state ~ filterUser)
 * Mutations: user bellow: set + name in state ~ setUser
 * Actions: use verb, not use noun. As bellow: get + name in state ~ getUser .Sometimes, If actions don't use to get, u must have use verb not use noun.
 */
import AccountServices from "@/services/modules/account.services";

// import CookieFunction from "@/utils/functions/cookie";
// import axios from "axios";

const state = {
  allUser: [],
  userInfo: [],
  authError: "",
  authStatus: ""
};
const getters = {
  allUser: state => state.allUser,
  authError: state => state.authError,
  authStatus: state => state.authStatus,
  userInfo: state => state.userInfo
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
  }
};
const actions = {
  signUp: async ({ commit }, payload) => {
    try {
      commit("auth_request");
      await AccountServices.signUp(payload);

      // CookieFunction.setCookie( "sid", resData.data.data.token, 1 );
      // CookieFunction.setCookie( "uid", resData.data.data._id );
      // CookieFunction.setCookie( "cfr", resData.data.data.role );
      //
      // // remove localStorage
      // localStorage.removeItem( "rid" );
      //
      // // set Authorization
      // axios.defaults.headers.common.Authorization = resData.data.data.token;
      // const sendDataToMutation = {
      //   token: resData.data.data.token,
      //   user: resData.data.data.user
      // };
      //
      // commit( "auth_success", sendDataToMutation );
    } catch (e) {
      if (e.response.status === 403) {
        commit("auth_error", e.response.data);
      }
    }
  },
  signIn: async ({ commit }, payload) => {
    try {
      commit("auth_request");
      const response = await AccountServices.signIn(payload);
      // console.log(resData);
      // CookieFunction.setCookie( "sid", resData.data.data.token, 1 );
      // CookieFunction.setCookie( "uid", resData.data.data.user._id );
      // CookieFunction.setCookie( "cfr", resData.data.data.role );
      //
      // // remove localStorage
      // localStorage.removeItem( "rid" );
      //
      // axios.defaults.headers.common.Authorization = resData.data.data.token;
      // const sendDataToMutation = {
      //   token: resData.data.data.token,
      //   user: resData.data.data.user
      // };
      //
      // commit( "auth_success", sendDataToMutation );
      commit("auth_success");
    } catch (e) {
      if (e.response.status === 401) {
        commit("auth_error", "401");
      }
    }
  },
  set_error: async ({ commit }, payload) => {
    commit("auth_error", payload);
  },
  getAllAccountAdmin: async ({ commit }) => {
    commit("auth_request");
    const result = await AccountServices.getAllUser();
    commit("setAllUser", result.data.data);
    commit("auth_success");
  },
  getAllAccountAdminById: async ({ commit }, payload) => {
    commit("auth_request");
    const result = await AccountServices.getUserById(payload);
    commit("setUserById", result.data.data);
    commit("auth_success");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
