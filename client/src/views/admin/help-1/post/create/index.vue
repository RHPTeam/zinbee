<template>
  <!--  Start: Create nwe post category-->
  <div class="create--blog-admin card card_body" :data-theme="currentTheme">
    <div class="form_group">
      <div class="form_group">
        <label for="">Choose category to create a post</label>
        <multiselect
          label="title"
          placeholder="Choose category to create a post"
          :options="getCateAdmin"
          @input="getIdCategory"
        />
        <label
          for=""
          v-if="isShowErrorCategory === true"
          class="errBlogHelp ml_2"
          >Can't to Category empty</label
        >
      </div>
      <div class="form_group mb_2">
        <label for="">Title Post</label>
        <input
          type="text"
          placeholder="Title post"
          class="px_2 py_1 ml_2 form_control"
          v-model="allBlog.title"
        />
        <label for="" v-if="isShowErrorTitle === true" class="errBlogHelp ml_2"
          >Title can't empty</label
        >
      </div>
      <div class="from_group mb_2">
        <label for="">Content Post</label>
        <quill-editor
          v-model="allBlog.content"
          ref="myQuillEditor"
          class="px_2 py_1 ml_2"
        >
        </quill-editor>
        <label
          for=""
          v-if="isShowErrorContent === true"
          class="errBlogHelp ml_2"
          >Content can't empty</label
        >
      </div>
      <button @click="createBlogHelpAdmin" class="btn btn_success">Save</button>
    </div>
  </div>
  <!--  End: Create nwe post category-->
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      allBlog: {
        title: "",
        content: "",
        _helpCategory: ""
      },
      isShowErrorTitle: false,
      isShowErrorContent: false,
      isShowErrorCategory: false
    };
  },
  computed: {
    getCateAdmin() {
      return this.$store.getters.getCateAdmin;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  created() {
    this.$store.dispatch("getAllCategoriesAdmin");
    this.$store.dispatch("getIdBlogHelpAdmin");
  },
  methods: {
    async createBlogHelpAdmin() {
      if (
        this.allBlog._helpCategory.length === 0 ||
        this.allBlog._helpCategory.length === null ||
        this.allBlog._helpCategory.length === undefined
      ) {
        this.isShowErrorCategory = true;
      } else if (this.allBlog.title.length === 0) {
        this.isShowErrorTitle = true;
      } else if (this.allBlog.content.length === 0) {
        this.isShowErrorContent = true;
      } else {
        this.isShowErrorCategory = false;
        this.isShowErrorTitle = false;
        this.isShowErrorContent = false;
        const createBlog = {
          title: this.allBlog.title,
          content: this.allBlog.content,
          _helpCategory: this.allBlog._helpCategory
        };
        await this.$store.dispatch("createBlogHelpAdmin", createBlog);
        this.$router.push("/admin/help/help-blogs");
      }
    },
    getIdCategory(value) {
      this.allBlog._helpCategory = value._id;
    }
  }
};
</script>

<style scoped lang="scss">
.errBlogHelp {
  font-size: 14px;
  color: #c81a17;
}
.create--blog-admin[data-theme="dark"] {
  background: #909090;
  color: #fff;
  .ql-toolbar.ql-snow .ql-formats button,
  .ql-toolbar.ql-snow .ql-formats span {
    color: #fff;
    background: #fff !important;
  }
}
</style>
