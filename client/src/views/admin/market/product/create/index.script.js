export default {
  data() {
    return {
      isOptionsPost: false,
      isOptionsCapaign: false,
      isShowNodeUpdate: false
    };
  },
  computed: {
    categories() {
      let arrCategoriesChildren = [];
      const categories = this.$store.getters.allCategory;
      categories.map(item => {
        if (item.level === 1) {
          arrCategoriesChildren.push(item);
        }
      });
      return arrCategoriesChildren;
    },
    inforProductById() {
      return this.$store.getters.product;
    },
    getProductDefault() {
      return this.$store.dispatch("getProductDefault");
    },
    nodeUpdate() {
      return this.$store.getters.nodeUpdate;
    }
  },
  methods: {
    createProduct() {
      const dataCreate = {
        name: this.inforProductById.name,
        priceCents: this.inforProductById.priceCents,
        attributes: this.inforProductById.attributes,
        description: this.inforProductById.description,
        tags: this.inforProductById.tags,
        updatedAt: this.inforProductById.updatedAt,
        content: this.inforProductById.content
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
    },
    updateProduct() {
      this.$store.dispatch("updateProduct", this.inforProductById);
      this.$router.push({ name: "manage_product" });
    },
    addAttribute() {
      this.$store.dispatch("createAttr");
    }
  },
  created() {
    this.$store.dispatch("getcategories");
    this.$store.dispatch("getProductDefault");
  }
};
