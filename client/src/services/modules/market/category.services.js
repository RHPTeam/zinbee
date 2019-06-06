import Api from "@/services";

export default {
  // all catetogy
  getAll() {
    return Api().get("market/categories");
  },

  // create category
  create(name) {
    return Api().post("market/categories", name);
  },

  // update
  update(id, content) {
    return Api().patch(`market/categories?_id=${content._id}`, content);
  },

  // delete
  delete(id) {
    return Api().delete(`market/categories?_id=${id}`);
  }
};
