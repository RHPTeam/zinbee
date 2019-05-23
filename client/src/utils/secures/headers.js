import Vue from "vue";
import request from "axios";
import CookieFunction from "@/utils/functions/cookie";

Vue.config.productionTip = false;
Vue.prototype.$http = request;

const token = CookieFunction.getCookie( "sid" ),
  cfr = CookieFunction.getCookie( "cfr" );

if ( token && cfr ) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
  Vue.prototype.$http.defaults.headers.common.cfr = cfr;
}
