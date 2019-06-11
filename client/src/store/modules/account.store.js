/**
 * Rule in store modules
 * State: use noun, not use verb
 * Getters: use name in state (if getter use filter or handle other, use bellow: filter + name in state ~ filterUser)
 * Mutations: user bellow: set + name in state ~ setUser
 * Actions: use verb, not use noun. As bellow: get + name in state ~ getUser .Sometimes, If actions don't use to get, u must have use verb not use noun.
 */
import AccountServices from "@/services/modules/account.services";

import StringFunction from "@/utils/functions/string";
import CookieFunction from "@/utils/functions/cookie";
import axios from "axios";

const state = {
  allUser: [],
  userInfo: [],
  userInfoMember: [],
  userDefault: [],
  authError: "",
  authStatus: "",
  roles: [],
  redirectDomain: "",
  infoUserEmail: [],
  statusResetPassword: null,
  code: "",
  usersFilter: [],
  statusFilter: 0
};
const getters = {
  allUser: state => state.allUser,
  authError: state => state.authError,
  authStatus: state => state.authStatus,
  userInfo: state => state.userInfo,
  userInfoMember: state => state.userInfoMember,
  userDefault: state => state.userDefault,
  roles: state => state.roles,
  redirectDomain: state => state.redirectDomain,
  token: state => state.token,
  infoUserEmail: state => state.infoUserEmail,
  statusResetPassword: state => state.statusResetPassword,
  code: state => state.code,
  usersFilter: state => state.usersFilter,
  statusFilter: state => state.statusFilter
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
  setUserMember: (state, payload) => {
    state.userInfoMember = payload;
  },
  setUserDefault: (state, payload) => {
    state.userDefault = payload;
  },
  setRoles: (state, payload) => {
    state.roles = payload;
  },
  setRedirectDomain: (state, payload) => {
    state.redirectDomain = payload;
  },
  setInfoEmail: (state, payload) => {
    state.infoUserEmail = payload;
  },
  statusResetPassword: (state, payload) => {
    state.statusResetPassword = payload;
  },
  setCode: (state, payload) => {
    state.code = payload;
  },
  getUsersFilter: (state, payload) => {
    state.usersFilter = payload;
  },
  setFilter: (state, payload) => {
    state.statusFilter = payload;
  }
};
const actions = {
  signUpAdmin: async ({ commit }, payload) => {
    try {
      commit("auth_request");
      const resData = await AccountServices.signUpAdmin(payload);

      const newSid = StringFunction.findSubString(
        resData.headers.cookie,
        "sid=",
        ";"
      );

      const newUid = StringFunction.findSubString(
        resData.headers.cookie,
        "uid=",
        ";"
      );

      const newCfr = StringFunction.findSubString(
        resData.headers.cookie,
        "cfr=",
        ""
      );

      CookieFunction.setCookie("sid", newSid);
      CookieFunction.setCookie("uid", newUid);
      CookieFunction.setCookie("cfr", newCfr);

      // remove localStorage
      // localStorage.removeItem("rid");

      axios.defaults.headers.common.Authorization = resData.headers.cookie;
      commit("auth_success");
    } catch (e) {
      if (e.response.status === 403) {
        commit("auth_error", e.response.data);
      }
      return;
    }
  },
  signInAdmin: async ({ commit }, payload) => {
    try {
      commit("auth_request");
      const resData = await AccountServices.signInAdmin(payload);

      const newSid = StringFunction.findSubString(
        resData.headers.cookie,
        "sid=",
        ";"
      );

      const newUid = StringFunction.findSubString(
        resData.headers.cookie,
        "uid=",
        ";"
      );

      const newCfr = StringFunction.findSubString(
        resData.headers.cookie,
        "cfr=",
        ""
      );

      CookieFunction.setCookie("sid", newSid);
      CookieFunction.setCookie("uid", newUid);
      CookieFunction.setCookie("cfr", newCfr);

      axios.defaults.headers.common.Authorization = resData.headers.cookie;

      commit("auth_success");
    } catch (e) {
      if (e.response.status === 401) {
        commit("auth_error", "401");
      }
      return;
    }
  },
  signUpByUser: async ({ commit }, payload) => {
    try {
      commit("auth_request");
      const resData = await AccountServices.signUpByUser(payload);

      const newSid = StringFunction.findSubString(
        resData.headers.cookie,
        "sid=",
        ";"
      );

      const newUid = StringFunction.findSubString(
        resData.headers.cookie,
        "uid=",
        ";"
      );

      const newCfr = StringFunction.findSubString(
        resData.headers.cookie,
        "cfr=",
        ""
      );

      CookieFunction.setCookie("sid", newSid);
      CookieFunction.setCookie("uid", newUid);
      CookieFunction.setCookie("cfr", newCfr);
      CookieFunction.setCookie("_sub", `${resData.data.data.domain}welcome`);

      axios.defaults.headers.common.Authorization = resData.headers.cookie;

      commit("auth_success");
      commit("setRedirectDomain", `${resData.data.data.domain}`);
    } catch (e) {
      if (e.response.status === 403) {
        commit("auth_error", "403");
      } else if (e.response.status === 404) {
        commit("auth_error", "404");
      }
      return;
    }
  },
  signInByUser: async ({ commit }, payload) => {
    try {
      commit("auth_request");
      const resData = await AccountServices.signInByUser(payload);

      CookieFunction.setCookie(
        "sid",
        StringFunction.findSubString(resData.headers.cookie, "sid=", ";")
      );
      CookieFunction.setCookie(
        "uid",
        StringFunction.findSubString(resData.headers.cookie, "uid=", ";")
      );
      CookieFunction.setCookie(
        "cfr",
        StringFunction.findSubString(resData.headers.cookie, "cfr=", "")
      );
      CookieFunction.setCookie("_sub", `${resData.data.data.domain}welcome`);

      axios.defaults.headers.common.Authorization = resData.headers.cookie;

      commit("auth_success");
      commit("setRedirectDomain", `${resData.data.data.domain}`);
    } catch (e) {
      if (e.response.status === 401) {
        commit("auth_error", "401");
      } else if (e.response.status === 405) {
        commit("auth_error", "405");
      }
      return;
    }
  },
  setSingUpByUser: async ({ commit }, payload) => {
    commit("setUserDefault", payload);
  },
  logOut: async ({ commit }) => {
    commit("auth_request");
    // remove cookie
    CookieFunction.removeCookie("sid");
    CookieFunction.removeCookie("uid");
    CookieFunction.removeCookie("cfr");
    CookieFunction.removeCookie("token");
    CookieFunction.removeCookie("_sub");
    CookieFunction.removeCookie("__v");

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
    const dataSender = CookieFunction.getCookie("uid");
    const userInfoRes = await AccountServices.getUserById(dataSender);
    commit("setUserById", userInfoRes.data.data);
    commit("auth_success");
  },
  getUserInfoMember: async ({ commit }) => {
    commit("auth_request");
    // const dataSender = CookieFunction.getCookie("uid");
    const rsUserInfoMember = await AccountServices.getUserMember();
    commit("setUserMember", rsUserInfoMember.data.data);
    commit("auth_success");
  },
  getRoles: async ({ commit }) => {
    const result = await AccountServices.getRole();
    commit("setRoles", result.data.data);
  },
  sendFile: async ({ commit }, payload) => {
    commit("setFileAvatar", payload);
    const result = await AccountServices.upload(payload);

    commit("user_set", result.data.data);
  },
  getInfoByEmail: async ({ commit }, payload) => {
    commit("auth_request");
    const sendEmail = {
      email: payload
    };

    await AccountServices.resetPassword(sendEmail);
    const result = await AccountServices.getInfoByEmail(payload);
    commit("setInfoEmail", result.data.data);
    commit("auth_success");
  },
  checkCode: async ({ commit }, payload) => {
    commit("auth_request");
    const objSender = {
      code: payload.code,
      email: payload.email
    };
    await AccountServices.checkCode(objSender);
    commit("auth_success");
  },
  getNewPassword: async ({ commit }, payload) => {
    commit("auth_request");
    await AccountServices.createNewPassword(payload);
    commit("statusResetPassword", true);
    commit("auth_success");
  },
  setCodeResetPassword: async ({ commit }, payload) => {
    commit("setCode", payload);
  },
  getUsersFilter: async ({ commit }, payload) => {
    await commit("getUsersFilter", payload);
  },
  setFilter: async ({ commit }, payload) => {
    await commit("setFilter", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
