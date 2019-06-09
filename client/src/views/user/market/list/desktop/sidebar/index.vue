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
        <!--  <li
          class="list_group_item list--group-item d_flex align_items_center justify_content_between py_1"
          v-for="(category, index) in categoryChild"
          :key="index"
        >
          <div class="category--name">{{ category.name }}</div>
        </li> -->
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
    // categoryChild() {
    //   this.$store.getters.allCategory.map(item => {
    //     if (item.level > 0) {
    //       this.categories.push(item);
    //     }
    //   });
    //   return this.categories;
    // }
  },
  methods: {
    closeFilterSidebar() {
      this.isShowFilter = true;
    },
    chooseCategory(category) {
      this.$store.dispatch("currentParentMarketCategory", category);
    }
  },
  created() {
    if (this.categoryChild.length > 0) {
      return;
    } else {
      this.$store.dispatch("getcategories");
    }
  }
};
</script>

<style scoped lang="scss"></style>
