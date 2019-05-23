<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3">
        <!-- Start: Modal Header -->
        <div class="header text_center mb_3">
          <h3>Xin chào Đại ca</h3>
          <div class="desc">
            Chào mừng bạn đến với hệ thống Marketting Online của Zinbee.
          </div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="body mb_2">
          <div class="card mb_2" @click="gotoServer(1)">
            <div class="card_body">
              <div class="d_flex align_items_center justify_content_between">
                <div class="detail">
                  <div class="text--bold">Miền Bắc</div>
                  <div class="desc">https://inbox.zinbee.vn</div>
                  <div class="desc">https://chat.zinbee.vn</div>
                </div>
                <div class="action">
                  <button class="btn btn_info">Chọn</button>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb_2" @click="gotoServer(2)">
            <div class="card_body">
              <div class="d_flex align_items_center justify_content_between">
                <div class="detail">
                  <div class="text--bold">Miền Trung</div>
                  <div class="desc">https://inbox.zinbee.vn</div>
                  <div class="desc">https://chat.zinbee.vn</div>
                </div>
                <div class="action">
                  <button class="btn btn_info">Chọn</button>
                </div>
              </div>
            </div>
          </div>

          <div class="card" @click="gotoServer(3)">
            <div class="card_body">
              <div class="d_flex align_items_center justify_content_between">
                <div class="detail">
                  <div class="text--bold">Miền Nam</div>
                  <div class="desc">https://inbox.zinbee.vn</div>
                  <div class="desc">https://chat.zinbee.vn</div>
                </div>
                <div class="action">
                  <button class="btn btn_info">Chọn</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div
          class="footer d_flex align_items_center justify_content_center mt_3"
          v-if="isShowButtonFinal === true"
        >
          <button class="btn bg_primary" @click="redirectServer">
            Hoàn thành
          </button>
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
  data() {
    return {
      isShowButtonFinal: false
    };
  },
  methods: {
    gotoServer() {
      // if (val === 1) {
      //   console.log("Miền bắc");
      // } else if (val === 2) {
      //   console.log("miền trung");
      // } else if (val === 3) {
      //   console.log("miền nam");
      // }
      this.isShowButtonFinal = true;
    },
    redirectServer() {
      this.$emit("closePopupServerMutipart", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
