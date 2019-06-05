import Api from "@/services";

export default {
  // create
  create(content) {
    return Api().post("market/products", content);
  },

  // get all product
  allProduct() {
    return Api().get("market/products");
  }
};
