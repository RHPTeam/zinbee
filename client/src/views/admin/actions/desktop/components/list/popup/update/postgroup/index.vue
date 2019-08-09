<template>
  <div class="modal--wrapper">
    <div class="modal--dialog">
      <div class="modal--content position_relative">
        <VuePerfectScrollbar class="scroll--postgroup">
          <!-- Start: Header -->
          <div class="px_3 items--header mt_3 text_center">
            <div class="title">Cập nhật nhóm <b>Nhóm 1</b></div>
          </div>
          <!-- Start: Header -->
          <!-- Start: Body -->
          <div class="px_3 items--body mb_3">
            <div class="profile mb_2">
              TCN: 
              <span>
                <!-- <img :src="item.userInfo.thumbSrc" alt="avatar" width="30px" height="30px" /> -->
                <span class="pl_2">Name 1</span>
              </span>,
              <span>
                <!-- <img :src="item.userInfo.thumbSrc" alt="avatar" width="30px" height="30px" /> -->
                <span class="pl_2">Name 2</span>
              </span>
            </div>
            <div class="page mb_2">
              Fanpage: 
              <span>
                <!-- <img :src="item.userInfo.thumbSrc" alt="avatar" width="30px" height="30px" /> -->
                <span class="pl_2">Page 1</span>
              </span>,
              <span>
                <!-- <img :src="item.userInfo.thumbSrc" alt="avatar" width="30px" height="30px" /> -->
                <span class="pl_2">Page 2</span>
              </span>
            </div>
            <div class="group">  
              Group:             
              <span>
                <!-- <img :src="item.userInfo.thumbSrc" alt="avatar" width="30px" height="30px" /> -->
                <span class="pl_2">Group 1</span>
              </span>,
              <span>
                <!-- <img :src="item.userInfo.thumbSrc" alt="avatar" width="30px" height="30px" /> -->
                <span class="pl_2">Group 2</span>
              </span>
            </div>
          </div>
          <!-- End: Body -->
          <!-- Start: Footer -->
          <div class="items--footer d_flex align_items_center" @click="closePopup">
            <icon-base
              icon-name="đóng"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <icon-close />
            </icon-base>
          </div>
          <!-- End: Footer -->
        </VuePerfectScrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    }
  },
};
</script>

<style scoped lang="scss">
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
      background-color: #2f3236;
      border-radius: 0.625rem;
      max-height: calc(100vh - 10%);
      width: 60vw;
      color: #fff;
    }
    .items--header {
      font-size: 1rem;
    }
    .items--footer {
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
    }
  }
  .scroll--postgroup {
    max-height: 80vh;
  }
}
</style>