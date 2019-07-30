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
  props: {
    currentTheme: String,
    isDefault: Boolean
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
            action: `${process.env.VUE_APP_API_URL}/help/categories/upload`,
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
      }
    };
  },
  computed: {
    categories() {
      return this.$store.getters.allHelpCategories;
    },
    category() {
      return this.$store.getters.helpCategory;
    },
    blogList() {
      return this.$store.getters.allBlog;
    },
    variableControl() {
      return this.$store.getters.variableControlCate;
    }
  },
  async created() {
    const variableControl = this.$store.getters.variableControlCate;
    if (variableControl === 0) {
      await this.$store.dispatch("getHelpCategoryDefault");
    }
    await this.$store.dispatch("getAllHelpCategories");
    await this.$store.dispatch("getAllBlog");
  },
  methods: {
    cancel() {
      this.resetCategory();
      this.$router.push({ name: "admin_help_categories" });
    },
    async createCategory() {
      const convertTitle = StringFunction.convertUnicode(this.category.title);
      this.category.slug = StringFunction.convertToSlug(convertTitle);

      await this.$store.dispatch("createHelpCategory", this.category);
      this.$router.push({ name: "admin_help_categories" });
      this.resetCategory();
    },
    handleBlogList(value) {
      this.category._blogHelp = value;
    },
    handleCategoryParent(value) {
      this.category.parent = value;
    },
    resetCategory() {
      this.category.title = "";
      this.category.label = "";
      this.category.icon = "";
      this.category.description = "";
      this.category.content = "";
      this.category.parent = "";
      this.category._blogHelp = [];
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

      await this.$store.dispatch("uploadHelpCategoryIcon", formData);
      const iconLink = await this.$store.getters.helpCategoryIconUpload;
      this.category.icon = iconLink;
    },
    async updateCategory() {
      await this.$store.dispatch("updateHelpCategory", this.category);
      this.$router.push({ name: "admin_help_categories" });
      this.resetCategory();
    }
  }
};
