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
          class="list_group_item list--group-item d_flex align_items_center justify_content_between py_1"
          v-for="(category, index) in categories"
          :key="index"
        >
          <div class="category--name">{{ category.name }}</div>
          <div class="category--total">{{ category.total }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { name: "Ăn uống", total: 15 },
        { name: "Mỹ phẩm", total: 10001 },
        { name: "Du lịch", total: 152472 }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.left--sidebar {
  font-size: 0.875rem;
}
</style>
