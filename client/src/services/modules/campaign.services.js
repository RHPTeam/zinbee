import Api from "@/services";

export default {
  create(title) {
    return Api().post(`campaign-default`, title);
  },
  index() {
    return Api().get("campaign-default");
  },
  getCampaignById(campaignId) {
    return Api().get(`campaign-default?_id=${campaignId}`);
  },
  delete(campaignId) {
    return Api().delete(`campaign-default?_id=${campaignId}`);
  },
  update(campaignId, content) {
    return Api().patch(`campaign-default?_id=${campaignId}`, content);
  }
};
