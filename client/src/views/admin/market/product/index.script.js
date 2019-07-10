export default {
  data() {
    return {
      isShowOptionsPost: true
    };
  },
  computed: {
    products() {
      return this.$store.getters.allProduct;
    },
    getTypeProduct() {
      return this.$store.getters.products;
    }
  },
  methods: {
    goToUpdate(value) {
      this.$store.dispatch("getInfoProductById", value);
      this.$store.dispatch("setButtonDefault", 0);
      this.$router.push({ name: "product_create" });
    },
    deleteProduct(value) {
      this.$store.dispatch("deleteProduct", value);
    },
    async goToCreate() {
      await this.$store.dispatch("setPostDefaultMarket");
      await this.$store.dispatch("getProductDefault");
      await this.$store.dispatch("setPostDefaultStatus", 1);
      await this.$store.dispatch("setVariableControl", 0);
      this.$router.push({ name: "market_post_create" });
    }
  },
  async created() {
    await this.$store.dispatch("getProducts");
  }
};
