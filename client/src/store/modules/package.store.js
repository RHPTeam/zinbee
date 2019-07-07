import PackageService from "@/services/modules/package.services";

const state = {
  package: {
    title: "",
    total: ""
  },
  packages: [],
  packageStatus: ""
};
const getters = {
  package: state => state.package,
  packages: state => state.packages,
  packageStatus: state => state.packageStatus
};
const mutations = {
  package_request: state => {
    state.packageStatus = "loading";
  },
  package_success: state => {
    state.packageStatus = "success";
  },
  setAllPackage: (state, payload) => {
    state.packages = payload;
  },
  setDeletePackage: (state, payload) => {
    state.packages = payload;
  },
  setUpdatePackage: (state, payload) => {
    const position = state.packages
      .map((item, index) => {
        if (item._id === payload._id) return index;
      })
      .filter(item => item !== undefined);
    state.packages[position] = payload;
  },
  setPackage: (state, payload) => {
    state.package = payload;
  },
  setPackageDefault: (state, payload) => {
    state.package = payload;
  }
};
const actions = {
  createNewPackage: async ({ commit }, payload) => {
    commit("package_request");
    const objSender = {
      title: payload.title,
      total: parseInt(payload.total)
    };
    await PackageService.create(objSender);
    const result = await PackageService.index();
    commit("setAllPackage", result.data.data);
    commit("package_success");
  },
  getAllPackage: async ({ commit }) => {
    commit("package_request");
    const result = await PackageService.index();
    commit("setAllPackage", result.data.data);
    commit("package_success");
  },
  getPackageById: async ({ commit }, payload) => {
    commit("package_request");
    const result = await PackageService.getById(payload);
    commit("setPackage", result.data.data);
    commit("package_success");
  },
  deletePackage: async ({ commit, state }, payload) => {
    commit("package_request");
    const packages = state.packages.filter(item => item._id !== payload);
    commit("setDeletePackage", packages);
    await PackageService.delete(payload);
    commit("package_success");
  },
  updatePackage: async ({ commit }, payload) => {
    commit("package_request");
    commit("setUpdatePackage", payload);
    await PackageService.update(payload._id, payload);
    commit("package_success");
  },
  setPackageDefault: async ({ commit }, payload) => {
    await commit("setPackageDefault", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
