<template>
  <div>
    <div v-if="!post"></div>
    <div v-else class="flex-table row" role="rowgroup">
      <div class="flex-row first" role="cell">
        <div v-if="post && post.title.length > 0">{{ post.title }}</div>
      </div>
      <div
        class="flex-row content"
        role="cell"
        v-if="post && post.content.length > 0"
      >
        <div class="item--content" v-html="post.content.slice(0, 38)"></div>
      </div>
      <div class="flex-row action" role="cell">
        <div class="d_flex justify_content_center">
          <button
            class="btn btn_warning ml_3"
            @click="redirectEditPost(post._id)"
          >
            Sửa
          </button>
          <button
            class="btn btn_danger ml_3"
            @click="deleteContentToCategory(post._id)"
          >
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
    post: Object
  },
  methods: {
    deleteContentToCategory(val) {
      const dataSender = {
        cateId: this.$route.params.id,
        postId: val
      };
      this.$store.dispatch("deletePostFromCategory", dataSender);
    },
    redirectEditPost(val) {
      this.$router.push({
        name: "libraries_details",
        params: { id: val }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";
</style>
