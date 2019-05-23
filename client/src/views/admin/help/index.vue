<template>
  <div class="help">
    <bread-crumb :breadTitle="breadTitle" :breadDesc="breadDesc" />
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
      breadTitle: "Trợ giúp",
      breadDesc:
        "giúp quản lý các bài viết cũng như các câu hỏi thường gặp trên hệ thống"
    };
  }
};
</script>
<style lang="scss" scoped></style>
