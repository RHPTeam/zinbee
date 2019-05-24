/* eslint-disable prettier/prettier */
const state = {
    themeName: "light",
    collapseMenu: false,
    hideChatSidebar: false
  },
  getters = {
    themeName: ( s ) => {
      return s.themeName;
    },
    collapseMenu: ( s ) => {
      return s.collapseMenu;
    },
    hideChatSidebar: ( s ) => {
      return s.hideChatSidebar;
    }
  },
  mutations = {
    changeMenu: ( s, payload ) => {
      s.collapseMenu = payload;
    },
    changeChatSidebar: ( s, payload ) => {
      s.hideChatSidebar = payload;
    },
    changeThemeName: ( s, payload ) => {
      s.themeName = payload;
    }
  },
  actions = {
    changeMenu: ( { commit }, payload ) => {
      commit( "changeMenu", payload );
    },
    changeChatSidebar: ( { commit }, payload ) => {
      commit( "changeChatSidebar", payload );
    },
    changeThemeName: ( { commit }, payload ) => {
      commit( "changeThemeName", payload );
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
