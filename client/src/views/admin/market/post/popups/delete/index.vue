<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div class="title">Xóa bài viết</div>
        </div>
        <div class="modal--body my_3">
          <div class="desc">
            Bạn có chắc chắn muốn xóa bài viết
            <span class="font_weight_bold">{{ post.title }}</span>
          </div>
          <input
            class="modal--body-input mt_3"
            placeholder="DELETE"
            type="text"
            v-model="deleteText"
          />
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--submit" @click="closePopup()">
            HỦY
          </button>
          <button
            class="btn--skip"
            v-if="deleteConfirm"
            @click="deleteTargets()"
          >
            XÓA
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      deleteConfirm: false,
      deleteText: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    deleteText() {
      this.deleteConfirm = this.deleteText === "DELETE";
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    deleteTargets() {
      this.$store.dispatch("deleteMarketPost", this.post._id);

      this.$emit("closePopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
