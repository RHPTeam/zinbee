<template>
  <div class="popular">
    <div class="top d_flex align_items_center">
      <div class="categories mr_5">
        <router-link
          tag="button"
          :to="{ name: 'admin_categories' }"
          class="btn btn_light"
        >
          Danh mục
        </router-link>
      </div>
      <div class="blogs mr_5">
        <router-link tag="button" :to="{ name: 'blogs' }" class="btn btn_light">
          Bài viết
        </router-link>
      </div>
    </div>
    <div class="header px_4 py_3">
      <!-- Start: Choose 5 blogs popular -->
      <div class="item mb_3">
        <multiselect
          multiple
          label="title"
          placeholder="Chọn bài viết ..."
          :options="allCategories"
        />
      </div>
      <!-- End: Choose 5 blogs popular -->
      <!-- Start: Choose categories -->
      <div class="item mb_3">
        <multiselect
          multiple
          label="title"
          placeholder="Chọn danh mục ..."
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
      return this.$store.getters.allCategories;
    },
    allBlog() {
      return this.$store.getters.allBlog;
    }
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
