import Api from "@/services";

export default {
  createCategory(data) {
    return Api().post("help/categories", data);
  },
  getAllCategories() {
    return Api().get("help/categories");
  },
  getCategoryById(id) {
    return Api().get(`help/categories?_id=${id}`);
  },
  getCategoryBySlug(slug) {
    return Api().get(`help/categories?slug=${slug}`);
  },
  updateCategory(id, data) {
    return Api().patch(`help/categories?_id=${id}`, data);
  },
  deleteCategory(id) {
    return Api().delete(`help/categories?_id=${id}`);
  },
  getAllCategoriesChild() {
    return Api().get("help/categories?_type=rs");
  }
};
