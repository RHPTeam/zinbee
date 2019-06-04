<template>
  <div class="categories position_relative" :data-theme="currentTheme">
    <div class="top d_flex align_items_center mb_4">
      <router-link tag="label" class="link" :to="{ name: 'admin_help' }">
        Quay lại
      </router-link>
      <label class="link" @click="isShowPopupCategories = true">
        Tạo mới
      </label>
    </div>
    <div class="desc mb_3">Danh sách các danh mục hiện có</div>
    <div class="body px_3 py_2">
      <!-- <categories-list /> -->
      <app-tree :tree-data="getCategoryTable" />
    </div>
    <!--Start: Popup new and update categories-->
    <popup-categories
      v-if="isShowPopupCategories === true"
      @close="isShowPopupCategories = $event"
      @backDefault="isDefault = $event"
      :currentTheme="currentTheme"
      :isDefault="isDefault"
    />
    <!--Start: Popup new and update categories-->
  </div>
</template>
<script>
import PopupCategories from "./popup/create";
import AppTree from "./list/components/tree";
export default {
  components: {
    PopupCategories,
    AppTree
  },
  data() {
    return {
      isShowPopupCategories: false,
      isDefault: true,
      isShowPopupUpdate: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    getCategoryTable() {
      return this.$store.getters.allHelpCategoriesChild;
    }
  },
  methods: {
    showInfoCategories(val) {
      this.$store.dispatch("getCategoriesById", val);
      this.isShowPopupCategories = true;
      this.isDefault = false;
    },
    deleteCategories(val) {
      this.$store.dispatch("deleteCategories", val);
    }
  },
  async created() {
    await this.$store.dispatch("getAllCategoriesChildren");
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
