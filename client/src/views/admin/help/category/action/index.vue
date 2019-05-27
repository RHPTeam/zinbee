<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content" v-click-outside="close">
        <!-- Start: Modal Body -->
        <div class="action">
          <div
            class="back d_flex align_items_center py_2 px_2 mb_5"
            @click="backListCategories"
          >
            <div class="icon mr_3">
              <icon-base
                class="icon--arrow-left"
                icon-name="arrow"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <icon-arrow-left></icon-arrow-left>
              </icon-base>
            </div>
            <div>
              Danh sách danh mục
            </div>
          </div>
          <form class="py_3 px_5">
            <div class="form_group">
              <label>Tên danh mục</label>
              <input
                type="text"
                class="form_control"
                placeholder="Nhập tên danh mục ..."
                v-model="categories.title"
              />
            </div>
            <div class="form_group">
              <label>Chọn danh mục cha</label>
              <div class="option">
                <multiselect
                  label="title"
                  placeholder="Chọn danh mục cha ..."
                  :options="allCategories"
                  @input="updateParent"
                  :value="categories.parent.title"
                />
              </div>
            </div>
            <div class="form_group">
              <button
                v-if="categories._id"
                class="btn btn_primary form_control"
                @click="updateCategories"
              >
                Cập nhật
              </button>
              <button
                v-else
                class="btn btn_primary form_control"
                @click="createNewCategories"
              >
                Tạo mới
              </button>
            </div>
          </form>
        </div>
        <!-- End: Modal Body -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentTheme: String,
    isDefault: Boolean
  },
  computed: {
    allCategories() {
      return this.$store.getters.allCategories;
    },
    categories() {
      return this.$store.getters.categories;
    }
  },
  async created() {
    await this.$store.dispatch("getCategoriesDefault");
  },
  methods: {
    backListCategories() {
      this.$router.push("/admin/help/categories");
    },
    close() {
      this.$emit("close", false);
    },
    createNewCategories() {
      this.$store.dispatch("createNewCategories", this.categories);
    },
    updateCategories() {
      this.$store.dispatch("updateCategories", this.categories);
      this.$emit("backDefault", true);
      this.close();
    },
    updateParent(val) {
      this.categories.parent = val._id;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
