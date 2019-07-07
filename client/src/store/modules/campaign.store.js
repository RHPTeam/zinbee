import CampaignServices from "@/services/modules/campaign.services";

const state = {
  campaignStatus: "",
  campaigns: [],
  campaign: [],
  campaignDetail: []
};
const getters = {
  campaignStatus: state => state.campaignStatus,
  campaigns: state => state.campaigns,
  campaign: state => state.campaign,
  campaignDetail: state => state.campaignDetail
};
const mutations = {
  campaign_request: state => {
    state.campaignStatus = "loading";
  },
  campaign_success: state => {
    state.campaignStatus = "success";
  },
  setAllCampaign: (state, payload) => {
    state.campaigns = payload;
  },
  setCampaign: (state, payload) => {
    state.campaign = payload;
  },
  setDeleteCampaign: (state, payload) => {
    state.campaigns = payload;
  },
  setUpdate: (state, payload) => {
    const positon = state.campaigns
      .map((item, index) => {
        if (item._id === payload._id) return index;
      })
      .filter(item => item !== undefined);
    state.campaigns[positon] = payload;
  },
  setCampaignDefault: (state, payload) => {
    state.campaignDetail = payload;
  }
};
const actions = {
  createCampaign: async ({ commit }, payload) => {
    commit("campaign_request");
    await CampaignServices.create(payload);
    const result = await CampaignServices.old();
    commit("setAllCampaign", result.data.data);
    commit("campaign_success");
  },
  getAllCampaign: async ({ commit }) => {
    commit("campaign_request");
    const result = await CampaignServices.old();
    commit("setAllCampaign", result.data.data);
    commit("campaign_success");
  },
  getCampaignDetail: async ({ commit }, payload) => {
    commit("campaign_request");
    const result = await CampaignServices.getCampaignById(payload);
    commit("setCampaign", result.data.data);
    commit("campaign_success");
  },
  deleteCampaign: async ({ commit }, payload) => {
    commit("campaign_request");

    const camp = state.campaigns.filter(item => item._id !== payload);
    commit("setDeleteCampaign", camp);

    await CampaignServices.delete(payload);
    commit("campaign_success");
  },
  updateTitleCampaign: async ({ commit }, payload) => {
    commit("campaign_request");
    await CampaignServices.update(payload._id, payload);
    commit("setUpdate", payload);
    commit("campaign_success");
  },
  setCampaignDefault: async ({ commit }) => {
    await commit("setCampaignDefault", {
      title: "",
      totalDay: null
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
