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
  statusFilter: null,
  userSelectInfo: null,
  userEdit: null,
  activeAccount: ""
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
  statusFilter: state => state.statusFilter,
  userSelectInfo: state => state.userSelectInfo,
  userEdit: state => state.userEdit,
  activeAccount: state => state.activeAccount
};
const mutations = {
  auth_request: state => {
    state.authStatus = "loading";
  },
  auth_success: state => {
    state.authStatus = "success";
  },
  auth_error: (state, payload) => {
    state.authStatus = "error";
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
  },
  setUserInfo: (state, payload) => {
    state.userSelectInfo = payload;
  },
  setUserEdit: (state, payload) => {
    state.userEdit = payload;
  },
  setActiveAccount: (state, payload) => {
    state.activeAccount = payload;
  }
};
const actions = {
  /**
   * @Description: save variables in localStorage as: sid, uid. cfr. Then redirect to admin manager
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
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
  /**
   * @Description: save variables in localStorage as: sid, uid. cfr. Then redirect to admin manager
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
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
  /**
   * @Description: save variables in localStorage as: sid, uid. cfr. Then redirect user to server masso
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
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
  /**
   * @Description: save variables in localStorage as: sid, uid. cfr. Then redirect user to server masso
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
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
      commit("auth_error", "");
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
  /**
   * @Description: set info user default with empty value
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  setSingUpByUser: async ({ commit }, payload) => {
    commit("setUserDefault", payload);
  },
  /**
   * @Description: logout delete variable save in localStorage
   * @param commit
   * @returns {Promise<void>}
   */
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
  /**
   * @Description: get info all account
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  getAllUserAdmin: async ({ commit }) => {
    commit("auth_request");
    const result = await AccountServices.getAllUser();
    commit("setAllUser", result.data.data);
    commit("auth_success");
  },
  /**
   * @Description: get info account by Id
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  getUserAdminById: async ({ commit }, payload) => {
    commit("auth_request");
    const result = await AccountServices.getUserById(payload);
    commit("setUserById", result.data.data);
    commit("auth_success");
  },
  /**
   * @Description: get info my account
   * @param commit
   * @returns {Promise<void>}
   */
  getUserInfo: async ({ commit }) => {
    commit("auth_request");
    const dataSender = CookieFunction.getCookie("uid");
    const userInfoRes = await AccountServices.getUserById(dataSender);
    commit("setUserById", userInfoRes.data.data);
    commit("auth_success");
  },
  /**
   * @Description: get info user
   * @param commit
   * @returns {Promise<void>}
   */
  getUserInfoMember: async ({ commit }) => {
    commit("auth_request");
    // const dataSender = CookieFunction.getCookie("uid");
    const rsUserInfoMember = await AccountServices.getUserMember();
    commit("setUserMember", rsUserInfoMember.data.data);
    commit("auth_success");
  },
  /**
   * @Description: get role of account
   * @param commit
   * @returns {Promise<void>}
   */
  getRoles: async ({ commit }) => {
    const result = await AccountServices.getRole();
    commit("setRoles", result.data.data);
  },
  /**
   * @Description: update avatar for user
   * @param commit
   * @param payload: link image
   * @returns {Promise<void>}
   */
  sendFile: async ({ commit }, payload) => {
    commit("setFileAvatar", payload);
    const result = await AccountServices.upload(payload);

    commit("user_set", result.data.data);
  },
  /**
   * @Description: get info user by email
   * @param commit: info user
   * @param payload: email of user
   * @returns {Promise<void>}
   */
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
  /**
   * @Description: check code get from email
   * @param commit status
   * @param payload: code get from email, email user used signup system
   * @returns {Promise<void>}
   */
  checkCode: async ({ commit }, payload) => {
    commit("auth_request");
    const objSender = {
      code: payload.code,
      email: payload.email
    };
    await AccountServices.checkCode(objSender);
    commit("auth_success");
  },
  /**
   * @Description: set up new password then forgot pass word
   * @param commit status reset password use show alert for user
   * @param payload new passsword
   * @returns {Promise<void>}
   */
  getNewPassword: async ({ commit }, payload) => {
    commit("auth_request");
    await AccountServices.createNewPassword(payload);
    commit("statusResetPassword", true);
    commit("auth_success");
  },
  /**
   * @Description: check code reset password sended on email
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  setCodeResetPassword: async ({ commit }, payload) => {
    commit("setCode", payload);
  },
  /**
   *description: filter user
   * @param commit
   * @param payload array have item users filtered
   * @returns {Promise<void>}
   */
  getUsersFilter: async ({ commit }, payload) => {
    await commit("setAllUser", payload);
  },
  /**
   *description filter user work
   * @param commit
   * @returns {Promise<void>} filter user have status is true
   */
  getUserWork: async ({ commit }) => {
    commit("auth_request");
    const result = await AccountServices.getAllUser();
    const users = result.data.data;
    const arr = users.filter(item => {
      if (item.status === true) return item;
    });
    await commit("setAllUser", arr);
    commit("auth_success");
  },
  /**
   *description filter user don't work
   * @param commit
   * @param payload
   * @returns {Promise<void>} filter user have status is false
   */
  getUserDontWork: async ({ commit }) => {
    commit("auth_request");
    const result = await AccountServices.getAllUser();
    const users = result.data.data;
    const arr = users.filter(item => {
      if (item.status === false) return item;
    });
    await commit("setAllUser", arr);
    commit("auth_success");
  },
  /**
   *description
   * @param commit
   * @param payload
   * @returns {Promise<void>} filter user about email
   */
  setFilter: async ({ commit }, payload) => {
    await commit("setFilter", payload);
  },
  /**
   *description: send info user used popup info in modules account
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  setUserInfo: async ({ commit }, payload) => {
    await commit("setUserInfo", payload);
  },
  /**
   * description: send info user use popup edit in modules account
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  setUserEdit: async ({ commit }, payload) => {
    await commit("setUserEdit", payload);
  },
  /**
   * description: update status for account
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  changeStatusOfUser: async ({ commit }, payload) => {
    commit("auth_request");
    const objSender = {
      id: payload.userId
    };
    await AccountServices.changeStatus(objSender);
    const result = await AccountServices.getUserById(payload.userId);
    commit("setUserById", result.data.data);
    const results = await AccountServices.getAllUser();
    commit("setAllUser", results.data.data);
    commit("auth_success");
  },
  /**
   * description: update exprodate for account
   * @param commit set all user then return
   * @param payload have: userId and expriDate
   * @returns {Promise<void>}
   */
  changeExpireDateOfUser: async ({ commit }, payload) => {
    commit("auth_request");
    const objSender = {
      id: payload.userId,
      expireDate: payload.value
    };
    await AccountServices.renewById(objSender);
    const result = await AccountServices.getUserById(payload.userId);
    commit("setUserById", result.data.data);
    const results = await AccountServices.getAllUser();
    commit("setAllUser", results.data.data);
    commit("auth_success");
  },
  /**
   * description: use active for accounts
   * @param commit: set all user
   * @param payload: code acctive and expri Date
   * @returns {Promise<void>}
   */
  activeAccount: async ({ commit }, payload) => {
    commit("auth_request");
    try {
      await AccountServices.renewByCode(payload);

      const results = await AccountServices.getAllUser();
      commit("setAllUser", results.data.data);
    } catch (e) {
      if (e.response.status === 404) {
        commit("setActiveAccount", "Mã kích hoạt không tồn tại!");
      }
    }
    commit("auth_success");
  },
  updateUserByAdmin: async ({ commit }, payload) => {
    const res = await AccountServices.updateUserByAdmin(payload);

    commit("setUserById", res.data.data);
    const users = await AccountServices.getAllUser();

    await commit("setAllUser", users.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
