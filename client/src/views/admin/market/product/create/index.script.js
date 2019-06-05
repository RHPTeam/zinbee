export default {
  data() {
    return {
      isOptionsPost: false,
      isOptionsCapaign: false,
      titleProduct: ""
    };
  },
  computed: {
    categories() {
      let arrCategoriesChildren = [];
      const categories = this.$store.getters.allCategory;
      // console.log("categories");
      // console.log(categories);
      categories.map(item => {
        if (item.level > 0) {
          arrCategoriesChildren.push(item);
        }
      });
    }
  },
  methods: {
    createProduct() {
      const dataCreate = {
        name: this.titleProduct
      };
      this.$store.dispatch("createProduct", dataCreate);
      this.$router.push({ name: "manage_product" });
    },
    showOptionsPost() {
      this.isOptionsPost = true;
      this.isOptionsCapaign = false;
    },
    showOptionsCampaign() {
      this.isOptionsCapaign = true;
      this.isOptionsPost = false;
    }
  },
  async created() {
    await this.$store.dispatch("getcategories");
  }
};
