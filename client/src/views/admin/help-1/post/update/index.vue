<template>
  <div class="update--blog-admin" :data-theme="currentTheme">
    <div class="card card_body">
      <div class="form_group">
        <div class="form_group">
          <label for>Chon danh muc de update</label>
          <multiselect
            label="title"
            placeholder="Lựa chọn danh mục de update"
            :options="getCateAdmin"
            v-model="getAllToUpdate._helpCategory"
          />
          <label
            for
            v-if="isShowErrorCategory === true"
            class="errBlogHelp ml_2"
            >Can't to Category empty</label
          >
        </div>
        <div class="form_group mb_2">
          <label for>Title Post</label>
          <input
            type="text"
            placeholder="Title post"
            class="px_2 py_1 ml_2 form_control"
            v-model="getAllToUpdate.title"
          />
          <label for v-if="isShowErrorTitle === true" class="errBlogHelp ml_2"
            >Title can't empty</label
          >
        </div>
        <div class="from_group mb_2">
          <label for>Content Post</label>
          <quill-editor
            v-model="getAllToUpdate.content"
            ref="myQuillEditor"
            class="px_2 py_1 ml_2"
          ></quill-editor>
          <label for v-if="isShowErrorContent === true" class="errBlogHelp ml_2"
            >Content can't empty</label
          >
        </div>
        <button class="btn btn_success" @click="updateBlogById">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      isShowErrorTitle: false,
      isShowErrorContent: false,
      isShowErrorCategory: false
    };
  },
  computed: {
    getAllToUpdate() {
      return this.$store.getters.getBlogHelpById;
    },
    getCateAdmin() {
      return this.$store.getters.getCateAdmin;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async updateBlogById() {
      await this.$store.dispatch("updateBlogHelp", this.getAllToUpdate);
      this.$router.push({
        name: "help_blogs"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.update--blog-admin[data-theme="dark"] {
  .card {
    background: #909090;
    color: #fff;
  }
}
</style>
