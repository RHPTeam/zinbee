/* eslint-disable new-cap */
import Api from "@/services";

export default {
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
  signInByUser(user) {
    return Api().post("/signin", user);
  },
  signUpByUser(user) {
    return Api().post("/signup", user);
  },
  getAllUser() {
    return Api().get("users");
  },
  getUserById(id) {
    return Api().get(`users?_id=${id}`);
  },
  getRole() {
    return Api().get("roles");
  },
  renewById(data) {
    return Api().post("users/renew/id", data);
  },
  renewByCode(data) {
    return Api().post("users/renew/code", data);
  },
  changeStatus(id) {
    return Api().post("users/status", id);
  }
};
