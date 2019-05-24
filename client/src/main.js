import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";

import "@/utils/interfaces/components";
import "@/utils/secures/headers";
import "@/utils/secures/guards";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
