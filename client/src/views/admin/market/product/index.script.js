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
      // console.log("value");
      // console.log(value);
      this.$store.dispatch("getInfoProductById", value);
      this.$store.dispatch("setButtonDefault", 0);
      this.$router.push({ name: "product_create" });
    },
    deleteProduct(value) {
      this.$store.dispatch("deleteProduct", value);
    },
    goToCreate() {
      this.$store.dispatch("setButtonDefault", 1);
      this.$router.push({ name: "product_create" });
    }
  },
  async created() {
    await this.$store.dispatch("getProducts");
  }
};
