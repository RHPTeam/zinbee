import Api from "@/services";

export default {
  index(size, page) {
    return Api().get(`market/p/posts?_size=${size}&_page=${page}`);
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
  },
  searchByKey(keyword, size, page) {
    return Api().post(
      `market/p/posts/search?keyword=${keyword}&_size=${size}&_page=${page}`
    );
  }
};
