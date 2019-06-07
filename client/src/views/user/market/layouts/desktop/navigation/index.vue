<template>
  <div class="nav--root r mx_0">
    <div class="ct">
      <ul class="nav--list" data-test-selector="category-menu">
        <li class="nav--item">
          <a class="nav--link">Tất cả</a>
        </li>
        <li
          class="nav--item"
          v-for="(category, index) in currentParentMarketCategory.children"
          :key="index"
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
