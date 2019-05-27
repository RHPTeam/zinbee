import Vue from "vue";
import request from "axios";
import CookieFunction from "@/utils/functions/cookie";

Vue.config.productionTip = false;
Vue.prototype.$http = request;

const token = `sid=${CookieFunction.getCookie(
  "sid"
)}; uid=${CookieFunction.getCookie("uid")}; cfr=${CookieFunction.getCookie(
  "cfr"
)}`;
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}
