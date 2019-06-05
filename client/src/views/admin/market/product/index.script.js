export default {
  data() {
    return {};
  },
  computed: {
    products() {
      return this.$store.getters.allProduct;
    }
  },
  async created() {
    await this.$store.dispatch("products");
  }
};
