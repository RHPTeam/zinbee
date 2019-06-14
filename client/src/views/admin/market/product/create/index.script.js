export default {
  // props: ["showOptionsPost"],
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
    }
  },
  async created() {
    this.$store.dispatch("getcategories");
    this.$store.dispatch("getProductDefault");
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
        summary: this.inforProductById.summary,
        previews: {
          thumbnail: this.inforProductById.previews.thumbnail
        },
        typeProduct: this.inforProductById.typeProduct,
        _category: this.inforProductById._category
      };
      this.$store.dispatch("createProduct", dataCreate);
      this.$router.push({ name: "manage_product" });
    },
    convertProductContent(post) {
      let dataPost = {
        _id: "",
        title: ""
      };
      this.allMarketPosts.map(item => {
        if (item._id === post) {
          dataPost._id = item._id;
          dataPost.title = item.title;
        }
      });
      return dataPost;
    },
    updateProductContent(value) {
      this.inforProductById.content = value._id;
    },
    convertCategoryPost(category) {
      let dataCategory = {
        _id: "",
        name: ""
      };
      this.categories.map(item => {
        if (item._id === category) {
          dataCategory._id = item._id;
          dataCategory.name = item.name;
        }
      });
      return dataCategory;
    },
    updateProductCategory(value) {
      this.inforProductById._category = value._id;
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
      const dataEmit = await this.$store.getters.marketPostPhotosUpload;
      this.inforProductById.previews.thumbnail = dataEmit[0];
    },
    setProductContent(post) {
      this.inforProductById.content = post.id;
    },
    showOptionsPost() {
      this.$store.dispatch("typeProduct", 0);
      this.isOptionsPost = true;
      this.isOptionsCapaign = false;
    },
    showOptionsCampaign() {
      this.$store.dispatch("typeProduct", 1);
      this.isOptionsCapaign = true;
      this.isOptionsPost = false;
    },
    updateProduct() {
      this.$store.dispatch("updateProduct", this.inforProductById);
      this.$router.push({ name: "manage_product" });
    },
    addAttribute() {
      this.$store.dispatch("createAttribute");
    },
    deleteAttribute(index) {
      this.$store.dispatch("deleteAttribute", index);
    }
  }
};
