<template>
  <div class="action">
    <router-link tag="label" class="top" :to="{name: 'blogs'}">
      Quay lại
    </router-link>
    <div class="body">
      <div class="form_group">
        <label>Tên bài viết</label>
        <input type="text" placeholder="Nhập tên bài viết ..." class="form_control"  v-model="blog.title" />
      </div>
      <div class="form_group">
        <label>Nội dung bài viết</label>
        <quill-editor ref="myQuillEditor" v-model="blog.content" />
      </div>
      <div class="form_group">
        <button v-if="this.$route.params.id === undefined" class="btn btn_primary form_control" @click="createNewBlog">Tạo mới</button>
        <button v-else class="btn btn_primary form_control" @click="updateBlog">Cập nhật</button>
      </div>
    </div>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor
  },
  computed: {
    allCategories() {
      return this.$store.getters.allCategories;
    },
    blog() {
      return this.$store.getters.blog;
    }
  },
  async created() {
    await this.$store.dispatch("getBlogDefault");
  },
  methods: {
    createNewBlog() {
      this.$store.dispatch("createNewBlog", this.blog);
      this.$router.push({ name: 'blogs' });
    },
    updateBlog(){
      this.$store.dispatch("updateBlog", this.blog);
      this.$router.push({ name: 'blogs' });
    }
  }
};
</script>
<style lang="scss" scoped>
.action {
  .top {
    border: 1px solid #e4e4e4;
    border-radius: 0.625rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
  }
  .body {
    .multi {
      border: 1px solid #e4e4e4;
      border-radius: .625rem;
    }
  }
}
</style>
