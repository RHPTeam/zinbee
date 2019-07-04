<template>
  <div>
    <div v-if="!item"></div>
    <div v-else class="flex-table row" role="rowgroup">
      <div
        class="flex-row first"
        role="cell"
        v-if="item.content && item.title.length > 0"
      >
        {{ item.title }}
      </div>
      <div
        class="flex-row content"
        role="cell"
        v-if="item.content && item.content.length > 0"
      >
        <div class="item--content" v-html="item.content.slice(0, 38)"></div>
      </div>
      <div class="flex-row action" role="cell">
        <div class="d_flex justify_content_center">
          <span
            class="checked"
            v-if="
              infoCateDefault.map(category => category._id).includes(item._id)
            "
          >
            Đã chọn
          </span>
          <button
            v-else
            class="btn btn_danger ml_3"
            @click="pushContentToCategory(item._id)"
          >
            Chọn
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    infoCateDefault: Array
  },
  methods: {
    pushContentToCategory(val) {
      const dataSender = {
        cateId: this.$route.params.id,
        postId: val
      };
      this.$store.dispatch("updatePostToCategory", dataSender);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../index.style";
.item--content {
  width: 100%;
}
</style>
