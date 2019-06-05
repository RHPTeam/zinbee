import CookieFunction from "@/utils/functions/cookie";
import router from "../../routes";
import store from "../../store";

/** ******************* SECURED ROUTER ************************/
router.beforeEach((to, from, next) => {
  if (
    CookieFunction.getCookie("_sub") &&
    CookieFunction.getCookie("sid") &&
    CookieFunction.getCookie("cfr") === "member" &&
    CookieFunction.getCookie("uid")
  ) {
    window.location = `${CookieFunction.getCookie("_sub")}`;
  } else if (
    CookieFunction.getCookie("_sub") &&
    CookieFunction.getCookie("sid") &&
    CookieFunction.getCookie("cfr") === "member" &&
    CookieFunction.getCookie("uid") &&
    to.path === "/signin"
  ) {
    window.location = `${CookieFunction.getCookie("_sub")}`;
  } else if (
    CookieFunction.getCookie("_sub") &&
    CookieFunction.getCookie("sid") &&
    CookieFunction.getCookie("cfr") === "member" &&
    CookieFunction.getCookie("uid") &&
    to.path === "/signup"
  ) {
    window.location = `${CookieFunction.getCookie("_sub")}`;
  } else if (to.matched.some(record => record.meta.requiredAuth)) {
    if (
      CookieFunction.getCookie("sid") &&
      CookieFunction.getCookie("cfr").toLowerCase() === "member" &&
      CookieFunction.getCookie("uid")
    ) {
      next();
      return;
    }
    next("/admin/signin");
  } else if (to.matched.some(record => record.meta.requiredAdmin)) {
    if (
      CookieFunction.getCookie("sid") &&
      CookieFunction.getCookie("cfr").toLowerCase() === "admin" &&
      CookieFunction.getCookie("uid")
    ) {
      next();
      return;
    } else if (
      CookieFunction.getCookie("sid") &&
      CookieFunction.getCookie("cfr").toLowerCase() === "superadmin" &&
      CookieFunction.getCookie("uid")
    ) {
      next();
      return;
    }
    next("/admin/signin");
  } else if (
    store.getters.mailSender === "" &&
    to.path === "/reset-password/code"
  ) {
    next("/reset-password");
  } else if (
    store.getters.mailSender === "" &&
    to.path === "/reset-password/final"
  ) {
    next("/reset-password");
  } else {
    next();
  }
});
