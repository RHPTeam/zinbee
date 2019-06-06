export default {
  data() {
    return {};
  },
  computed: {
    products() {
      return this.$store.getters.allProduct;
    }
  },
  methods: {
    goToUpdate(value) {
      this.$store.dispatch("getInfoProductById", value);
      this.$store.dispatch("setButtonDefault", 0);
      this.$router.push({ name: "product_create" });
    },
    deleteProduct(value) {
      this.$store.dispatch("delete", value);
    },
    goToCreate() {
      this.$store.dispatch("setButtonDefault", 1);
      this.$router.push({ name: "product_create" });
    }
  },
  async created() {
    await this.$store.dispatch("products");
  }
};
