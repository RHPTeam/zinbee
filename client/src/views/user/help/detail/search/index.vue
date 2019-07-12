<template>
  <div class="search ct">
    <div class="r">
      <div class="c_3 sidebar">
        <!-- Show categories have level === 1 -->
        <div class="list">
          <div
            class="cate font_weight_bold py_2"
            v-for="(cate, index) in helpCategories"
            :key="index"
            @click="showInfoCategory(cate.slug)"
          >
            {{ cate.title }}
          </div>
        </div>
      </div>
      <div class="c_9 body">
        <div class="top d_flex align_items_center pt_4">
          <div class="tab active mr_3 pb_4">{{ blogs.length }} bài viết</div>
          <div class="tab pb_4">0 câu trả lời từ cộng đồng</div>
        </div>
        <div class="wrap py_4">
          <!-- Start : Show result blog when user search by key -->
          <div v-if="variableControlBlog === 0">
            <div class="text_center" v-if="blogs && blogs.length === 0">
              Không có dữ liệu
            </div>
            <div v-else>
              <div v-if="this.$store.getters.blogHelpStatus === 'loading'">
                <loading-component />
              </div>
              <div
                class="item"
                v-else
                v-for="(blog, index) in blogs"
                :key="index"
              >
                <div class="title" @click="showDetailBlog(blog.slug)">
                  {{ blog.title }}
                </div>
                <div
                  class="desc"
                  v-if="blog.content && blog.content.length > 0"
                >
                  <span v-html="blog.content.slice(0, 150)"></span>
                  <a @click="showDetailBlog(blog.slug)">Xem thêm</a>
                </div>
              </div>
            </div>
          </div>
          <!-- End : Show result blog when user search by key -->

          <!-- Start : Show detail of blog when user click title of blog -->
          <div v-if="variableControlBlog === 1">
            <div class="title">{{ blogDetail.title }}</div>
            <div class="desc" v-html="blogDetail.content"></div>
          </div>
          <!-- End : Show detail of blog when user click title of blog -->

          <!-- Start : Show result blog of category when user click category on sidebar -->
          <div v-if="variableControlBlog === 2">
            <div
              class="text_center"
              v-if="blogHelpCategory && blogHelpCategory.length === 0"
            >
              Không có dữ liệu
            </div>
            <div v-else>
              <div v-if="this.$store.getters.blogHelpStatus === 'loading'">
                <loading-component />
              </div>
              <div v-else>
                <div v-if="blogHelpCategory && blogHelpCategory.length === 1">
                  <div class="title">{{ blogDetail.title }}</div>
                  <div class="desc" v-html="blogDetail.content"></div>
                </div>
                <div
                  v-else
                  class="item"
                  v-for="(blog, index) in blogHelpCategory"
                  :key="index"
                >
                  <div class="title" @click="showDetailBlog(blog.slug)">
                    {{ blog.title }}
                  </div>
                  <div
                    class="desc"
                    v-if="blog.content && blog.content.length > 0"
                  >
                    <span v-html="blog.content.slice(0, 150)"></span>
                    <a @click="showDetailBlog(blog.slug)">Xem thêm</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End : Show result blog of category when user click category on sidebar -->

          <!-- Start: Paginate help-->
          <paginate
            v-if="variableControlBlog === 0"
            :currentPage="currentPage"
          />
          <!-- End: Paginate help-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from "../paginate";
export default {
  components: {
    Paginate
  },
  data() {
    return {
      currentPage: 1,
      infoBlog: false
    };
  },
  computed: {
    blogs() {
      return this.$store.getters.resultSearch;
    },
    helpCategories() {
      return this.$store.getters.cateLevel;
    },
    blogHelpCategory() {
      return this.$store.getters.helpCategory._blogHelp;
    },
    blogDetail() {
      return this.$store.getters.blog;
    },
    variableControlBlog() {
      return this.$store.getters.variableControlBlog;
    }
  },
  async created() {
    let key = this.$route.query.key,
      blogs = this.$store.getters.resultSearch;
    if (key && blogs.length === 0) {
      const dataSender = {
        keyword: key,
        size: 25,
        page: 1
      };
      await this.$store.dispatch("searchBlog", dataSender);
    }
    await this.$store.dispatch("getAllCategoriesChildren");
  },
  methods: {
    async showInfoCategory(val) {
      await this.$store.dispatch("getHelpCategoryBySlug", val);
      await this.$store.dispatch("setVaribleControlBlog", 2);
      this.$router.replace({
        name: "help_result_search",
        query: { cateId: val }
      });
    },
    async showDetailBlog(blog) {
      await this.$store.dispatch("getBlogBySlug", blog);
      await this.$store.dispatch("setVaribleControlBlog", 1);
      this.$router.replace({
        name: "help_result_search",
        query: { blogId: blog }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  .sidebar {
    color: #444444;
    cursor: pointer;
    .list {
      .cate {
        cursor: pointer;
        font-size: 1.25rem;
        text-transform: capitalize;
        padding: 0.5rem 0.75rem;
        color: #4267b2;
        &:hover {
          background: #f7f7f7;
        }
      }
    }
  }
  .body {
    .top {
      border-bottom: 1px solid #e4e4e4;
      .tab {
        cursor: pointer;
        font-weight: 700;
        opacity: 0.5;
      }
      .active {
        border-bottom: 2px solid #0c5460;
        opacity: 1;
      }
    }
    .wrap {
      .title {
        font-weight: 700;
        color: #4267b2;
      }
      .desc {
        /deep/ img {
          width: 100%;
        }
      }
    }
  }
}
</style>
