import Api from "@/services";

export default {
  createCategoryDefault(content) {
    return Api().post("category-default", content);
  },
  getAllCategoryDefault() {
    return Api().get("category-default");
  },
  getCategoryDefaultById(id) {
    return Api().get(`category-default?_id=${id}`);
  },
  updateCategoryDefault(id, content) {
    return Api().patch(`category-default?_id=${id}`, content);
  },
  pushCategoryDefault(categoryId, postId) {
    return Api().post(`category-default/${categoryId}/post/${postId}`);
  },
  delete(id) {
    return Api().delete(`category-default?_id=${id}`);
  },
  deletePostCategory(categoryId, postId) {
    return Api().delete(`category-default/${categoryId}/post/${postId}`);
  }
};
