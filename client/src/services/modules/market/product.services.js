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
  }
};
