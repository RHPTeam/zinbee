<template>
  <div class="popular">
    <div class="top d_flex align_items_center">
      <div class="categories mr_3">
        <router-link
          tag="button"
          class="btn btn_light"
          :to="{ name: 'admin_help' }"
        >
          Tùy chỉnh trang chủ
        </router-link>
      </div>
      <div class="categories mr_3">
        <router-link
          tag="button"
          :to="{ name: 'admin_help_categories' }"
          class="btn btn_light"
        >
          Danh mục
        </router-link>
      </div>
      <div class="blogs mr_3">
        <router-link
          tag="button"
          :to="{ name: 'admin_help_blogs' }"
          class="btn btn_light"
        >
          Bài viết
        </router-link>
      </div>
    </div>
    <div class="header py_3">
      <!-- Start: Choose 5 blogs popular -->
      <!--      <h4 class="py_3">Chọn 4 danh mục phổ biến nhất</h4>-->
      <!--      <div class="item mb_3">-->
      <!--        <multiselect-->
      <!--          multiple-->
      <!--          label="title"-->
      <!--          placeholder="Chọn danh mục ..."-->
      <!--          :options="allCategories"-->
      <!--          @input="updateCategoryPopular"-->
      <!--          v-model="popularHelp.popular_section"-->
      <!--        />-->
      <!--      </div>-->
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
      <div class="show">
        <!--        <h4 class="desc py_2">Danh mục được chọn</h4>-->
        <!--        <div-->
        <!--          class="popular&#45;&#45;section"-->
        <!--          v-if="-->
        <!--            popularHelp.popular_section &&-->
        <!--              popularHelp.popular_section.length > 0-->
        <!--          "-->
        <!--        >-->
        <!--          <div-->
        <!--            class="item d_flex align_items_center justify_content_between"-->
        <!--            v-for="(item, index) in popularHelp.popular_section"-->
        <!--            :key="index"-->
        <!--          >-->
        <!--            <div>-->
        <!--              <span class="mr_3">{{ index + 1 }}</span-->
        <!--              >{{ item.title }}-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->

        <h4 class="desc py_2">Bài viết được chọn</h4>
        <div
          class="popular--blog"
          v-if="popularHelp.popular_blog && popularHelp.popular_blog.length > 0"
        >
          <div
            class="item d_flex align_items_center justify_content_between"
            v-for="(blog, index) in popularHelp.popular_blog"
            :key="index"
          >
            <div>
              <span class="mr_3">{{ index + 1 }}</span
              >{{ blog.title }}
            </div>
          </div>
        </div>
      </div>
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
      const contentId = [...new Set(arr)];
      this.$store.dispatch("setIdContentBlog", contentId);
    },
    updateCategoryPopular(val) {
      const arr = val.map(item => item._id);
      const contentId = [...new Set(arr)];
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
