import AgencyServices from "@/services/modules/agency.services";

const state = {
  agency: {
    _account: {},
    customer: {
      listOfUser: []
    },
    expire: {
      start: Date.now(),
      end: Date.now(),
      usedTime: 0,
      leftTime: 0
    },
    status: true,
    _package: {}
  },
  agencies: [],
  agencyStatus: ""
};
const getters = {
  agencies: state => state.agencies,
  agency: state => state.agency,
  agencyStatus: state => state.agencyStatus
};
const mutations = {
  agency_request: state => {
    state.agencyStatus = "loading";
  },
  agency_success: state => {
    state.agencyStatus = "success";
  },
  setAllAgency: (state, payload) => {
    state.agencies = payload;
  },
  setListOfUser: (state, payload) => {
    state.agency.customer.listOfUser = [...new Set(payload)];
  }
};
const actions = {
  createNewAgency: async ({ commit }, payload) => {
    commit("agency_request");
    await AgencyServices.create(payload);
    const result = await AgencyServices.index();
    commit("setAllAgency", result.data.data);
    commit("agency_success");
  },
  getAllAgency: async ({ commit }) => {
    commit("agency_request");
    const result = await AgencyServices.index();
    commit("setAllAgency", result.data.data);
    commit("agency_success");
  },
  setListOfUser: async ({ commit }, payload) => {
    commit("setListOfUser", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
