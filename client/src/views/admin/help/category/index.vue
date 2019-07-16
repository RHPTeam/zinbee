<template>
  <div class="categories position_relative" :data-theme="currentTheme">
    <div class="top d_flex align_items_center mb_4">
      <router-link tag="label" class="link" :to="{ name: 'admin_help' }">
        Quay lại
      </router-link>
      <label class="link" @click="openCreateCategory">
        Tạo mới
      </label>
    </div>
    <div class="desc mb_3">Danh sách các danh mục hiện có</div>
    <div class="body px_3 py_2">
      <app-tree :tree-data="categories" />
    </div>

    <!--Start: Custom Category Popup-->
    <category-popup
      v-if="isActiveCategoryPopup === true"
      @close="isActiveCategoryPopup = $event"
    />
    <!--End: Custom Category Popup-->
  </div>
</template>
<script>
import AppTree from "./components/list/components/tree";
import CategoryPopup from "./components/popup/category";
export default {
  components: {
    AppTree,
    CategoryPopup
  },
  data() {
    return {
      isActiveCategoryPopup: false,
      isDefault: true
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categories() {
      return this.$store.getters.allHelpCategoriesChild;
    }
  },
  async created() {
    await this.$store.dispatch("getAllCategoriesChildren");
  },
  methods: {
    openCreateCategory() {
      this.$store.dispatch("setVariableControlCate", 0);
      this.isActiveCategoryPopup = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.categories {
  .top {
    .link {
      border: 1px solid #e4e4e4;
      border-radius: 0.625rem;
      color: #444444;
      cursor: pointer;
      margin-right: 1rem;
      padding: 0.5rem 1rem;
      &:hover,
      &:active,
      &:visited,
      &:focus {
        text-decoration: none;
        border-color: #ffb94a;
        transition: all 0.5s ease;
      }
    }
  }
  .desc {
    font-weight: 600;
  }
  .body {
    border: 1px solid #e4e4e4;
    border-radius: 0.625rem;
    .item {
      border-bottom: 1px solid #e4e4e4;
      cursor: pointer;
    }
  }
}
</style>
