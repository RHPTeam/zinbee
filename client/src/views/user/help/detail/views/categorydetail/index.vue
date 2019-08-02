<template>
  <div class="">
    <!-- Start: Category Introduce -->
    <div class="section introduce py_2">
      <div class="introduce--label">
        {{ category.label }}
      </div>
      <div
        class="introduce--img"
        :style="{ backgroundImage: 'url(' + category.icon + ')' }"
      ></div>
      <h2 class="title">{{ category.title }}</h2>
      <div class="content" v-html="category.content"></div>
      <hr class="line" />
    </div>
    <!-- End: Category Introduce -->
    <!-- Start: Popular Blog -->
    <div class="section popular--blog" v-if="category.popularBlog.length > 0">
      <h3 class="title mb_4">Bài viết phổ biến đến chủ đề này</h3>
      <div class="list--group">
        <div
          class="list--group-item"
          v-for="(blog, index) in category.popularBlog"
          :key="index"
        >
          <router-link
            class="link"
            :to="{
              name: 'help_detail',
              params: { id: blog._id },
              query: { type: 'hc_blog' }
            }"
            @click.native="showBlogDetail(blog._id)"
          >
            {{ blog.title }}
          </router-link>
        </div>
      </div>
    </div>
    <!-- End: Popular Blog -->
    <!-- Start: Related Categories -->
    <div
      class="section related--categories"
      v-if="category.relatedCategory.length > 0"
    >
      <h3 class="title">Chủ đề liên quan</h3>
      <div class="r cards mx_0">
        <div
          class="c_4 card p_4 d_flex flex_column align_items_center justify_content_center"
          v-for="(item, index) in category.relatedCategory"
          :key="`c-${index}`"
        >
          <router-link
            class="card--link"
            :to="{
              name: 'help_detail',
              params: { id: item._id },
              query: { type: 'hc_global_nav' }
            }"
            @click.native="showRelatedCategory(item._id)"
          >
            <div
              class="card--img mx_auto"
              :style="{ backgroundImage: 'url(' + item.icon + ')' }"
            ></div>
            <div class="content">
              <h5 class="describe mb_1">{{ item.label }}</h5>
              <h5 class="card--title mb_2">{{ item.title }}</h5>
              <div class="card--desc">
                {{ item.description }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- End: Related Categories -->
  </div>
</template>

<script>
export default {
  props: ["category"],
  methods: {
    async showBlogDetail(blogId) {
      await this.$store.dispatch("getBlogById", blogId);
      await this.$store.dispatch("setHelpDetailViewActive", 3);
      this.$router.push({
        name: "help_detail",
        params: { id: blogId },
        query: {
          type: "hc_blog"
        }
      });
    },
    async showRelatedCategory(categoryId) {
      await this.$store.dispatch("getCurrentHelpCategory", {
        id: categoryId,
        type: "hc_global_nav"
      });
      if (this.$store.getters.currentHelpCategory._blogHelp.length === 0) {
        await this.$store.dispatch("setHelpDetailViewActive", 1);
      } else {
        await this.$store.dispatch("setHelpDetailViewActive", 2);
      }
      this.$router.push({
        name: "help_detail",
        params: {
          id: categoryId
        },
        query: {
          type: "hc_global_nav"
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
