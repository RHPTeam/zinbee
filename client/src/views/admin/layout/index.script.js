import AppHeader from "./desktop/header";
import AppSidebar from "./desktop/sidebar";
import AppNotification from "./desktop/notification";

import CookieFunction from "@/utils/functions/cookie";

export default {
  data() {
    return {
      statusNetwork: true,
      timer: "",
      interval: null
    };
  },
  created() {
    this.startUpdateTimer();
    this.$store.dispatch("getUserInfo");

    // Check Login
    this.setCheckLogin();

    // Update FB Pages & Group
    this.$store.dispatch("updateFacebookGroups");
    this.$store.dispatch("updateFacebookPages");
  },
  beforeDestroy() {
    this.stopUpdateTimer();
    clearInterval(this.interval);
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    setTimer() {
      this.timer = new Date(Date.now());
    },
    startUpdateTimer() {
      this.timer = setInterval(this.setTimer, 1000);
    },
    stopUpdateTimer() {
      clearInterval(this.timer);
    },
    setCheckLogin() {
      this.interval = setInterval(
        () => this.$socket.emit("check_login", CookieFunction.getCookie("uid")),
        5000
      );
    }
  },
  watch: {
    timer(value) {
      if (!value) {
        return;
      }
      if (typeof value === "number") {
        return;
      }
      if (parseInt(value.getHours()) > 5 && parseInt(value.getHours()) < 18) {
        this.$store.dispatch("changeThemeName", "light");
      } else if (
        (parseInt(value.getHours()) >= 18 &&
          parseInt(value.getHours()) <= 23) ||
        (parseInt(value.getHours()) >= 0 && parseInt(value.getHours()) <= 5)
      ) {
        this.$store.dispatch("changeThemeName", "dark");
      }
    }
  },
  sockets: {
    async statusAccount(value) {
      if (value === 405) {
        this.$store.dispatch("getAllAccountFb");
      } else if (value === 404) {
        this.statusNetwork = false;
      }
    }
  },
  components: {
    AppHeader,
    AppSidebar,
    AppNotification
  }
};
