import StringFunction from "@/utils/functions/string";
export default {
  props: {
    currentTheme: String,
    isDefault: Boolean
  },
  computed: {
    categories() {
      return this.$store.getters.allHelpCategories;
    },
    category() {
      return this.$store.getters.helpCategory;
    },
    blogList() {
      return this.$store.getters.allBlog;
    },
    variableControl() {
      return this.$store.getters.variableControlCate;
    }
  },
  async created() {
    const variableControl = this.$store.getters.variableControlCate;
    if (variableControl === 0) {
      await this.$store.dispatch("getHelpCategoryDefault");
    }
    await this.$store.dispatch("getAllHelpCategories");
    await this.$store.dispatch("getAllBlog");
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    createCategory() {
      const convertTitle = StringFunction.convertUnicode(this.category.title);
      this.category.slug = StringFunction.convertToSlug(convertTitle);

      this.$store.dispatch("createHelpCategory", this.category);
      this.close();
    },
    updateCategory(){
      this.$store.dispatch("updateHelpCategory", this.category);
      this.close();
    },
    handleBlogList(value) {
      this.category._blogHelp = value;
    },
    handleCategoryParent(value) {
      this.category.parent = value;
    }
  }
};
