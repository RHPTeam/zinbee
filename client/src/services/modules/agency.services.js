import Api from "@/services";

export default {
  create(data) {
    return Api().post("agency", data);
  },
  index() {
    return Api().get("agency");
  }
};
