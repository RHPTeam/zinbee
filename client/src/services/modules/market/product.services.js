import Api from "@/services";

export default {
  // create
  create(content) {
    return Api().post("market/products", content);
  },

  // get all product
  allProduct() {
    return Api().get("market/products");
  },

  // delete
  delete(id) {
    return Api().delete(`market/products?_id=${id}`);
  },

  // update
  update(id, content) {
    return Api().patch(`market/products?_id=${id}`, content);
  },

  // getInforProductById
  getInfoById(id) {
    return Api().get(`market/products?_id=${id}`);
  },

  // add to collection
  addToCollection(id, content) {
    return Api().post(`market/products/add/product/user?_id=${id}`, content);
  },

  // get products by category
  loadProductsByCategory(categoryId) {
    return Api().get(`market/products/${categoryId}/products`);
  }
};
