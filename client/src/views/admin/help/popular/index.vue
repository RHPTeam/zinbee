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
      <h4 class="py_3">Chọn 4 danh mục phổ biến nhất</h4>
      <div class="item mb_3">
        <multiselect
          multiple
          label="title"
          placeholder="Chọn danh mục ..."
          :options="allCategories"
          @input="updateCategoryPopular"
          v-model="popularHelp.popular_section"
        />
      </div>
      <!-- End: Choose 5 blogs popular -->
      <!-- Start: Choose categories -->
      <h4 class="py_3">Chọn 5 bài viết phổ biến nhất</h4>
      <div class="item mb_3">
        <multiselect
          multiple
          label="title"
          placeholder="Chọn bài viết ..."
          :options="allBlog"
          @input="updateBlogPopular"
          v-model="popularHelp.popular_blog"
        />
      </div>
      <!-- End: Choose categories -->
      <div class="form_group">
        <button class="btn btn_primary form_control" @click="updatePopularHelp">
          Cập nhật
        </button>
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
    },
    popularHelp() {
      return this.$store.getters.popularHelp;
    },
    contentDefault() {
      if (this.$store.getters.contentDefault === undefined) return;
      return this.$store.getters.contentDefault;
    },
    categoryDefault() {
      if (this.$store.getters.categoryDefault === undefined) return;
      return this.$store.getters.categoryDefault;
    }
  },
  created() {
    this.$store.dispatch("getAllHelpCategories");
  },
  methods: {
    updateBlogPopular(val) {
      const arr = val.map(item => item._id);
      const contentId = arr.splice(-1).toString();
      this.$store.dispatch("setIdContentBlog", contentId);
    },
    updateCategoryPopular(val) {
      const arr = val.map(item => item._id);
      const contentId = arr.splice(-1).toString();
      this.$store.dispatch("setIdCategoryPopular", contentId);
    },
    updatePopularHelp() {
      const dataSender = {
        listContent: this.contentDefault,
        listCategory: this.categoryDefault
      };
      this.$store.dispatch("updatePopularHelp", dataSender);
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
