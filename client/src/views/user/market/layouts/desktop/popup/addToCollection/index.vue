<template>
  <div class="modal--popup-add" :data-theme="currentTheme">
    <div class="modal--content position_relative">
      <div class="content p_3">
        <div class="title font_weight_bold">Thông báo</div>
        <div class="py_2">Bài viết đã được thêm vào kho nội dung</div>
        <div
          class="d_flex px_3 py_2"
          @click.prevent="closeAddToCollectionPopup"
        >
          <div class="btn btn_info ml_auto">OK</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeAddToCollectionPopup() {
      this.$emit("closePopupAddToCollection", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal--popup-add {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(153, 153, 153, 0.4);
  width: 100vw;
  height: 100vh;
  .modal--content {
    width: 100vw;
    height: 100vh;
  }
  .content {
    width: 300px;
    position: absolute;
    left: 40%;
    top: 50%;
    transform: translateY(-50%);
    // height: 250px;
    border-radius: 0.625rem;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    background: #fff;
  }
}
</style>
