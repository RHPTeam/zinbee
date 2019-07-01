<template>
  <div class="nav--root r mx_0">
    <div class="ct">
      <ul class="nav--list" data-test-selector="category-menu">
        <li class="nav--item">
          <a class="nav--link" @click.prevent="goToHome">Tất cả</a>
        </li>
        <li class="nav--item" v-if="!currentParentMarketCategory.children"></li>
        <li
          v-else
          class="nav--item"
          v-for="(category,
          index) in currentParentMarketCategory.children.slice(0, 7)"
          :key="index"
          @click.prevent="loadProductByCategory(category._id)"
        >
          <a class="nav--link">{{ category.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentParentMarketCategory() {
      return this.$store.getters.currentParentMarketCategory;
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ name: "market_home" });
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
  }
};
</script>

<style scoped lang="scss">
.nav--root {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e1e8ed;
  height: 48px;
  .nav--list {
    font-size: 0.875rem;
    float: left;
    list-style: none;
    padding: 7px 0 0;
    margin: 0;
    .nav--item {
      float: left;
      position: relative;
      &:hover .nav--link {
        background-color: hsl(0, 0%, 60%);
        color: hsl(0, 0%, 100%);
        cursor: pointer;
      }
    }
    .nav--link {
      border-radius: 0.25rem;
      color: hsl(0, 0%, 40%);
      display: block;
      padding: 0 10px;
      white-space: nowrap;
      line-height: 35px;
      height: 35px;
      text-decoration: none;
    }
  }
}
</style>
