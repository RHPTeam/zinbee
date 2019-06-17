<template>
  <div class="modal--popup-add" :data-theme="currentTheme">
    <div class="modal--content position_relative">
      <div
        class="content d_flex flex_column align_items_center justify_content_center p_3"
        v-click-outside="closeAddToCollectionPopup"
      >
        <div class="title font_weight_bold mb_3">
          <icon-base
            class="icon--user mr_1"
            width="100"
            height="100"
            viewBox="0 0 52 52"
            icon-name="Thành công"
          >
            <icon-success />
          </icon-base>
        </div>
        <h3 class="m_0">Thành công</h3>
        <div class="py_2 mb_3">Bài viết đã được thêm vào kho nội dung</div>
        <div
          class="d_flex px_3 py_2"
          @click.prevent="closeAddToCollectionPopup"
        >
          <div class="btn btn_info close">OK</div>
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
    width: 30%;
    position: absolute;
    left: 40%;
    top: 50%;
    transform: translateY(-50%);
    // height: 250px;
    border-radius: 0.625rem;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    background: #fff;
    .title {
      svg {
        color: #00c853;
        fill: #00c853;
      }
    }
    .close {
      border-radius: 0.625rem;
      padding: 0.35rem 2rem;
    }
  }
}
</style>
