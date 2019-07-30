<template>
  <div class="d_flex list--help">
    <div class="item">
      {{ item.title }}
    </div>
    <div class="item" v-html="item.content"></div>
    <div class="item">{{ item._account.name }}</div>
    <div class="item">
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
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    showBlogById() {
      this.$router.push({
        name: "admin_help_blogs_update",
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
// @import "../index.style";
$row-bg: #ccc6;
$row-color: #666;
$row-bg-hover: #cccccc40;
$row-color-hover: #fff;
.list--help {
  transition: 0.4s;
  &:hover {
    background: $row-bg-hover;
  }
}
.item {
  text-align: center;
  padding: 5px;
  flex: 1;
  border-right: 1px solid #ccc;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 32px;
  height: 47px;
  &:last-child {
    border-right: 0;
  }
}
</style>
