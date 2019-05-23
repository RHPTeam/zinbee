import AccountServices from "@/services/modules/account.services";

import CookieFunction from "@/utils/functions/cookie";
import axios from "axios";

const state = {
  status: "",
  token: CookieFunction.getCookie( "sid" ) || "",
  user: {},
  statusNotification: "",
  mailSender: "",
  statusResetPassword: false,
  textAuth: "",
  users: [],
  usersFilter: [],
  fileAvatar: "",
  roles: [],
  activeAccountError: "",
};

const getters = {
  isLoggedIn: ( state ) => !!state.token,
  authStatus: ( state ) => state.status,
  userInfo: ( state ) => state.user,
  statusNotification: ( state ) => state.statusNotification,
  mailSender: ( state ) => state.mailSender,
  statusResetPassword: ( state ) => state.statusResetPassword,
  textAuth: ( state ) => state.textAuth,
  users: ( state ) => state.users,
  usersFilter: ( state ) => state.usersFilter,
  fileAvatar: ( state ) => state.fileAvatar,
  roles: ( state ) => state.roles,
  activeAccountError: ( state ) => state.activeAccountError
};

const mutations = {
  auth_request: ( state ) => {
    state.status = "loading";
  },
  auth_request_success: ( state ) => {
    state.status = "success";
  },
  auth_success: ( state, payload ) => {
    state.status = "success";
    state.token = payload.token;
    state.user = payload.user;
  },
  auth_error: ( state, payload ) => {
    state.status = payload;
  },
  user_set: ( state, payload ) => {
    state.user = payload;
  },
  user_action: ( state, payload ) => {
    state.statusNotification = payload;
  },
  logout: ( state ) => {
    state.status = "";
    state.token = "";
  },
  updateUser: ( state, payload ) => {
    state.user = payload;
  },
  mailSender: ( state, payload ) => {
    state.mailSender = payload;
  },
  statusResetPassword_set: ( state, payload ) => {
    state.statusResetPassword = payload;
  },
  set_textAuth: ( state, payload ) => {
    state.textAuth = payload;
  },
  getUsers: ( state, payload ) => {
    state.users = payload;
  },
  getUsersFilter: ( state, payload ) => {
    state.usersFilter = payload;
  },
  setActiveAccount: ( state, payload ) => {
    state.activeAccountError = payload;
  },
  setFileAvatar: ( state, payload ) => {
    state.fileAvatar = payload;
  },
  setRoles: ( state, payload ) => {
    state.roles = payload;
  }
};

const actions = {
  signIn: async ( { commit }, user ) => {
    try {
      commit( "auth_request" );
      const resData = await AccountServices.signIn( user );

      CookieFunction.setCookie( "sid", resData.data.data.token, 1 );
      CookieFunction.setCookie( "uid", resData.data.data.user._id );
      CookieFunction.setCookie( "cfr", resData.data.data.role );

      // remove localStorage
      localStorage.removeItem( "rid" );

      axios.defaults.headers.common.Authorization = resData.data.data.token;
      const sendDataToMutation = {
        token: resData.data.data.token,
        user: resData.data.data.user
      };

      commit( "auth_success", sendDataToMutation );
    } catch ( e ) {
      if ( e.response.status === 401 ) {
        commit( "auth_error", "401" );
      }
      if ( e.response.status === 405 ) {
        commit( "auth_error", "405" );
      }
    }
  },
  signUp: async ( { commit }, user ) => {
    try {
      commit( "auth_request" );
      const resData = await AccountServices.signUp( user );
      // set cookie

      CookieFunction.setCookie( "sid", resData.data.data.token, 1 );
      CookieFunction.setCookie( "uid", resData.data.data._id );
      CookieFunction.setCookie( "cfr", resData.data.data.role );

      // remove localStorage
      localStorage.removeItem( "rid" );

      // set Authorization
      axios.defaults.headers.common.Authorization = resData.data.data.token;
      const sendDataToMutation = {
        token: resData.data.data.token,
        user: resData.data.data.user
      };

      commit( "auth_success", sendDataToMutation );
    } catch ( e ) {
      commit( "auth_error" );
      if ( e.response.status === 405 ) {
        commit( "set_textAuth", e.response.data.data.details[ 0 ].context.label );
      } else if ( e.response.status === 404 ) {
        commit( "set_textAuth", "404" );
      } else {
        commit( "set_textAuth", e.response.data.status );
      }
      return false;
    }
  },
  logOut: async ( { commit } ) => {
    commit( "logout" );
    // remove cookie
    CookieFunction.removeCookie( "sid" );
    CookieFunction.removeCookie( "uid" );
    CookieFunction.removeCookie( "cfr" );
    // remove localstorage
    localStorage.removeItem( "rid" );
    // delete token on headers
    delete axios.defaults.headers.common.Authorization;
  },
  getUserInfo: async ( { commit } ) => {
    commit( "auth_request" );
    const userInfoRes = await AccountServices.show(
      CookieFunction.getCookie( "uid" )
    );
    const sendDataToMutation = {
      token: CookieFunction.getCookie( "sid" ),
      user: userInfoRes.data.data[ 0 ]
    };

    commit( "auth_success", sendDataToMutation );
  },
  updateUser: async ( { commit }, payload ) => {
    await AccountServices.update( payload );
    const userInfoRes = await AccountServices.show(
      CookieFunction.getCookie( "uid" )
    );

    commit( "updateUser", userInfoRes.data.data[ 0 ] );
  },
  updateUserByAdmin: async ( { commit }, payload ) => {
    const res = await AccountServices.updateUserByAdmin( payload );

    commit( "updateUser", res.data.data );
    const users = await AccountServices.index();

    await commit( "getUsers", users.data.data );
  },
  deleteUsers: async ( { commit }, payload ) => {
    await AccountServices.deleteUsers( payload );
    const users = await AccountServices.index();

    await commit( "getUsersFilter", users.data.data );
  },
  changePassword: async ( { commit }, payload ) => {
    try {
      const resetPassword = {
        password: payload.password,
        newPassword: payload.newPassword
      };

      await AccountServices.changePassword( resetPassword );
      commit( "auth_success" );
    } catch ( e ) {
      if ( e.response.status === 403 ) {
        commit( "auth_error" );
        commit(
          "set_textAuth",
          "Mật khẩu cũ của bạn không đúng, vui lòng thử lại !"
        );
      }
    }
  },
  resetPassword: async ( { commit }, payload ) => {
    commit( "auth_request" );
    const sendEmail = {
      email: payload
    };

    await AccountServices.resetPassword( sendEmail );
    const userData = await AccountServices.showUserByEmail( payload );

    commit( "user_set", userData.data.data );
    commit( "mailSender", payload );
    commit( "auth_request_success" );
  },
  checkCode: async ( { commit, state }, payload ) => {
    commit( "auth_request" );
    const data = {
      code: payload,
      email: state.mailSender
    };

    await AccountServices.checkCode( data );
    commit( "auth_request_success" );
  },
  newPassword: async ( { commit, state }, payload ) => {
    commit( "auth_request" );
    const objSender = {
      newPassword: payload
    };

    await AccountServices.createNewPassword( objSender, state.user._id );
    commit( "statusResetPassword_set", true );
    commit( "auth_request_success" );
  },
  set_error: async ( { commit }, payload ) => {
    commit( "set_textAuth", payload );
    commit( "auth_error" );
  },
  getUsers: async ( { commit } ) => {
    const users = await AccountServices.index();

    await commit( "getUsers", users.data.data );
  },
  getUsersFilter: async ( { commit }, payload ) => {
    await commit( "getUsersFilter", payload );
  },
  getRoles: async ( { commit } ) => {
    const res = await AccountServices.getRoles();

    await commit( "setRoles", res.data.data );
  },
  sendFile: async ( { commit }, payload ) => {
    commit( "setFileAvatar", payload );
    const result = await AccountServices.upload( payload );

    commit( "user_set", result.data.data );
  },
  activeAccount: async ( { commit }, payload ) => {
    commit( "setActiveAccount", "" );
    try {
      commit( "auth_request" );
      await AccountServices.active( payload );
      commit( "auth_request_success" );

      const users = await AccountServices.index();
      await commit( "getUsersFilter", users.data.data );
    }
    catch ( e ) {
    if ( e.response.status === 404 ) {
      commit(
        "setActiveAccount",
        "Mã kích hoạt không tồn tại!"
      );
    }
  }


  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
