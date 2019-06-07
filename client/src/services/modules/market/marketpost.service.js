import Api from "@/services";

export default {
  index() {
    return Api().get("market/p/posts");
  },
  create(data) {
    return Api().post("market/p/posts", data);
  },
  uploadFiles(files) {
    return Api().post("market/p/posts/upload", files);
  },
  getMarketPostById(id) {
    return Api().get(`market/p/posts?_id=${id}`);
  },
  update(id, data) {
    return Api().patch(`market/p/posts?_id=${id}`, data);
  },
  delete(id) {
    return Api().delete(`market/p/posts?_id=${id}`);
  }
};
