/* eslint-disable prettier/prettier */
const state = {
    themeName: "light",
    collapseMenu: false,
    hideChatSidebar: false,
    backgroundHeader: false
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
    },

    // change backgroundHeader
    backgroundHeader: ( s ) => {
      return s.backgroundHeader;
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
    },

    // Change background header when scroll top = 0
    changeBackgroundHeader: ( s, payload ) => {
      s.backgroundHeader = payload;
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
    },

    // Change background header when scroll top = 0
    changeBackgroundHeader: ( {commit}, payload ) => {
      commit("changeBackgroundHeader", payload);
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
