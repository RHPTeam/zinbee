<template>
  <div class="wrapper ct">
    <div class="r mx_0 mb_5">
      <!-- Start: Sidebar-->
      <div class="sidebar c_xl_3 c_lg_3 c_md_3 c_12 pl_0 pr_0 pt_4">
        <app-sidebar :categories="helpMegaMenu"></app-sidebar>
      </div>
      <!-- End: Sidebar-->
      <!-- Start: Main -->
      <div class="main c_xl_9 c_lg_9 c_md_9 c_12">
        <div class="p_4">
          <!-- Start: Category Detail -->
          <category-detail
            v-if="helpDetailViewActive === 1"
            :category="currentHelpCategory"
          ></category-detail>
          <!-- End: Category Detail -->
          <!-- Start: Blog List -->
          <blog-list
            v-if="helpDetailViewActive === 2"
            :category="currentHelpCategory"
          ></blog-list>
          <!-- End: Blog List -->
          <!-- Start: Blog Detail -->
          <blog-detail
            v-if="helpDetailViewActive === 3"
            :blog="currentHelpBlog"
          ></blog-detail>
          <!-- End: Blog Detail -->
        </div>
      </div>
      <!-- End: Main -->
    </div>
  </div>
</template>

<script>
import AppSidebar from "./sidebar";
import BlogDetail from "./views/blogdetail";
import BlogList from "./views/blogslist";
import CategoryDetail from "./views/categorydetail";

export default {
  components: {
    AppSidebar,
    BlogDetail,
    BlogList,
    CategoryDetail
  },
  data() {
    return {
      srcDefault:
        "http://thuvienanhdep.net/wp-content/uploads/2015/11/nhung-hinh-anh-dep-de-thuong-va-dang-yeu-cua-dong-vat-trong-cuoc-song-9.jpg"
    };
  },
  computed: {
    currentHelpBlog() {
      return this.$store.getters.blog;
    },
    currentHelpCategory() {
      return this.$store.getters.currentHelpCategory;
    },
    helpDetailViewActive() {
      return this.$store.getters.helpDetailViewActive;
    },
    helpMegaMenu() {
      return this.$store.getters.helpMegaMenu;
    }
  },
  watch: {
    $route() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const id = this.$route.params.id,
        type = this.$route.query.type;
      if (type === "hc_global_nav") {
        await this.$store.dispatch("getCurrentHelpCategory", {
          id: id,
          type: type
        });
        // Set active view
        if (
          (this.currentHelpCategory._blogHelp.length === 0 &&
            this.currentHelpCategory.children === 0) ||
          (this.currentHelpCategory._blogHelp.length === 0 &&
            this.currentHelpCategory.children === 1)
        ) {
          await this.$store.dispatch("setHelpDetailViewActive", 1);
        } else {
          await this.$store.dispatch("setHelpDetailViewActive", 2);
        }
        // Set active category
        if (this.currentHelpCategory.level === 1) {
          await this.$store.dispatch("setActiveHelpCategory", {
            parent: this.currentHelpCategory._id,
            children: ""
          });
        } else {
          await this.$store.dispatch("setActiveHelpCategory", {
            parent: this.currentHelpCategory.parent._id,
            children: this.currentHelpCategory._id
          });
        }
      } else if (type === "hc_blog") {
        await this.$store.dispatch("getBlogById", id);
        // Set active view
        await this.$store.dispatch("setHelpDetailViewActive", 3);
        // Set active category
        if (this.currentHelpBlog.categoryLevel === 1) {
          await this.$store.dispatch("setActiveHelpCategory", {
            parent: this.currentHelpBlog.category,
            children: ""
          });
        } else {
          await this.$store.dispatch("setActiveHelpCategory", {
            parent: this.currentHelpBlog.categoryParent._id,
            children: this.currentHelpBlog.category
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
