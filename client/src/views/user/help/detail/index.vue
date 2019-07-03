<template>
  <div class="ct mt_0 mb_5">
    <div class="wrap--name-expect">
      <div class="r m_0">
        <!-- Start: Left Navigation -->
        <div class="c_3 list--problem px_0 pt_5">
          <nav class="navigation" v-if="helpDefault.left === 1">
            <ul v-if="childrenLevel1 && childrenLevel1.length > 0">
              <li
                class="navigation--item"
                v-for="(item, index) in childrenLevel1"
                :key="`l-${index}`"
                @click="showInfoCategory(item._id)"
              >
                {{ item.title }}
              </li>
            </ul>
            <div v-else>
              <ul v-if="cateLevel && cateLevel.length > 0">
                <li
                  class="navigation--item"
                  v-for="(cate, index) in cateLevel"
                  :key="`c-${index}`"
                  @click="showInfoCategoryDefault(cate._id)"
                >
                  {{ cate.title }}
                </li>
              </ul>
            </div>
          </nav>

          <nav class="navigation" v-if="helpDefault.left === 0">
            <ul v-if="cateLevel && cateLevel.length > 0">
              <li
                class="navigation--item"
                v-for="(cate, index) in cateLevel"
                :key="`c-${index}`"
                @click="showInfoCategoryDefault(cate._id)"
              >
                {{ cate.title }}
              </li>
            </ul>
            <div v-else>Danh mục đang được nâng cấp</div>
          </nav>
        </div>
        <!-- End: Left Navigation -->
        <!-- Start: Content -->
        <div class="c_9 content px_4 pt_5">
          <!-- Start: Blog Detail  -->
          <div class="blog--detail" v-if="helpDefault.right === 1">
            <!-- Start: If category contain 1 blog -->
            <div v-if="blogHelpCategory && blogHelpCategory.length === 0">
              Không có kết quả để hiển thị
            </div>
            <div v-else-if="blogHelpCategory && blogHelpCategory.length === 1">
              <h2 class="title--question">
                {{ blogHelpCategory[0].title }}
              </h2>
              <div class="text" v-html="blogHelpCategory[0].content"></div>
            </div>
            <!-- End: If category contain 1 blog -->
            <!-- Start: If category contain bigger 1 blog -->
            <div v-else>
              <div v-for="(blog, bindex) in blogHelpCategory" :key="bindex">
                <h2
                  class="title--question"
                  @click="showDetailBlogCategory(bindex)"
                >
                  {{ blog.title }}
                </h2>
                <div class="text" v-if="isShowDetailBlog === bindex">
                  {{ blog.content }}
                </div>
              </div>
            </div>
            <!-- End: If category contain bigger 1 blog -->
          </div>

          <div class="blog--detail" v-if="helpDefault.right === 0">
            <h2 class="title--question">{{ blogDetail.title }}</h2>
            <div class="text" v-html="blogDetail.content"></div>
          </div>
          <!-- Start: If info category when choose category in sidebar -->
          <div class="blog--detail" v-if="helpDefault.right === 2">
            <div v-if="blogHelpCategory && blogHelpCategory.length === 0">
              Không có kết quả để hiển thị
            </div>
            <div v-if="blogHelpCategory && blogHelpCategory.length > 1">
              <div v-for="(blog, bindex) in blogHelpCategory" :key="bindex">
                <h2
                  class="title--question"
                  @click="showDetailBlogCategory(bindex)"
                >
                  {{ blog.title }}
                </h2>
                <div
                  class="text"
                  v-if="isShowDetailBlog === bindex"
                  v-html="blog.content"
                ></div>
              </div>
            </div>
            <div v-else>
              <div v-if="blogHelpCategory[0]">
                <h2
                  class="title--question"
                  v-if="
                    blogHelpCategory[0] &&
                      blogHelpCategory[0].title !== undefined
                  "
                >
                  {{ blogHelpCategory[0].title }}
                </h2>
                <div
                  v-if="
                    blogHelpCategory[0] &&
                      blogHelpCategory[0].content !== undefined
                  "
                >
                  <div class="text" v-html="blogHelpCategory[0].content"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- End: If info category when choose category in sidebar -->

          <!-- End: Blog Detail  -->
          <!-- Start: Useful Info-->
          <div class="infor--useful">
            <p>Thông tin này có hữu ích không?</p>
            <label>
              <input type="radio" name="useful" />
              Có
            </label>
            <label>
              <input type="radio" name="useful" />
              Không
            </label>
          </div>
          <!-- End: Useful Info -->
          <!-- Start: Related Blog -->
          <div class="post--correlative">
            <h4>Bài viết có liên quan</h4>
            <nav>
              <ul v-if="sliceAllBlog && sliceAllBlog.length > 0">
                <li v-for="(post, index) in sliceAllBlog" :key="`p-${index}`">
                  <a @click="showDetailBlog(post._id)">{{ post.title }}</a>
                </li>
              </ul>
              <div v-else>Bài viết đang được cập nhật</div>
            </nav>
          </div>
          <!-- End: Related Blog -->
        </div>
        <!-- End: Content -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDetailBlog: null
    };
  },
  computed: {
    cateLevel() {
      return this.$store.getters.cateLevel;
    },
    allHelpCategories() {
      return this.$store.getters.allHelpCategoriesChild;
    },
    blogDetail() {
      return this.$store.getters.blog;
    },
    blogHelpError() {
      return this.$store.getters.blogHelpError;
    },
    allBlog() {
      return this.$store.getters.allBlog;
    },
    sliceAllBlog() {
      if (this.allBlog === undefined) return;
      return this.allBlog.slice(-5);
    },
    categoryChildren() {
      return this.$store.getters.categoryChildren;
    },
    getBlogFirstCateChildren() {
      const blogs = [];
      if (this.categoryChildren.children === undefined) return;
      this.categoryChildren.children.map(item => {
        item._blogHelp.map(blog => {
          blogs.push(blog);
        });
      });
      return blogs;
    },
    helpDefault() {
      return this.$store.getters.helpDefault;
    },
    helpCategory() {
      if (this.$store.getters.helpCategory === undefined) return;
      return this.$store.getters.helpCategory;
    },
    blogHelpCategory() {
      if (this.helpCategory._blogHelp === undefined) return;
      return this.helpCategory._blogHelp;
    },
    cateChildren() {
      return this.$store.getters.cateChildren;
    },
    childrenLevel1() {
      return this.$store.getters.children;
    }
  },
  async created() {
    let post = this.$store.getters.blog,
      id = this.$route.params.id,
      cateParent = this.$route.query.parentId;

    if (post && post.length === 0 && cateParent === undefined) {
      await this.$store.dispatch("getAllCategoriesChildren");
      await this.$store.dispatch("getBlogById", id);
    }
    if (cateParent) {
      await this.$store.dispatch("setHelpDefault", {
        right: 1,
        left: 1
      });
      await this.$store.dispatch("getHelpCategoryById", id);
      await this.$store.dispatch("getHelpCategoryParent", {
        parentId: cateParent
      });
    }
    await this.$store.dispatch("getAllBlog");
  },
  methods: {
    async showDetailBlog(val) {
      this.$store.dispatch("setHelpDefault", {
        left: 0,
        right: 0
      });
      await this.$store.dispatch("getBlogById", val);
    },
    showInfoCategory(val) {
      this.$store.dispatch("setHelpDefault", {
        left: 1,
        right: 2
      });
      this.$store.dispatch("getHelpCategoryById", val);
    },
    showDetailBlogCategory(val) {
      this.isShowDetailBlog = val;
    },
    showInfoCategoryDefault(val) {
      this.$store.dispatch("setHelpDefault", {
        left: 0,
        right: 2
      });
      this.$store.dispatch("getHelpCategoryById", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
