<template>
  <div class="session">
    <div class="logo text_center mb_0 mb_sm_2">
      <icon-base
        icon-name="ZinBee"
        width="100"
        height="49.73"
        viewBox="0 0 250.446 93.703"
      >
        <icon-logo></icon-logo>
      </icon-base>
    </div>
    <!-- Start: Card -->
    <div class="card px_5 py_4 text_center">
      <!-- Start: Header -->
      <div class="card--header mt_4 mb_3">
        <icon-base width="100" height="100" viewBox="0 0 280 280">
          <icon-reset-password></icon-reset-password>
        </icon-base>
      </div>
      <!-- End: Header -->
      <!-- Start: Body -->
      <div class="card--body">
        <div class="title mt_2"></div>
        <div class="alert mt_4">
          Chúng tôi vừa gửi một email với đường dẫn đặt lại mật khẩu tới
          <span class="text--bold">{{ email }}</span
          >. Vui lòng kiểm tra email để khôi phục tài khoản của bạn.
        </div>
      </div>
      <!-- End: Body -->
      <!-- Start: Footer -->
      <div class="card--footer mt_3">
        <div class="btn--submit mb_5" @click="gotoEmail">Đi tới email</div>
        <router-link class="link--custom" to="/signin">Đăng nhập</router-link>
      </div>
      <!-- End: Footer -->
    </div>
    <!-- End: Card -->
    <!-- Start: Footer -->
    <div class="footer d_flex justify_content_center mt_2">
      <div class="link--group">
        <a
          class="link--group-item mr_3"
          href="https://www.zinbee.vn/#/help"
          target="_blank"
          >Trợ giúp</a
        >
        <a
          class="link--group-item mr_3"
          href="https://www.zinbee.vn/#/help"
          target="_blank"
          >Bảo mật</a
        >
        <a
          class="link--group-item"
          href="https://www.zinbee.vn/#/help"
          target="_blank"
          >Điều khoản</a
        >
      </div>
    </div>
    <!-- End: Footer -->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
