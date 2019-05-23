<template>
  <div class="help">
    <bread-crumb :breadTitle="breadTitle" :breadDesc="breadDesc" />
    <div class="wrapper">
      <div class="top d_flex align_items_center">
        <div class="categories mr_5">
          <router-link
            tag="button"
            :to="{ name: 'admin_categories' }"
            class="btn btn_light"
          >
            Thêm danh mục
          </router-link>
        </div>
        <div class="blogs">
          <router-link
            tag="button"
            class="btn bg_primary"
            :to="{ name: 'admin_blogs' }"
          >
            Thêm bài viết
          </router-link>
        </div>
      </div>
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
      breadTitle: "Trợ giúp",
      breadDesc:
        "giúp quản lý các bài viết cũng như các câu hỏi thường gặp trên hệ thống"
    };
  }
};
</script>
<style lang="scss" scoped></style>
