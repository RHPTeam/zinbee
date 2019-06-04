<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3" v-click-outside="close">
        <!-- Start: Modal Body -->
        <div class="body">
          <h4>Bạn có chắc chắn muốn xóa thư mục này không ?</h4>
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center mt_3">
          <div class="ml_auto d_flex">
            <button class="btn bg_danger mr_2" @click="close">
              Hủy bỏ
            </button>
            <button class="btn bg_primary" @click="deleteFolder">
              Xóa
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
    currentTheme: String,
    item: String
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    deleteFolder() {
      console.log(this.item);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal--wrapper {
  background-color: rgba(153, 153, 153, 0.4);
  bottom: 0;
  font-family: "Open Sans", sans-serif;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;

  .modal--dialog {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;

    .modal--content {
      background-color: #fafafa;
      border-radius: 0.625rem;
      max-height: calc(100vh - 10%);
      width: 40%;
      .body {
        input {
          &:hover,
          &:focus,
          &:active,
          &:visited {
            box-shadow: none;
            outline: 0;
            border-color: #e4e4e4;
          }
        }
      }
      .footer {
        button {
          color: #ffffff;
          &:hover,
          &:focus,
          &:active,
          &:visited {
            box-shadow: none;
            outline: 0;
          }
        }
      }
    }
  }
}

/*Transition popup*/
.popup-enter-active,
.popup-leave-active {
  transition: opacity 1s;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
</style>
