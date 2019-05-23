/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get();
  },
  signIn(user) {
    return Api().post("/signin/bz", user);
  },
  signUp(user) {
    return Api().post("/signup/bz", user, {
      headers: {
        token: user.code
      }
    });
  },
  getAllUser() {
    return Api().get("users");
  },
  getUserById(id) {
    return Api().get(`users?_id=${id}`);
  }
};
