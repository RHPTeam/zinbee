<template>
  <div>
    <div class="card card_body mt_2">
      <app-tree :tree-data="getCategoryTable" />
    </div>
  </div>
</template>

<script>
import AppTree from "./components/tree";
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
    getCategoryTable() {
      return this.$store.getters.getAllCategoriesChildren;
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.add--catagory {
  border-radius: 20px;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  color: #fff;
}
.parent {
  font-size: 16px;
}
.children {
  font-size: 14px;
}
</style>
