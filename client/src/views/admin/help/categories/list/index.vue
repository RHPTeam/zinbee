<template>
  <div class="container">
    <div class="top d_flex align_items_center mb_4">
      <router-link class="link mr_3" :to="{ name: 'admin_help' }">
        « Quay lại
      </router-link>
      <router-link
        class="btn--create"
        :to="{ name: 'admin_help_categories_create' }"
        @click.native="openCreateCategory"
      >
        Tạo mới
      </router-link>
    </div>
    <div class="desc mb_3">Danh sách các danh mục hiện có</div>
    <div class="body px_3 py_2">
      <div
        class="text_center"
        v-if="categories.length === 0"
      >
        Không có danh mục nào.
      </div>
      <app-tree v-else :tree-data="categories"/>
    </div>
  </div>
</template>

<script>
import AppTree from "./tree/index";
export default {
  components: {
    AppTree
  },
  data() {
    return {
      treeCategories: []
    };
  },
  computed: {
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
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  .top {
    .link {
      color: #444;
      font-size: 0.875rem;
    }
    .btn--create {
      background-color: #FFB94A;
      border-radius: 0.625rem;
      color: #fff;
      font-weight: 600;
      padding: 0.375rem 0.75rem;
      text-decoration: none;
      transition: all 0.4s ease;
      &:hover {
        background-color: #FF9E4A;
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
