<template>
  <div>
    <div class="mb_2">
      <div class="title--category">{{ node.title }}</div>
      <div class="btn--click d_flex">
        <!-- <button class="btn btn_warning" @click="goToCateById(node._id)">Update</button>
        <button class="btn btn_danger ml_2" @click="deleteCategory(node._id)">Delete</button> -->
        <router-link
          class="icon mr_2"
          :to="{
            name: 'admin_help_categories_update',
            params: { helpCategoryId: node._id }
          }"
          @click.native="showCategoryDetail(node)"
        >
          <icon-base
            class="icon--arrow-left"
            icon-name="Sửa"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-edit></icon-edit>
          </icon-base>
        </router-link>
        <div class="icon" @click="deleteCategories(node._id)">
          <icon-base
            class="icon--arrow-left"
            icon-name="Xóa"
            width="24"
            height="24"
            viewBox="0 0 18 18"
          >
            <icon-remove></icon-remove>
          </icon-base>
        </div>
      </div>
    </div>
    <ol v-if="node.children && node.children.length > 0">
      <node
        v-for="(child, index) in node.children"
        :node="child"
        :key="index"
      />
    </ol>
  </div>
</template>

<script>
export default {
  name: "node",
  props: {
    node: Object
  },
  data() {
    return {
      isShowPopupUpdateCategory: false
    };
  },
  created() {},
  methods: {
    async showCategoryDetail(val) {
      await this.$store.dispatch("getHelpCategoryById", val._id);
      await this.$store.dispatch("setVariableControlCate", 1);
    },
    deleteCategories(val) {
      this.$store.dispatch("deleteHelpCategory", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.title--category {
  line-height: 38px;
  display: inline-block;
}
.btn--click {
  float: right;
  button {
    font-size: 13px;
  }
  .icon {
    cursor: pointer;
    color: #999999;
    transition: all 0.4s ease;
    &:hover {
      color: #444;
    }
  }
}
</style>
