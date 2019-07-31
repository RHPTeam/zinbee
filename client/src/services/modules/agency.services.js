import Api from "@/services";

export default {
  create(data) {
    return Api().post("agency", data);
  },
  index() {
    return Api().get("agency");
  },
  getInfo(agencyId) {
    return Api().get(`agency?_id=${agencyId}`);
  },
  delete(agencyId) {
    return Api().delete(`agency?_id=${agencyId}`);
  },
  update(agencyId, data) {
    return Api().patch(`agency?_id=${agencyId}`, data);
  },
  getAgencyInfo(domain) {
    return Api().post("agency/info", domain);
  }
};
