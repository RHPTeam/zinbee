<template>
  <div class="action">
    <router-link tag="label" class="top" :to="{ name: 'blogs' }"
      >Quay lại</router-link
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
        <input
          type="text"
          placeholder="Link hiển thị"
          readonly
          class="form_control"
          v-model="convertSlug"
        />
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
          ? `${process.env.VUE_APP_ROOT + ":" + process.env.VUE_APP_PORT}/#/`
          : `${process.env.VUE_APP_ROOT}/#/`
    };
  },
  computed: {
    allCategories() {
      return this.$store.getters.allCategories;
    },
    blog() {
      return this.$store.getters.blog;
    },
    convertSlug() {
      return this.slug + this.blog.slug;
    }
  },
  async created() {
    await this.$store.dispatch("getBlogDefault");
  },
  watch: {
    "blog.title"(val) {
      const convertTitle = StringFunction.convertUnicode(val);
      this.blog.slug = StringFunction.convertToSlug(convertTitle);
    }
  },
  methods: {
    createNewBlog() {
      this.$store.dispatch("createNewBlog", this.blog);
      this.$router.push({ name: "blogs" });
    },
    updateBlog() {
      this.$store.dispatch("updateBlog", this.blog);
      this.$router.push({ name: "blogs" });
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
  }
}
</style>
