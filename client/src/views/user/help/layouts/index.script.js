import AppHeader from "./desktop/header";
import AppFooter from "./desktop/footer";

export default {
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    cateParent() {
      return this.$store.getters.parentCate;
    },
    cateLevel2() {
      return this.$store.getters.cateLevel2;
    },
    cateChildren() {
      return this.$store.getters.cateChildren;
    }
  },
  async created() {
    await this.$store.dispatch("getAllCategoriesChildren");
  },
  components: {
    AppHeader,
    AppFooter
  }
};
