import AppHeader from "./desktop/header";
import AppSidebar from "./desktop/sidebar";

export default {
  data() {
    return {
      statusNetwork: true,
    };
  },
  created() {
    this.$store.dispatch("getUserInfo");
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    AppHeader,
    AppSidebar
  }
};
