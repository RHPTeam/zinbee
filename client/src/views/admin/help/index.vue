<template>
  <div class="help">
    <bread-crumb :breadTitle="breadTitle" :breadDesc="breadDesc" />
    <div class="wrapper">
      <div class="top d_flex align_items_center">
        <div class="categories mr_5">
          <button class="btn btn_light">Thêm danh mục</button>
        </div>
        <div class="blogs">
          <button class="btn bg_primary">Thêm bài viết</button>
        </div>
      </div>
      <div class="body">
        <!-- Start: Choose 5 blogs popular -->
        <multiselect
          multiple
          label="title"
          placeholder="Chọn bài viết ..."
        />
        <!-- End: Choose 5 blogs popular -->
        <!-- Start: Choose categories -->
        <multiselect
          multiple
          label="title"
          placeholder="Chọn danh mục ..."
        />
        <!-- End: Choose categories -->
        <div class="">
          <button class="btn btn_primary">Cập nhật</button>
        </div>
      </div>
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
