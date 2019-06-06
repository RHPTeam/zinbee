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
    },
    allMarketPosts() {
      return this.$store.getters.allMarketPosts;
    },
    allMarketPostOptions() {
      let res = [];
      this.allMarketPosts.forEach(item => {
        res.push({
          id: item._id,
          name: item.title
        });
      });
      return res;
    }
  },
  async created() {
    this.$store.dispatch("getcategories");
    this.$store.dispatch("getProductDefault");
    this.$store.dispatch("createAttr");
    this.$store.dispatch("getAllMarketPosts");
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
        content: this.inforProductById.content,
        summary: this.inforProductById.summary
      };
      this.$store.dispatch("createProduct", dataCreate);
      this.$router.push({ name: "manage_product" });
    },
    selectFile() {
      this.file = this.$refs.file.files;
      this.sendFile();

      // reset ref
      const input = this.$refs.file;
      input.type = "text";
      input.type = "file";
    },
    async sendFile() {
      const formData = new FormData();
      Array.from(this.file).forEach(file => {
        formData.append("photos", file);
      });

      await this.$store.dispatch("uploadMarketPostPhotos", formData);
      const dataEmit = this.$store.getters.marketPostPhotosUpload;
      this.inforProductById.previews.thumbnail = dataEmit[0];
    },
    setProductContent(post) {
      this.inforProductById.content = post.id;
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
    }
  }
};
