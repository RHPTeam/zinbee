import AgencyServices from "@/services/modules/agency.services";

const state = {
  agency: {
    _account: {
      name: "",
      _id: ""
    },
    expire: {
      start: Date.now(),
      end: Date.now(),
      usedTime: 0,
      leftTime: 0
    },
    status: true,
    _package: {
      name: "",
      _id: ""
    }
  },
  agencies: [],
  agencyInfo: {},
  agencyStatus: "",
  variableControlAgency: 0
};
const getters = {
  agencies: state => state.agencies,
  agency: state => state.agency,
  agencyInfo: state => state.agencyInfo,
  agencyStatus: state => state.agencyStatus,
  variableControlAgency: state => state.variableControlAgency
};
const mutations = {
  agency_request: state => {
    state.agencyStatus = "loading";
  },
  agency_success: state => {
    state.agencyStatus = "success";
  },
  setAgency: (state, payload) => {
    state.agency = payload;
  },
  setAllAgency: (state, payload) => {
    state.agencies = payload;
  },
  setAgencyDefault: (state, payload) => {
    state.agency = payload;
  },
  setAgencyInfo: (state, payload) => {
    state.agencyInfo = payload;
  },
  setListOfUser: (state, payload) => {
    state.agency.customer.listOfUser = [...new Set(payload)];
  },
  setVaribleControlAgency: (state, payload) => {
    state.variableControlAgency = payload;
  },
  setUpdateAgency: (state, payload) => {
    const position = state.agencies
      .map((item, index) => {
        if (item._id === payload._id) return index;
      })
      .filter(item => item !== undefined);
    state.agencies[position] = payload;
  },
  setDeleteAgency: (state, payload) => {
    state.agencies = payload;
  }
};
const actions = {
  createNewAgency: async ({ commit }, payload) => {
    commit("agency_request");
    const dataSender = {
      _account: payload._account._id,
      customer: {
        listOfUser: []
      },
      expire: {
        start: new Date(payload.expire.start),
        end: payload.expire.end,
        usedTime: 0,
        leftTime: 0
      },
      status: payload.status,
      _package: payload._package._id
    };
    await AgencyServices.create(dataSender);
    const result = await AgencyServices.index();
    commit("setAllAgency", result.data.data);
    commit("agency_success");
  },
  deleteAgency: async ({ commit, state }, payload) => {
    commit("agency_request");
    const list = state.agencies.filter(item => item._id !== payload);
    await commit("setDeleteAgency", list);
    await AgencyServices.delete(payload);
    commit("agency_success");
  },
  getAllAgency: async ({ commit }) => {
    commit("agency_request");
    const result = await AgencyServices.index();
    commit("setAllAgency", result.data.data);
    commit("agency_success");
  },
  getAgencyInfo: async ({ commit }, payload) => {
    commit("agency_request");
    const result = await AgencyServices.getAgencyInfo(payload);
    commit("setAgencyInfo", result.data.data);
    commit("agency_success");
  },
  getInfoAgency: async ({ commit }, payload) => {
    commit("agency_request");
    const result = await AgencyServices.getInfo(payload);
    commit("setAgency", result.data.data);
    commit("agency_success");
  },
  setListOfUser: async ({ commit }, payload) => {
    commit("setListOfUser", payload);
  },
  setVaribleControlAgency: async ({ commit }, payload) => {
    await commit("setVaribleControlAgency", payload);
  },
  setAgencyDefault: async ({ commit }) => {
    await commit("setAgencyDefault", {
      _account: {
        name: "",
        _id: ""
      },
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
      _package: {
        name: "",
        _id: ""
      }
    });
  },
  updateAgency: async ({ commit }, payload) => {
    commit("agency_request");
    await commit("setUpdateAgency", payload);
    const dataSender = {
      _account: payload._account._id,
      customer: {
        listOfUser: []
      },
      expire: {
        start: payload.expire.start,
        end: payload.expire.end
      },
      status: payload.status,
      _package: payload._package._id
    };
    await AgencyServices.update(payload._id, dataSender);
    commit("agency_success");
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};
