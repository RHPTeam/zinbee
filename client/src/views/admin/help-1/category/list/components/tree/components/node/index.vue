<template>
  <div class="list--cate" :data-theme="currentTheme">
    <div class="mb_2">
      <div class="title--category">{{ node.title }}</div>
      <div class="btn--click">
        <button class="btn btn_warning" @click="goToCateById(node._id)">
          Update
        </button>
        <button class="btn btn_danger ml_2" @click="deleteCategory(node._id)">
          Delete
        </button>
      </div>
    </div>
    <ol v-if="node.children && node.children.length > 0">
<!--      <node v-for="child in node.children" :node="child" />-->
    </ol>
  </div>
</template>

<script>
export default {
  name: "node",
  props: {
    node: Object
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    goToCateById(id) {
      this.$store.dispatch("getCategoriesById", id);
      this.$router.push({
        name: "update_catagory",
        params: { id: id }
      });
    },
    async deleteCategory(id) {
      await this.$store.dispatch("deleteCategoryById", id);
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
}
.list--cate[data-theme="dark"] {
}

// ------- Respon
@media screen and (max-width: 768px) {
  .btn--click {
    float: unset;
  }
}
</style>
