<template>
  <div class="detail ct">
    <div class="r">
      <!-- Start: sidebar show category-->
      <div class="sidebar c_xl_3 c_lg_3 c_md_3 c_12 pl_0 pr_0 pt_4">
        <div class="item">
          <div class="parent py_2">Quản lý tài khoản</div>
          <div class="child d_flex flex_column">
            <div class="divine mb_2 mt_2"></div>
            <div class="child--item py_2 d_flex align_items_center">
              <div class="left mr_3"></div>
              Mật khẩu
            </div>
            <div class="child--item py_2 d_flex align_items_center">
              <div class="left mr_3"></div>
              Mật khẩu
            </div>
            <div class="divine mb_2 mt_2"></div>
          </div>
        </div>
      </div>
      <!-- End: sidebar show category-->
      <!-- Start: blog detail -->
      <div class="right c_xl_9 c_lg_9 c_md_9 c_12">
        <div class="body p_3">
          <div>
            <div class="post py_2" v-if="blogDetail">
              <div
                class="introduce"
                v-if="blogDetail.label && blogDetail.label.length > 0"
              >
                <label>{{ blogDetail.label }}</label>
              </div>
              <div
                class="introduce--img"
                v-if="blogDetail.icon && blogDetail.icon.length > 0"
                :style="{ backgroundImage: 'url(' + blogDetail.icon + ')' }"
              ></div>
              <h2 class="title">{{ blogDetail.title }}</h2>
              <div class="desc pb_3" v-html="blogDetail.content"></div>
            </div>
            <div v-else>Không có dữ liệu bài viết</div>
          </div>
          <!-- Start: Show blogs on category -->
          <div class="posts d_none py_2">
            <div class="top d_flex align_items_center justify_content_between">
              <h4 class="title">Lorem ipsum dolor sit amet, consectetur.</h4>
              <div class="icon">
                <icon-base
                  icon-name="xem thêm"
                  width="20"
                  height="20"
                  viewBox="0 0 150 150"
                >
                  <icon-arrow-down />
                </icon-base>
              </div>
            </div>
            <div class="desc pb_3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              consequuntur iure iusto modi perferendis. Accusantium at, atque
              consectetur consequuntur dicta eos esse et hic impedit ipsum
              magnam magni maxime modi nam neque nesciunt omnis optio placeat
              porro praesentium provident quas recusandae reiciendis saepe
              tempore veniam voluptas voluptatibus. Error perspiciatis, sit!
            </div>
          </div>
          <!-- End: Show blogs on category -->
        </div>
        <!-- Start: Blog and categories introduce -->
        <div class="footer mb_4">
          <div
            class="more p_3"
            v-if="blogDetail.popularBlog && blogDetail.popularBlog.length > 0"
          >
            <h3 class="mb_4">Bài viết phổ biến đến chủ đề này</h3>

            <div
              class="more--item"
              v-for="(blog, index) in blogDetail.popularBlog"
              :key="`b-${index}`"
              @click="detailPopularBlog(blog)"
            >
              {{ blog.title }}
            </div>
          </div>
          <div
            v-if="
              blogDetail.popularCategory &&
                blogDetail.popularCategory.length > 0
            "
          >
            <h3 class="p_3">Chủ đề liên quan</h3>
            <div class="r theme px_4">
              <div
                class="c_4 card p_4 d_flex flex_column align_items_center justify_content_center"
                v-for="(cate, index) in blogDetail.popularCategory"
                :key="`c-${index}`"
              >
                <div
                  class="theme--img"
                  :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
                ></div>
                <div class="content">
                  <h5 class="describe mb_1">Giới thiệu</h5>
                  <h5 class="title mb_2">{{ cate.title }}</h5>
                  <div class="theme--desc">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ab, eos.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Blog and categories introduce -->
      </div>
      <!-- End: blog detail -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      srcDefault:
        "http://thuvienanhdep.net/wp-content/uploads/2015/11/nhung-hinh-anh-dep-de-thuong-va-dang-yeu-cua-dong-vat-trong-cuoc-song-9.jpg"
    };
  },
  computed: {
    blogDetail() {
      return this.$store.getters.blog;
    },
    categories() {
      return this.$store.getters.allHelpCategories;
    }
  },
  async created() {
    const slug = this.$route.params.slug,
      blog = this.$store.getters.blog;
    // Check slug in router and blog on store
    if (slug && blog && blog.length === 0) {
      await this.$store.dispatch("getBlogBySlug", slug);
    }

    await this.$store.dispatch("getAllHelpCategories");
  },
  methods: {
    detailPopularBlog(val) {
      this.$store.dispatch("getBlogBySlug", val.slug);
      // Replace params in router
      this.$router.replace({ params: { slug: val.slug } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
