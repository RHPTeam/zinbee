<template>
  <div class="help">
    <bread-crumb :breadTitle="breadTitle" :breadDesc="breadDesc" />
    <div class="tab--manage d_flex mb_3">
      <router-link
        :to="{ name: 'manage_product' }"
        class="product text_left btn btn--active mr_3"
        >Quản lý sản phẩm</router-link
      >
      <router-link
        :to="{ name: 'manage_categories' }"
        class="categories text_left btn btn--active mr_3"
        >Quản lý danh mục</router-link
      >
      <router-link
        :to="{ name: 'market_post' }"
        class="categories text_left btn btn--active mr_3"
        >Bài viết mẫu</router-link
      >
    </div>
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>
<script type="text/javascript">
import BreadCrumb from "../layout/desktop/breadcrumb";
export default {
  components: {
    BreadCrumb
  },
  data() {
    return {
      breadTitle: "Quản lý market",
      breadDesc: "Giúp quản lý các bài viết, chiến dịch trên hệ thống"
    };
  }
};
</script>
<style lang="scss" scoped>
  @import "./index.style";
</style>
