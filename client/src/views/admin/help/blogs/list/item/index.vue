<template>
  <div>
    <!--    <div v-if="!item">-->
    <!--      <loading-component />-->
    <!--    </div>-->
    <div class="flex-table row" role="rowgroup">
      <div class="flex-row first" role="cell">
        <div>{{item.title}}</div>
      </div>
      <div class="flex-row" role="cell">
        <div v-html="item.content"></div>
      </div>
      <div class="flex-row" role="cell">{{item._account.name}}</div>
      <div class="flex-row" role="cell">
        <div class="d_flex justify_content_center">
          <button class="btn btn_warning" @click="showBlogById">
            Sửa
          </button>
          <button class="btn btn_danger ml_3" @click="deleteBlog">
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    showBlogById() {
      this.$store.dispatch("getBlogById", this.item._id);
      this.$router.push({
        name: "blogs_update",
        params: { id: this.item._id }
      });
    },
    deleteBlog() {
      this.$store.dispatch("deleteBlog", this.item._id);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../index.style";
</style>
