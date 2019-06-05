import Api from "@/services";

export default {
  index() {
    return Api().get("help");
  },
  update(content) {
    return Api().patch("help", content);
  }
};
