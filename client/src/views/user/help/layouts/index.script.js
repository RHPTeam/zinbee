import AppHeader from "./desktop/header";
import AppFooter from "./desktop/footer";

export default {
  data() {
    return {};
  },
  async created() {
    await this.$store.dispatch("getAllCategoriesChildren");
  },
  components: {
    AppHeader,
    AppFooter
  }
};
