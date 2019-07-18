<template>
  <div class="wrapper position_relative">
    <div class="container">
      <!-- Start: Logo -->
      <div class="wrapper--logo position_absolute">
        <!-- Start: Logo Xl Screen -->
        <icon-base
          class="d_none d_xxl_block"
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
          class="d_none d_md_block d_xxl_none"
          icon-name="ZinBee"
          width="100"
          height="49.73"
          viewBox="0 0 250.446 93.703"
        >
          <icon-logo></icon-logo>
        </icon-base>
        <!-- End: Logo Large Screen -->
      </div>
      <div class="wrapper--logo d_md_none text_center mt_5">
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
              <div class="d_none d_md_block title mb_3">Đến với Zinbee</div>
              <div class="desc">
                Công cụ hỗ trợ marketing, bán hàng online siêu hiệu quả, giúp
                bạn tiết kiệm thời gian và chi phí.
              </div>
            </div>
            <!-- End: Main Header-->
            <!-- Start: Alert -->
            <div
              v-if="this.$store.getters.authError.status === 'error'"
              class="alert--error position_relative mt_3"
            >
              {{ this.$store.getters.authError.message }}
            </div>
            <!-- End: Alert -->
            <!-- Start: Main Body-->
            <div class="main--body my_4 mb_md_5">
              <form @submit.prevent="submit()">
                <!-- Start: Form Group-->
                <div class="form--group">
                  <!-- Start: Name -->
                  <div
                    class="form--card d_flex align_items_center position_relative px_3"
                  >
                    <div class="form--icon mr_3">
                      <icon-base
                        class="icon--user"
                        width="26px"
                        height="26px"
                        viewBox="0 0 22 22"
                      >
                        <icon-user></icon-user>
                      </icon-base>
                    </div>
                    <div class="form--control mr_2">
                      <div class="desc">Họ tên</div>
                      <input
                        type="text"
                        class="form--input"
                        placeholder="Nguyễn Văn A"
                        v-model="user.name"
                      />
                    </div>
                    <div class="form--validate">
                      <icon-base
                        v-if="statusClassPassed.name"
                        class="icon--check"
                        width="16px"
                        height="16px"
                        viewBox="0 0 20 20"
                      >
                        <icon-check-active></icon-check-active>
                      </icon-base>
                      <icon-base
                        v-if="statusClassError.name"
                        class="icon--attention"
                        width="16px"
                        height="16px"
                        viewBox="0 0 520 520"
                      >
                        <icon-attention></icon-attention>
                      </icon-base>
                      <div class="tooltip--error position_absolute">
                        {{ errorText.name }}
                      </div>
                    </div>
                  </div>
                  <!-- End: Name -->
                  <!-- Start: Phone -->
                  <div
                    class="form--card d_flex align_items_center position_relative px_3"
                  >
                    <div class="form--icon mr_3">
                      <icon-base
                        class="icon--phone"
                        width="26px"
                        height="26px"
                        viewBox="0 0 23 23"
                      >
                        <icon-phone></icon-phone>
                      </icon-base>
                    </div>
                    <div class="form--control mr_2">
                      <div class="desc">Số điện thoại</div>
                      <input
                        type="text"
                        class="form--input"
                        placeholder="0981234xxx"
                        v-model="user.phone"
                      />
                    </div>
                    <div class="form--validate">
                      <icon-base
                        v-if="statusClassPassed.phone"
                        class="icon--check"
                        width="16px"
                        height="16px"
                        viewBox="0 0 20 20"
                      >
                        <icon-check-active></icon-check-active>
                      </icon-base>
                      <icon-base
                        v-if="statusClassError.phone"
                        class="icon--attention"
                        width="16px"
                        height="16px"
                        viewBox="0 0 520 520"
                      >
                        <icon-attention></icon-attention>
                      </icon-base>
                      <div class="tooltip--error position_absolute">
                        {{ errorText.phone }}
                      </div>
                    </div>
                  </div>
                  <!-- End: Phone -->
                  <!-- Start: Presenter Code -->
                  <div
                    class="form--card d_flex align_items_center position_relative px_3"
                  >
                    <div class="form--icon mr_3">
                      <icon-base
                        class="icon--security"
                        width="26px"
                        height="26px"
                        viewBox="0 0 20 20"
                      >
                        <icon-security></icon-security>
                      </icon-base>
                    </div>
                    <div class="form--control mr_2">
                      <div class="desc">Mã giới thiệu</div>
                      <input
                        type="text"
                        class="form--input"
                        placeholder="K009"
                        v-model="user.presenter"
                      />
                    </div>
                    <div class="form--validate">
                      <icon-base
                        v-if="statusClassPassed.presenter"
                        class="icon--check"
                        width="16px"
                        height="16px"
                        viewBox="0 0 20 20"
                      >
                        <icon-check-active></icon-check-active>
                      </icon-base>
                      <icon-base
                        v-if="statusClassError.presenter"
                        class="icon--attention"
                        width="16px"
                        height="16px"
                        viewBox="0 0 520 520"
                      >
                        <icon-attention></icon-attention>
                      </icon-base>
                      <div class="tooltip--error position_absolute">
                        {{ errorText.presenter }}
                      </div>
                    </div>
                  </div>
                  <!-- End: Presenter Code -->
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
                  <!-- Start: Confirm Password -->
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
                        <icon-lock-check></icon-lock-check>
                      </icon-base>
                    </div>
                    <div class="form--control mr_2">
                      <div class="desc">Xác nhận mật khẩu</div>
                      <input
                        v-if="isShowConfirmPassword === false"
                        type="password"
                        class="form--input"
                        placeholder="Nhập lại mật khẩu"
                        v-model="confirmPassword"
                      />
                      <input
                        v-if="isShowConfirmPassword === true"
                        type="text"
                        class="form--input"
                        placeholder="Nhập lại mật khẩu"
                        v-model="confirmPassword"
                      />
                    </div>
                    <div class="form--validate d_flex align_items_center">
                      <div
                        @click="isShowConfirmPassword = !isShowConfirmPassword"
                      >
                        <icon-base
                          v-if="isShowConfirmPassword === true"
                          class="icon--eye"
                          width="22px"
                          height="18px"
                          viewBox="0 0 400 480"
                        >
                          <icon-eye></icon-eye>
                        </icon-base>
                        <icon-base
                          v-if="isShowConfirmPassword === false"
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
                          v-if="statusClassPassed.confirmPassword"
                          class="icon--check"
                          width="16px"
                          height="16px"
                          viewBox="0 0 20 20"
                        >
                          <icon-check-active></icon-check-active>
                        </icon-base>
                        <icon-base
                          v-if="statusClassError.confirmPassword"
                          class="icon--attention"
                          width="16px"
                          height="16px"
                          viewBox="0 0 520 520"
                        >
                          <icon-attention></icon-attention>
                        </icon-base>
                        <div class="tooltip--error position_absolute">
                          {{ errorText.confirmPassword }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- End: Confirm Password -->
                </div>
                <!-- End: Form Group-->
                <!-- Start: Btn Group-->
                <div class="btn--group d_md_flex mt_4">
                  <button
                    type="submit"
                    class="btn--control btn--orange mr_3"
                    @click="submit()"
                  >
                    Đăng kí
                  </button>
                  <router-link
                    class="btn--control btn--white mt_3 mt_md_0"
                    tag="div"
                    to="/signin"
                  >
                    Đăng nhập
                  </router-link>
                </div>
                <!-- End: Btn Group-->
              </form>
              <div class="mt_3">
                <a
                  class="text--forgot"
                  :href="{ name: 'help' }"
                  target="_blank"
                >
                  Bạn gặp sự cố khi tạo tài khoản?
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
    <!--**************POPUP*****************-->
    <transition name="popup">
      <server-popup v-if="false"></server-popup>
    </transition>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "../signin/index.style";
</style>
