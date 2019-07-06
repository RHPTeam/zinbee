import Api from "@/services";
export default {
  create(data) {
    return Api().post("package", data);
  },
  index() {
    return Api().get("package");
  },
  getById(packageId) {
    return Api().get(`package?_id=${packageId}`);
  },
  delete(packageId) {
    return Api().delete(`package?_id=${packageId}`);
  },
  update(packageId, data) {
    return Api().patch(`package?_id=${packageId}`, data);
  }
};
