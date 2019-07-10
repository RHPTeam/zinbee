import Api from "@/services";

export default {
  // create
  create(content) {
    return Api().post("market/products", content);
  },

  // get all product
  allProduct() {
    console.log( "Hehehe" );
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
  addToCollection(id) {
    return Api().post(`market/products/add/product/user?_id=${id}`);
  },

  // get products by category
  loadProductsByCategory(categoryId) {
    return Api().get(`market/products/${categoryId}/products`);
  },

  // search products
  searchProducts(name) {
    return Api().post(
      `/market/products/search?keyword=${name}&_size=12&_page=1`
    );
  },

  // get newest product
  getNewestProduct(number) {
    return Api().get(`market/products/newest?number=${number}`);
  },

  // get info statistic posts product from homepage
  statisticHomepage() {
    return Api().get("market/products/s/homepage");
  }
};
