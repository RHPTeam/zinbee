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
    async goToUpdate(value) {
      await this.$store.dispatch("setButtonDefault", 0);
      await this.$store.dispatch("getInfoProductById", value);
      this.$router.push({ name: "product_create" });
    },
    deleteProduct(value){
      this.$store.dispatch("delete", value);
    }
  },
  async created() {
    await this.$store.dispatch("products");
  }
};
