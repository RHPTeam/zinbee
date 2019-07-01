<template>
  <div>
    <div v-if="!post"></div>
    <div v-else class="flex-table row" role="rowgroup">
      <div class="flex-row first" role="cell" v-if="post.title">
        {{ post.title }}
      </div>
      <div class="flex-row content" role="cell" v-if="post.content">
        <div
          class="item--content"
          v-html="
            post.content.length > 38 ? post.content.slice(0, 38) : post.content
          "
        ></div>
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
@import "../../index.style";
</style>
