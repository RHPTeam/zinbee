import Api from "@/services";

export default {
  // add to collection
  addToCollection(id) {
    return Api().post(`add/product/user?_id=${id}`);
  }
}