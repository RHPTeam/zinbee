<template>
  <div class="popular">
    <div class="top d_flex align_items_center">
      <div class="categories mr_3">
        <router-link
          tag="button"
          class="btn btn_light"
          :to="{ name: 'admin_help' }"
        >
          Danh muc va bai viet duoc chon
        </router-link>
      </div>
      <div class="categories mr_3">
        <router-link
          tag="button"
          :to="{ name: 'admin_categories' }"
          class="btn btn_light"
        >
          Danh mục
        </router-link>
      </div>
      <div class="blogs mr_3">
        <router-link tag="button" :to="{ name: 'blogs' }" class="btn btn_light">
          Bài viết
        </router-link>
      </div>
    </div>
    <div class="header py_3">
      <!-- Start: Choose 5 blogs popular -->
      <div class="item mb_3">
        <multiselect
          multiple
          label="title"
          placeholder="Chọn danh mục ..."
          :options="allCategories"
        />
      </div>
      <!-- End: Choose 5 blogs popular -->
      <!-- Start: Choose categories -->
      <div class="item mb_3">
        <multiselect
          multiple
          label="title"
          placeholder="Chọn bài viết ..."
          :options="allBlog"
        />
      </div>
      <!-- End: Choose categories -->
      <div class="form_group">
        <button class="btn btn_primary form_control">Cập nhật</button>
      </div>
    </div>
    <div class="body">
      <div class="desc">Bài viết được chọn</div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    allCategories() {
      return this.$store.getters.allHelpCategories;
    },
    allBlog() {
      return this.$store.getters.allBlog;
    }
  },
  created() {
    this.$store.dispatch("getAllHelpCategories");
  }
};
</script>
<style lang="scss" scoped>
.popular {
  .header {
    .item {
      border: 1px solid #e4e4e4;
      border-radius: 0.625rem;
    }
  }
  .body {
  }
}
</style>
