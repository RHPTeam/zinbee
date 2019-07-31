<template>
  <div class="action">
    <label class="top" @click="goToListBlog">Quay lại</label
    >
    <div class="body">
      <div class="form_group">
        <label>Tên bài viết</label>
        <input
          type="text"
          placeholder="Nhập tên bài viết ..."
          class="form_control"
          v-model="blog.title"
        />
      </div>
      <div class="form_group">
        <label>Slug</label>
        <div
          class="slug d_flex align_items_center"
          v-if="this.$route.params.id === undefined"
        >
          <span class="mr_2">{{ slug }}</span>
          <input
            type="text"
            placeholder="Link hiển thị"
            class="form_control"
            v-model="blog.slug"
          />
        </div>
        <div class="" v-else>
          <input
            type="text"
            placeholder="Link hiển thị"
            class="form_control"
            v-model="blog.slug"
          />
        </div>
      </div>
      <div class="form_group">
        <label>Nhãn dán</label>
        <input
          type="text"
          placeholder="Giới thiệu"
          class="form_control"
          v-model="blog.label"
        />
      </div>
      <!-- Start: image -->
      <div class="form_group">
        <label for class>Ảnh đại diện</label>
        <div class="img--preview mb_2">
          <img :src="blog.icon" alt="" height="120px" />
        </div>
        <div class>
          <input
            type="file"
            ref="file"
            @change="selectFile()"
            accept="image/x-png,image/gif,image/jpeg"
            class="form_control p_1"
          />
        </div>
        <div class="contain--images"></div>
      </div>
      <!-- End: image -->
      <div class="form_group">
        <label>Bài viết có liên quan</label>
        <div class="multi">
          <multiselect
            multiple
            label="title"
            placeholder="Chọn bài viết liên quan"
            :options="blogs"
            :value="blog.popularBlog"
            @input="selectBlog"
          >
          </multiselect>
        </div>
      </div>
      <div class="form_group">
        <label>Chủ đề liên quan</label>
        <div class="multi">
          <multiselect
            multiple
            label="title"
            placeholder="Chọn chủ đề liên quan"
            :options="categories"
            :value="blog.popularCategory"
            @input="selectCategories"
          >
          </multiselect>
        </div>
        <span class="text_danger">Chọn 3 danh mục liên quan.</span>
      </div>
      <div class="form_group">
        <label>Nội dung bài viết</label>
        <quill-editor
          ref="myQuillEditor"
          v-model="blog.content"
          :options="editorOption"
        />
      </div>
      <div class="form_group">
        <button
          v-if="this.$route.params.id === undefined"
          class="btn btn_primary form_control"
          @click="createNewBlog"
        >
          Tạo mới
        </button>
        <button v-else class="btn btn_primary form_control" @click="updateBlog">
          Cập nhật
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import Quill from "quill";
import { quillEditor } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/ImageExtend", ImageExtend);
Quill.register("modules/imageResize", ImageResize);

import CookieFunction from "@/utils/functions/cookie";
import StringFunction from "@/utils/functions/string";

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            }
          },
          imageResize: true,
          ImageExtend: {
            loading: true,
            name: "file",
            size: 25,
            action: `${process.env.VUE_APP_API_URL}/help/posts/upload`,
            response: res => {
              return res.data;
            },
            headers: xhr => {
              xhr.setRequestHeader(
                "Authorization",
                `sid=${CookieFunction.getCookie(
                  "sid"
                )}; uid=${CookieFunction.getCookie(
                  "uid"
                )}; cfr=${CookieFunction.getCookie("cfr")}`
              );
            }
          }
        }
      },
      slug:
        process.env.VUE_APP_ENV === "local"
          ? `${process.env.VUE_APP_ROOT +
              ":" +
              process.env.VUE_APP_PORT}/#/help/`
          : `${process.env.VUE_APP_ROOT}/#/help/`
    };
  },
  computed: {
    categories() {
      return this.$store.getters.allHelpCategories;
    },
    blog() {
      return this.$store.getters.blog;
    },
    blogs() {
      return this.$store.getters.allBlog;
    }
  },
  async created() {
    if (this.$route.params.id) {
      await this.$store.dispatch("getBlogById", this.$route.params.id);
    }
  },
  watch: {
    "blog.title"(value) {
      if (value) {
        const convertTitle = StringFunction.convertUnicode(value);
        this.blog.slug = StringFunction.convertToSlug(convertTitle);
      }
    }
  },
  methods: {
    async createNewBlog() {
      await this.$store.dispatch("createNewBlog", this.blog);
      this.$router.push({ name: "blogs" });
    },
    async updateBlog() {
      await this.$store.dispatch("updateBlog", this.blog);
      await this.$store.dispatch("resetBlog");
      this.$router.push({ name: "blogs" });
    },
    goToListBlog() {
      this.$store.dispatch("getBlogDefault");
      this.$router.push({name: "blogs"});
    },
    selectFile() {
      this.file = this.$refs.file.files;
      this.sendFile();

      // reset ref
      const input = this.$refs.file;
      input.type = "text";
      input.type = "file";
    },
    async sendFile() {
      const formData = new FormData();
      Array.from(this.file).forEach(file => {
        formData.append("file", file);
      });

      await this.$store.dispatch("uploadIconBlog", formData);
      const dataEmit = await this.$store.getters.blogIcon;
      this.blog.icon = dataEmit;
    },
    selectBlog(val) {
      this.blog.popularBlog = val;
    },
    selectCategories(val) {
      this.blog.popularCategory = val;
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
      border-radius: 0.625rem;
    }
    .slug {
      span {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: #ffb94a;
      }
    }
  }
}
</style>
