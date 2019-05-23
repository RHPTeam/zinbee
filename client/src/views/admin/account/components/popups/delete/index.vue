<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title--small mt_2">Xóa các tài khoản đã chọn</div>
          <div class="desc mt_3">
            Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xóa
            không?
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeDialog">HỦY</button>
          <button class="btn-submit" @click="deleteSelected">
            XÓA
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedUIDs"],

  data() {
    return {};
  },

  computed: {},

  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    deleteSelected() {
      const dataSender = {
        userId: this.selectedUIDs
      };

      this.$store.dispatch("deleteUsers", dataSender);
      this.$emit("closeDialog", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
