import ServerServices from "@/services/modules/server.services";

const state = {
  allDomain: [],
  domainInfo: [],
  serverStatus: ""
};
const getters = {
  allDomain: state => state.allDomain,
  domainInfo: state => state.domainInfo,
  serverStatus: state => state.serverStatus
};
const mutations = {
  server_request: state => {
    state.serverStatus = "loading";
  },
  server_success: state => {
    state.serverStatus = "success";
  },
  setAllDomain: (state, payload) => {
    state.allDomain = payload;
  },
  setInfoDomainDefault: (state, payload) => {
    state.domainInfo = payload;
  }
};
const actions = {
  createNewDomain: async ({ commit }, payload) => {
    commit("server_request");
    await ServerServices.create(payload);
    const result = await ServerServices.index();
    commit("setAllDomain", result.data.data);
    commit("server_success");
  },
  getAllDomain: async ({ commit }) => {
    commit("server_request");
    const result = await ServerServices.index();
    commit("setAllDomain", result.data.data);
    commit("server_success");
  },
  getDomainById: async ({ commit }, payload) => {
    commit("server_request");
    const result = await ServerServices.getVpsById(payload);
    commit("setInfoDomainDefault", result.data.data);
    commit("server_success");
  },
  deleteDomain: async ({ commit }, payload) => {
    commit("server_request");
    await ServerServices.deleteVps(payload);
    const result = await ServerServices.index();
    commit("setAllDomain", result.data.data);
    commit("server_success");
  },
  updateDomain: async ({ commit }, payload) => {
    commit("server_request");
    await ServerServices.updateVps(payload._id, payload);
    const result = await ServerServices.index();
    commit("setAllDomain", result.data.data);
    commit("server_success");
  },
  setDomainDefault: async ({ commit }) => {
    commit("setInfoDomainDefault", {
      title: "",
      info: {
        domain: "",
        ip: "",
        cpu: "",
        clientPort:null,
        serverPort: null,
        ram: null,
        card: "",
        supplier: {
          name: "",
          url: ""
        },
        expire: ""
      },
      region: null,
      amountMax: null,
      status: null
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
