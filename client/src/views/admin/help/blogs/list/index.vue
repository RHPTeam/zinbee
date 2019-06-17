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
      <div class="header d_flex">
        <div class="title first">Tiêu đề</div>
        <div class="title">Nội dung</div>
        <div class="title">Người tạo</div>
        <div class="title">Hành động</div>
      </div>
      <div v-for="(item, index) in allBlog" :key="index">
        <item :item="item" />
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
