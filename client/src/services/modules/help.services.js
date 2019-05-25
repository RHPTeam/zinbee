import Api from "@/services";

export default {
  /**
   * Help Categories Admin
   * Create, show, update, delete
   */
  createCategories(data) {
    return Api().post("help/categories", data);
  },
  getAllCategories(){
    return Api().get("help/categories");
  },
  getCategoriesById(id){
    return Api().get(`help/categories?_id=${id}`);
  },
  updateCategories(id, data){
    return Api().patch(`help/categories?_id=${id}`, data);
  },
  deleteCategories(id){
    return Api().delete(`help/categories?_id=${id}`);
  },
  /**
   * Help Blogs Admin
   * Create, show, update, delete
   */
  createBlog(data) {
    return Api().post("help/posts", data);
  },
  getAllBlog() {
    return Api().get("help/posts");
  },
  getBlogById(id) {
    return Api().get(`help/posts?_id=${id}`);
  },
  updateBlog(id, content) {
    return Api().patch(`help/posts?_id=${id}`, content);
  },
  deleteBlog(id){
    return Api().delete(`help/posts?_id=${id}`);
  }
};
