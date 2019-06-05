<template>
  <div class="help">
    <bread-crumb :breadTitle="breadTitle" :breadDesc="breadDesc" />
    <div class="tab--manage d_flex mb_3">
      <router-link
        :to="{ name: 'manage_product' }"
        class="product text_left btn btn_info mr_3"
        >Quan ly san pham</router-link
      >
      <router-link
        :to="{ name: 'manage_categories' }"
        class="categories text_left btn btn_info"
        >Quan ly danh muc</router-link
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
      breadDesc: "giúp quản lý các bài viết, chien dich trên hệ thống"
    };
  }
};
</script>
<style lang="scss" scoped></style>
