export default {
  data() {
    return {
      nameCategory: "",
      parent: "",
      isUpdateCategory: false,
      isCreateCategory: true,
      categoryUpdate: {}
    };
  },
  computed: {
    categories() {
      return this.$store.getters.allCategory;
    },
    nameParent() {
      let arr = {
        _id: "",
        name: ""
      };
      const categories = this.$store.getters.allCategory;
      categories.map(category => {
        if (category._id === this.categoryUpdate.parent) {
          (arr._id = category._id), (arr.name = category.name);
        }
      });
      return arr;
    }
  },
  methods: {
    // create
    create() {
      const dataSender = {
        name: this.nameCategory,
        parent: this.parent._id
      };
      this.$store.dispatch("createCategory", dataSender);
    },
    actionUpdate(content) {
      this.isUpdateCategory = true;
      this.isCreateCategory = false;
      this.categoryUpdate = content;
    },
    updateCategory() {
      this.isUpdateCategory = false;
      this.isCreateCategory = true;
      const dataSender = {
        _id: this.categoryUpdate._id,
        parent: this.nameParent._id,
        name: this.categoryUpdate.name
      };
      this.$store.dispatch("updateCategory", dataSender);
    },
    // dalete
    deleteCategory(value) {
      const dataSender = {
        _id: value._id
      };
      this.$store.dispatch("deleteCategory", dataSender);
    },

    // update
    updateParentCategory(value) {
      this.categoryUpdate.parent = value._id;
    },

    // parent
    getNameParent(content) {
      let arr = {
        nameParentCate: ""
      };
      const categories = this.$store.getters.allCategory;
      categories.map(item => {
        if (item._id === content) {
          arr.nameParentCate = item.name;
        }
      });
      return arr.nameParentCate;
    }
  },
  async created() {
    await this.$store.dispatch("getcategories");
  }
};
