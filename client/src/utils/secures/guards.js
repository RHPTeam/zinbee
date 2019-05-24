import CookieFunction from "@/utils/functions/cookie";
import SecureFunction from "@/utils/functions/decode";
import router from "../../routes";
import store from "../../store";

/** ******************* SECURED ROUTER ************************/
router.beforeEach((to, from, next) => {
  if (CookieFunction.getCookie("sid") && to.path === "/signin") {
    next("/");
  } else if (CookieFunction.getCookie("sid") && to.path === "/signup") {
    next("/");
  } else if (to.matched.some(record => record.meta.requiredAuth)) {
    if (store.getters.isLoggedIn || CookieFunction.getCookie("sid")) {
      next();
      return;
    }
    next("/signin");
  } else if (to.matched.some(record => record.meta.requiredAdmin)) {
    if (
      parseInt(
        SecureFunction.decodeRole(CookieFunction.getCookie("cfr"), 10)
      ) === 1 ||
      parseInt(
        SecureFunction.decodeRole(CookieFunction.getCookie("cfr"), 10)
      ) === 2
    ) {
      next();
      return;
    }
    next("/");
  } else if (
    store.getters.mailSender === "" &&
    to.path === "/reset-password/step-2"
  ) {
    next("/reset-password");
  } else if (
    store.getters.mailSender === "" &&
    to.path === "/reset-password/step-3"
  ) {
    next("/reset-password");
  } else {
    next();
  }
});
