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
  getGlobalNavCategory(id, type) {
    return Api().get(`help/categories?_id=${id}&type=${type}`);
  },
  updateCategory(id, data) {
    return Api().patch(`help/categories?_id=${id}`, data);
  },
  uploadFile(file) {
    return Api().post("help/categories/upload", file);
  },
  deleteCategory(id) {
    return Api().delete(`help/categories?_id=${id}`);
  },
  getAllCategoriesChild() {
    return Api().get("help/categories?_type=rs");
  }
};
