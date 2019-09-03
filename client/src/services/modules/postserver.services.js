import Api from "@/services";

export default {
  index() {
    return Api().get("server/post");
  },
  create(data) {
    return Api().post("server/post", data);
  },
  update(id, data) {
    return Api().patch(`server/post?_id=${id}`, data);
  },
  delete(id) {
    return Api().delete(`server/post?_id=${id}`);
  },
  show(id) {
    return Api().get(`server/post?_id=${id}`);
  }
};
