<template>
  <div class="item--body d_flex align_items_center px_3 py_2">
    <!-- Start: Name Column -->
    <div class="col col--name px_2">
      <!--      <router-link class="col col&#45;&#45;name-text">-->
      <!--        {{ item.title-->
      <!--      </router-link>-->
    </div>
    <!-- End: Name Column -->
    <!-- Start: Category Column -->
    <div class="col col--category px_2">
      <span>{{ item.content</span>
    </div>
    <!-- End: Category Column -->
    <!-- Start: Image Column -->
    <div class="col col--image px_2"></div>
    <!-- End: Image Column -->
    <!-- Start: Action Column -->
    <div
      class="col d_flex align_items_center justify_content_center col--action px_4 text_center"
    >
      <span class="mx_1" @click="showCreatePopup">
        <icon-base
          width="20"
          height="20"
          icon-name="post"
          viewBox="0 0 520 520"
        >
          <icon-automatic />
        </icon-base>
      </span>
      <span class="mx_1" @click="updatePost">
        <icon-base icon-name="icon-edit" viewBox="0 0 20 20">
          <icon-edit />
        </icon-base>
      </span>
      <span class="mr_1" @click="showDeletePopup()">
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </span>
    </div>
    <!-- End: Action Column -->
  </div>
</template>

<script>
export default {
  props: {},
  methods: {
    updatePost() {},
    showDeletePopup() {
      // this.$emit("showDeletePopup", this.item);
    },
    showCreatePopup() {
      // this.$emit("showCreatePopup", this.item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
