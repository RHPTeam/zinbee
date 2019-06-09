<template>
  <div class="left--sidebar p_3">
    <div class="categories">
      <div class="title d_flex align_items_center justify_content_between">
        <div class="text font_weight_bold mb_2">Danh mục</div>
        <div class="icon">
          <icon-base viewBox="0 0 240 240">
            <icon-arrow-down></icon-arrow-down>
          </icon-base>
        </div>
      </div>
      <ul class="list_group list--group pl_0">
         <li
          class="list_group_item list--group-item d_flex align_items_center justify_content_between py_1 category--name"
          v-for="(category, index) in currentParentMarketCategory.children"
          :key="index"
          @click.prevent="loadProductByCategory(category._id)"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      isShowFilter: false
    };
  },
  computed: {    
    currentParentMarketCategory() {
      return this.$store.getters.currentParentMarketCategory;
    }
  },
  methods: {
    closeFilterSidebar() {
      this.isShowFilter = true;
    },
    chooseCategory(category) {
      this.$store.dispatch("currentParentMarketCategory", category);
    },
    async loadProductByCategory(categoryId) {
      await this.$store.dispatch("getProductsByCategory", categoryId);
      this.$router.push({
        name: "market_list",
        params: {
          categoryParent: this.currentParentMarketCategory._id,
          subCategory: categoryId
        }
      });
    }
  },
  async created() {
    // this.$store.dispatch("getCategoryChild");
    await this.$store.dispatch("getAllMarketCategoriesTree");
  }
};
</script>

<style scoped lang="scss">
.category--name{
  cursor: pointer;
  transition: 0.4s;
  &:hover{
    padding-left: 5px;
    color: #fff;
    background: #ffb94a;
  }
}
</style>
