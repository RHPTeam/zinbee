import AppHeader from "./desktop/header";
import AppFooter from "./desktop/footer";

export default {
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    AppHeader,
    AppFooter
  }
};
