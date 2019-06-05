<template>
  <div class="ct mt_0 mb_5">
    <div class="wrap--name-expect">
      <div class="r m_0">
        <!-- Start: Left Navigation -->
        <div class="c_3 list--problem px_0 pt_5">
          <nav class="navigation" v-if="helpDefault === 1">
            <ul
              v-if="
                categoryChildren.children &&
                  categoryChildren.children.length > 0
              "
            >
              <li
                class="navigation--item"
                v-for="(item, index) in categoryChildren.children"
                :key="`l-${index}`"
                @click="showInfoCategory(item._id)"
              >
                {{ item.title }}
              </li>
            </ul>
            <div v-else>Danh mục đang được nâng cấp</div>
          </nav>
          <nav class="navigation" v-if="helpDefault === 0">
            <ul v-if="allHelpCategories && allHelpCategories.length > 0">
              <li
                class="navigation--item"
                v-for="(cate, index) in allHelpCategories"
                :key="`c-${index}`"
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
          <div class="blog--detail" v-if="helpDefault === 1">
            <h2 class="title--question">{{ getBlogFirstCateChildren.title }}</h2>
            <div class="text" v-html="getBlogFirstCateChildren.content">
              {{ getBlogFirstCateChildren.content }}
            </div>
          </div>

          <div class="blog--detail" v-if="helpDefault === 0">
            <h2 class="title--question">{{ blogDetail.title }}</h2>
            <div class="text" v-html="blogDetail.content">
              {{ blogDetail.content }}
            </div>
          </div>
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
            <nav v-if="helpDefault === 1">
              <ul v-if="getBlogCateChildren && getBlogCateChildren.length > 0">
                <li v-for="(post, index) in getBlogCateChildren" :key="`p-${index}`">
                  <a @click="showDetailBlog(post._id)">{{ post.title }}</a>
                </li>
              </ul>
              <div v-else>Bài viết đang được cập nhật</div>
            </nav>

            <nav v-if="helpDefault === 0">
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
  computed: {
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
    getBlogCateChildren() {
      if (this.categoryChildren === undefined) return;
      return this.categoryChildren.children[0]._blogHelp;
    },
    getBlogFirstCateChildren() {
      if (this.categoryChildren === undefined) return;
      const item = this.categoryChildren.children[0]._blogHelp;
      if( item === undefined ) return;
      return item[0];
    },
    helpDefault() {
      return this.$store.getters.helpDefault;
    },
    helpCategory(){
      if(this.$store.getters.helpCategory === undefined) return;
      return this.$store.getters.helpCategory;
    }
  },
  async created() {
    await this.$store.dispatch("getAllBlog");
    await this.$store.dispatch("getAllCategoriesChildren");
  },
  methods: {
    async showDetailBlog(val) {
      await this.$store.dispatch("getBlogById", val);
      this.$router.push({
        name: "help_detail",
        params: { id: val }
      });
    },
    showInfoCategory(val){
      this.$store.dispatch("getHelpCategoryById", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
