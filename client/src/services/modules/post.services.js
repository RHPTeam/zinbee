import Api from "@/services";

export default {
  index() {
    return Api().get("posts");
  },
  create(data) {
    return Api().post("posts", data);
  },
  getById(postId) {
    return Api().get(`posts?_id=${postId}`);
  },
  updatePost(postId, content) {
    return Api().patch(`posts?_id=${postId}`, content);
  },
  updateAttachmentPost(postId, content) {
    return Api().patch(`posts?_id=${postId}`, content);
  },
  deletePostFacebook(postId) {
    return Api().delete(`posts?_id=${postId}`);
  },
  deleteItemAttachment(postId, attachmentId) {
    return Api().delete(`posts?_id=${postId}&_attachmentId=${attachmentId}`);
  },
  searchPostFromLibararies(keyword, size) {
    return Api().post(`posts/search?keyword=${keyword}&_size=${size}`);
  },
  searchPostLibrariesByPage(keyword, size, page) {
    return Api().get(
      `posts?search?keyword=${keyword}&_size=${size}&_page=${page}`
    );
  }
};
