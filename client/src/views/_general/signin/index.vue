<template>
  <div
    class="main ct_f p_0 position_relative"
    :style="{ backgroundImage: 'url(' + srcDefaultLogin + ')' }"
  >
    <div class="main--above position_absolute"></div>
    <div class="r m_0">
      <!-- Start: Intro Video -->
      <div class="c_12 c_md_12 c_xl_8 p_0 main--video d_none d_xl_block">
        <app-intro-video />
      </div>
      <!-- End: Intro Video -->
      <!-- Start: Main Form -->
      <div class="c_12 c_md_12 c_xl_4 p_0 main--form">
        <div
          class="form--wrap m_auto d_flex flex_column justify_content_center align_items_center"
        >
          <!-- Start: Form Header -->
          <div class="from--header">
            <div class="header--logo">
              <icon-base
                icon-name="logo"
                width="210.21"
                height="78.65"
                viewBox="0 0 250.446 93.703"
              >
                <icon-logo />
              </icon-base>
            </div>
            <!-- Start: Alert -->
            <!--Start: Notification change password success -->
            <app-alert
              :type="
                this.$store.getters.statusResetPassword === true
                  ? 'alert_success'
                  : ''
              "
              :message="
                this.$store.getters.statusResetPassword === true
                  ? 'Bạn đã đặt lại mật khẩu thành công!'
                  : ''
              "
            ></app-alert>
            <!--End: Notification change password success -->
            <app-alert
              :type="
                this.$store.getters.authError === '401' ? 'alert_danger' : ''
              "
              :message="
                this.$store.getters.authError === '401'
                  ? 'Tài khoản email hoặc mật khẩu không đúng!'
                  : ''
              "
            ></app-alert>
            <app-alert
              :type="
                this.$store.getters.authError === '405' ? 'alert_danger' : ''
              "
              :message="
                this.$store.getters.authError === '405'
                  ? 'Tài khoản của bạn đã hết hạn hoặc bị ngừng truy cập!'
                  : ''
              "
            ></app-alert>
            <!-- End: Alert -->
            <h3 class="title text_center">Đăng nhập</h3>
          </div>
          <!-- End: Form Header -->
          <!-- Start: Form Body -->
          <form @submit.prevent="signIn" class="form--body">
            <div
              class="form_group position_relative"
              :class="{
                errors: statusClassError.email,
                passed: statusClassPassed.email
              }"
            >
              <div class="icon position_absolute">
                <icon-base
                  icon-name="envelope"
                  width="20.554"
                  height="15.713"
                  viewBox="0 0 20.554 15.713"
                >
                  <icon-envelope />
                </icon-base>
              </div>

              <input
                id="emailField"
                type="email"
                placeholder="Email"
                v-model="user.email"
              />
            </div>
            <div class="text--error">{{ errorText.email }}</div>
            <div
              class="form_group position_relative"
              :class="{
                errors: statusClassError.password,
                passed: statusClassPassed.password
              }"
            >
              <div class="icon position_absolute">
                <icon-base
                  icon-name="lock"
                  width="14.782"
                  height="18.55"
                  viewBox="0 0 14.782 18.55"
                >
                  <icon-lock />
                </icon-base>
              </div>
              <input
                id="passwordField"
                type="password"
                placeholder="Mật khẩu"
                v-model="user.password"
              />
            </div>
            <div class="text--error">{{ errorText.password }}</div>
            <router-link
              :to="{ name: 'check_mail' }"
              class="forgot--pass text_left d_block"
              >Quên mật khẩu?</router-link
            >
            <div class="form--action">
              <button type="submit" class="btn btn--submit">
                {{
                  this.$store.getters.authStatus === "loading"
                    ? "Đang đăng nhập..."
                    : "Đăng nhập"
                }}
              </button>
            </div>
          </form>
          <!-- End: Form Body -->
          <!-- Start: Form Footer -->
          <div class="form--footer text_left">
            <div class="form--footer-note">
              <span
                >Bạn chưa có tài khoản?
                <router-link to="/signup">Đăng ký ngay</router-link>
              </span>
            </div>
          </div>
          <!-- End: Form Footer -->
        </div>
      </div>
      <!-- End: Main Form -->
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "../styles/index.style";
</style>
