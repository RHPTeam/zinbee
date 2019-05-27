<template>
  <div class="list">
    <div class="top d_flex align_items_center">
      <router-link tag="a" class="left link" :to="{ name: 'admin_help' }">
        Quay lại
      </router-link>
      <router-link tag="a" class="right link" :to="{ name: 'blogs_new' }">
        Tạo mới
      </router-link>
    </div>
    <div class="body mt_4">
      <div class="table-container" role="table" aria-label="Destinations">
        <div class="flex-table header" role="rowgroup">
          <div class="flex-row first" role="columnheader">Tiêu đề</div>
          <div class="flex-row" role="columnheader">Nội dung</div>
          <div class="flex-row" role="columnheader">Người tạo</div>
          <div class="flex-row" role="columnheader">Hành động</div>
        </div>
        <div v-for="(item, index) in allBlog" :key="index">
          <item :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./item";
export default {
  components: {
    Item
  },
  computed: {
    allBlog() {
      return this.$store.getters.allBlog;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
