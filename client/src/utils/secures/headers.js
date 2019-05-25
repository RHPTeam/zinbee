import Vue from "vue";
import request from "axios";
import CookieFunction from "@/utils/functions/cookie";

Vue.config.productionTip = false;
Vue.prototype.$http = request;

const token = CookieFunction.getCookie("sid"),
  cfr = CookieFunction.getCookie("cfr"),
  uid = CookieFunction.getCookie("uid");
if (token && cfr && uid) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
  Vue.prototype.$http.defaults.headers.common.cfr = cfr;
  Vue.prototype.$http.defaults.headers.common.uid = uid;
}
