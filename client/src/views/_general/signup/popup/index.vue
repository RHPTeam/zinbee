<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3" v-click-outside="close">
        <!-- Start: Modal Header -->
        <div class="header text_center mb_3">
          <h3>Xin chào {{ userDefault.name }}</h3>
          <div class="desc text_left alert alert_info">
            Chào mừng bạn đến với hệ thống Marketting Online của Zinbee. Vui
            lòng chọn những serve đang hoạt động để hoàn thành đăng ký tài
            khoản.
          </div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div
          class="body d_flex align_items_center justify_content_between mb_2"
        >
          <div
            class="card position_realtive mb_2"
            @click="gotoServer(0)"
            :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
          >
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

          <div
            class="card maintenance position_relative mb_2"
            @click="gotoServer(1)"
            :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
          >
            <div
              class="alert--card position_absolute d_flex align_items_center justify_content_center px_2"
            >
              Hệ thống đang được nâng cấp, vui lòng chọn server khác đang hoạt
              động!
            </div>
            <div
              class="earth item d_flex align_items_center justify_content_center position_absolute"
            >
              2
            </div>
            <div class="card_body">
              <div class="">
                <div class="detail mb_3">
                  <div class="text--bold text_center">Miền Trung</div>
                  <div class="desc">https://inbox.zinbee.vn</div>
                  <div class="desc">https://chat.zinbee.vn</div>
                  <div class="desc">Số lượng còn trống: 18</div>
                  <div class="desc">
                    Trạng thái: <span class="text_danger">Không hoạt động</span>
                  </div>
                </div>
                <div class="action">
                  <button class="btn btn_info form_control">Chọn</button>
                </div>
              </div>
            </div>
          </div>

          <div
            class="card position_relative mb_2"
            @click="gotoServer(2)"
            :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
          >
            <div
              class="earth item d_flex align_items_center justify_content_center position_absolute"
            >
              3
            </div>
            <div class="card_body">
              <div class="">
                <div class="detail mb_3">
                  <div class="text--bold text_center">Miền Nam</div>
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
import CookieFunction from "@/utils/functions/cookie";

export default {
  props: {
    currentTheme: String,
    user: Object
  },
  data() {
    return {
      isShowButtonFinal: false,
      srcDefault: require("@/assets/images/zinbee-logo-orange.svg"),
      isShowAlert: false
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
    close() {
      this.$emit("closePopupServerMutipart", false);
    },
    gotoServer(val) {
      if (val === 1) {
        this.isShowAlert = true;
      }
      this.userDefault.region = val;
      // this.userDefault.patch = this.redirectDomain;
      this.isShowButtonFinal = true;
    },
    async redirectServer() {
      await this.$store.dispatch("signUpByUser", this.userDefault);
      this.close();
      if (
        this.$store.getters.authError === "403" ||
        this.$store.getters.authError === "404"
      ) {
        return;
      }
      const token = `sid=${CookieFunction.getCookie(
        "sid"
      )}; uid=${CookieFunction.getCookie(
        "uid"
      )}; cfr=${CookieFunction.getCookie("cfr")};`;
      window.location = `${
        this.redirectDomain
      }redirect?authorization=${encodeURIComponent(token)}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
