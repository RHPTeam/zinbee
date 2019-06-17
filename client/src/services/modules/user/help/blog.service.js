import Api from "@/services";

export default {
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
  deleteBlog(id) {
    return Api().delete(`help/posts?_id=${id}`);
  },
  searchBlog(keyword, size, page) {
    return Api().post(
      `help/posts/search?keyword=${keyword}&_size=${size}&_page=${page}`
    );
  }
};
