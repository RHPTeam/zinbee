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
        <div
          class="body d_flex align_items_center justify_content_between mb_2"
        >
          <div class="card position_realtive mb_2" @click="gotoServer(0)">
            <div
              class="earth item d_flex align_items_center justify_content_center position_absolute"
            >
              1
            </div>
            <div class="card_body">
              <div class="">
                <div class="detail mb_3">
                  <div class="text--bold text_center">Miền Bắc</div>
                  <div class="desc">https://inbox.zinbee.vn</div>
                  <div class="desc">https://chat.zinbee.vn</div>

                  <div class="desc">Số lượng còn trống: 18</div>
                  <div class="desc">
                    Trạng thái: <span>Đang hoạt động</span>
                  </div>
                </div>
                <div class="action">
                  <button class="btn btn_info form_control">Chọn</button>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb_2" @click="gotoServer(1)">
            <div class="card_body">
              <div class="">
                <div class="detail mb_3">
                  <div class="text--bold text_center">Miền Trung</div>
                  <div class="desc">https://inbox.zinbee.vn</div>
                  <div class="desc">https://chat.zinbee.vn</div>
                </div>
                <div class="action">
                  <button class="btn btn_info form_control">Chọn</button>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb_2" @click="gotoServer(2)">
            <div class="card_body">
              <div class="">
                <div class="detail mb_3">
                  <div class="text--bold text_center">Miền Nam</div>
                  <div class="desc">https://inbox.zinbee.vn</div>
                  <div class="desc">https://chat.zinbee.vn</div>
                </div>
                <div class="action">
                  <button class="btn btn_info form_control">Chọn</button>
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
    currentTheme: String,
    user: Object
  },
  data() {
    return {
      isShowButtonFinal: false
    };
  },
  computed: {
    userDefault() {
      return this.$store.getters.userDefault;
    },
    redirectDomain() {
      return this.$store.getters.redirectDomain;
    }
  },
  methods: {
    gotoServer(val) {
      this.userDefault.region = val;
      this.isShowButtonFinal = true;
    },
    async redirectServer() {
      await this.$store.dispatch("signUpByUser", this.userDefault);
      this.$emit("closePopupServerMutipart", false);
      window.location = `${this.redirectDomain}welcome`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
