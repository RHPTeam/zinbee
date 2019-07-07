<template>
  <div class="wrapper position_relative">
    <div class="container">
      <!-- Start: Logo -->
      <div class="wrapper--logo position_absolute">
        <!-- Start: Logo Xl Screen -->
        <icon-base
          class="d_none d_xl_block"
          icon-name="ZinBee"
          width="120"
          height="49.73"
          viewBox="0 0 250.446 93.703"
        >
          <icon-logo></icon-logo>
        </icon-base>
        <!-- End: Logo Xl Screen -->
        <!-- Start: Logo Large Screen -->
        <icon-base
          class="d_none d_md_block d_xl_none"
          icon-name="ZinBee"
          width="100"
          height="49.73"
          viewBox="0 0 250.446 93.703"
        >
          <icon-logo></icon-logo>
        </icon-base>
        <!-- End: Logo Large Screen -->
      </div>
      <div class="wrapper--logo d_md_none text_center">
        <icon-base
          icon-name="ZinBee"
          width="160"
          height="78.65"
          viewBox="0 0 250.446 93.703"
        >
          <icon-logo />
        </icon-base>
      </div>
      <!-- End: Logo -->
      <!-- Start: Content -->
      <div class="r wrapper--content mx_0">
        <!-- Start: Background -->
        <div
          class="c_lg_8 wrapper--bg d_lg_flex align_items_center justify_content_center"
        >
          <img class="bg--image" :src="loginImage" alt="" />
        </div>
        <!-- End: Background -->
        <!-- Start: Main -->
        <div class="c_12 c_lg_4 wrapper--main d_flex align_items_center">
          <div class="w--100">
            <!-- Start: Main Header-->
            <div class="main--header">
              <div class="d_none d_md_block title mb_3">Zinbee xin chào</div>
              <div class="desc">
                &rdquo;Khách hàng sẽ quên những điều bạn làm. Nhưng họ sẽ không
                bao giờ quên những cảm nhận mà bạn mang đến cho họ.&rdquo;
              </div>
            </div>
            <!-- End: Main Header-->
            <!-- Start: Alert -->
            <div
              v-if="this.$store.getters.statusResetPassword === true"
              class="alert--success position_relative mt_3"
            >
              Bạn đã đặt lại mật khẩu thành công!
            </div>
            <div
              v-if="this.$store.getters.authError === '401'"
              class="alert--error position_relative mt_3"
            >
              Tài khoản email hoặc mật khẩu không đúng!
            </div>
            <div
              v-if="this.$store.getters.authError === '405'"
              class="alert--error position_relative mt_3"
            >
              Tài khoản của bạn đã hết hạn hoặc bị ngừng truy cập!
            </div>
            <!-- End: Alert -->
            <!-- Start: Main Body-->
            <div class="main--body mb_5 mt_4">
              <!-- Start: Form Group-->
              <div class="form--group">
                <!-- Start: Email -->
                <div
                  class="form--card d_flex align_items_center position_relative px_3"
                >
                  <div class="form--icon mr_3">
                    <icon-base
                      class="icon--envelope"
                      width="26px"
                      height="26px"
                      viewBox="0 0 23 23"
                    >
                      <icon-envelope></icon-envelope>
                    </icon-base>
                  </div>
                  <div class="form--control mr_2">
                    <div class="desc">Email</div>
                    <input
                      type="text"
                      class="form--input"
                      placeholder="nguyenvana@gmail.com"
                      v-model="user.email"
                    />
                  </div>
                  <div class="form--validate">
                    <icon-base
                      v-if="statusClassPassed.email"
                      class="icon--check"
                      width="16px"
                      height="16px"
                      viewBox="0 0 20 20"
                    >
                      <icon-check-active></icon-check-active>
                    </icon-base>
                    <icon-base
                      v-if="statusClassError.email"
                      class="icon--attention"
                      width="16px"
                      height="16px"
                      viewBox="0 0 520 520"
                    >
                      <icon-attention></icon-attention>
                    </icon-base>
                    <div class="tooltip--error position_absolute">
                      {{ errorText.email }}
                    </div>
                  </div>
                </div>
                <!-- End: Email -->
                <!-- Start: Password -->
                <div
                  class="form--card d_flex align_items_center position_relative px_3"
                >
                  <div class="form--icon mr_3">
                    <icon-base
                      class="icon--lock"
                      width="20px"
                      height="26px"
                      viewBox="0 0 14 20"
                    >
                      <icon-lock></icon-lock>
                    </icon-base>
                  </div>
                  <div class="form--control mr_2">
                    <div class="desc">Mật khẩu</div>
                    <input
                      v-if="isShowPassword === false"
                      type="password"
                      class="form--input"
                      placeholder="Nhập mật khẩu"
                      v-model="user.password"
                    />
                    <input
                      v-if="isShowPassword === true"
                      type="text"
                      class="form--input"
                      placeholder="Nhập mật khẩu"
                      v-model="user.password"
                    />
                  </div>
                  <div class="form--validate d_flex align_items_center">
                    <div @click="isShowPassword = !isShowPassword">
                      <icon-base
                        v-if="isShowPassword === true"
                        class="icon--eye"
                        width="22px"
                        height="18px"
                        viewBox="0 0 400 480"
                      >
                        <icon-eye></icon-eye>
                      </icon-base>
                      <icon-base
                        v-if="isShowPassword === false"
                        class="icon--eye"
                        width="22px"
                        height="18px"
                        viewBox="0 0 400 480"
                      >
                        <icon-eye-hidden></icon-eye-hidden>
                      </icon-base>
                    </div>
                    <div class="ml_2">
                      <icon-base
                        v-if="statusClassPassed.password"
                        class="icon--check"
                        width="16px"
                        height="16px"
                        viewBox="0 0 20 20"
                      >
                        <icon-check-active></icon-check-active>
                      </icon-base>
                      <icon-base
                        v-if="statusClassError.password"
                        class="icon--attention"
                        width="16px"
                        height="16px"
                        viewBox="0 0 520 520"
                      >
                        <icon-attention></icon-attention>
                      </icon-base>
                      <div class="tooltip--error position_absolute">
                        {{ errorText.password }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End: Password -->
              </div>
              <!-- End: Form Group-->
              <!-- Start: Forgot Password -->
              <div class="text_right mt_2 mb_3">
                <router-link
                  class="text--forgot"
                  :to="{ name: 'check_mail' }"
                  target="_blank"
                >
                  Quên mật khẩu?
                </router-link>
              </div>
              <!-- End: Forgot Password-->
              <!-- Start: Btn Group-->
              <div class="btn--group d_md_flex">
                <div class="btn--control btn--orange mr_3" @click="signIn">
                  Đăng nhập
                </div>
                <router-link
                  class="btn--control btn--white mt_3 mt_md_0"
                  tag="div"
                  to="/signup"
                >
                  Đăng kí
                </router-link>
              </div>
              <!-- End: Btn Group-->
              <div class="mt_3">
                <a
                  class="text--forgot"
                  :href="{ name: 'help' }"
                  target="_blank"
                >
                  Bạn gặp sự cố khi đăng nhập?
                </a>
              </div>
            </div>
            <!-- Start: Main Body-->
          </div>
        </div>
        <!-- End: main -->
      </div>
      <!-- End: Content -->
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
