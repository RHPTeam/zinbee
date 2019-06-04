<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3" v-click-outside="close">
        <!-- Start: Modal Body -->
        <div class="body">
          <h4 class="">Tạo thư mục mới</h4>
          <input
            type="text"
            class="form_control"
            placeholder="Nhập tên thư mục"
          />
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center mt_3">
          <div class="ml_auto d_flex">
            <button class="btn bg_danger mr_2" @click="close">
              Hủy bỏ
            </button>
            <button class="btn bg_primary" @click="createNewFolder">
              Tạo mới
            </button>
          </div>
        </div>
        <!-- End: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTheme: String
  },
  methods: {
    close() {
      this.$emit("closePopup", false);
    },
    createNewFolder() {
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
