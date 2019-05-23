<template>
  <div class="list--category" :data-theme="currentTheme">
    <div class="add--catagory">
      <router-link
        class="add--catagory btn btn_warning"
        tag="button"
        :to="{ name: 'add_catagory' }"
        active-class="active"
        exact
        >Thêm danh mục</router-link
      >
    </div>
    <div class="card card_body mt_2 list--card-category">
      <div class="title--list">List Categories</div>
      <app-tree :tree-data="getCategoryTable" />
    </div>
  </div>
</template>

<script>
import AppTree from "./components/tree";
export default {
  components: {
    AppTree
  },
  data() {
    return {
      treeCategories: []
    };
  },
  computed: {
    getCategoryTable() {
      this.handleMegaCategories(this.$store.getters.getCateAdmin);
      return this.treeCategories;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    handleMegaCategories(categories, parent = undefined) {
      categories.map((category, index) => {
        if (category.parent == parent) {
          this.treeCategories.push({
            _id: category._id,
            title: category.title,
            children: []
          });

          categories.splice(index, 1);
          this.handleMegaCategories(categories, category.parent);
        } else {
          this.treeCategories.map((categoriesParent, i) => {
            if (categoriesParent._id == category.parent) {
              categoriesParent.children.push({
                _id: category._id,
                title: category.title,
                children: []
              });
              categories.splice(i, 1);
              this.handleMegaCategories(categories, categoriesParent.parent);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.add--catagory {
  border-radius: 20px;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  color: #fff;
}
.parent {
  font-size: 16px;
}
.children {
  font-size: 14px;
}
.list--category[data-theme="dark"] {
  .list--card-category {
    background: #27292d;
  }
}
</style>
