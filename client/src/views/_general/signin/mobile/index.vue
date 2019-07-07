<template>
  <div class="wrapper--modal-mobile p_3">
    <div class="wrapper--content">
      <div class="items--header text_center mb_3">
        <icon-base
          icon-name="ZinBee"
          width="210.21"
          height="78.65"
          viewBox="0 0 250.446 93.703"
        >
          <icon-logo />
        </icon-base>
      </div>
      <div class="items--body main">
        <h4 class="title text_center">Đăng nhập</h4>
        <!-- Start: Form Body -->
        <form @submit.prevent="signIn" class="form--body">
          <div class="form_group position_relative">
            <div class="icon position_absolute">
              <icon-base
                icon-name="Email"
                width="20.554"
                height="15.713"
                viewBox="0 0 20.554 15.713"
              >
                <icon-envelope />
              </icon-base>
            </div>

            <input id="emailField" type="email" placeholder="Email" />
          </div>
          <!-- <div class="text--error">{{ errorText.email }}</div> -->
          <div class="form_group position_relative">
            <div class="icon position_absolute">
              <icon-base
                icon-name="Mật khẩu"
                width="14.782"
                height="18.55"
                viewBox="0 0 14.782 18.55"
              >
                <icon-lock />
              </icon-base>
            </div>
            <input id="passwordField" type="password" placeholder="Mật khẩu" />
          </div>
          <!-- <div class="text--error">{{ errorText.password }}</div> -->
          <div class="form--action mb_2">
            <button type="submit" class="btn btn--submit">
              <!-- {{
                this.$store.getters.authStatus === "loading"
                  ? "Đang đăng nhập..."
                  : "Đăng nhập"
              }}-->
              Đăng nhập
            </button>
          </div>
        </form>
        <!-- End: Form Body -->
      </div>
      <div class="items--footer text_center mt_3">
        <div class="top">
          <router-link
            :to="{ name: 'check_mail' }"
            class="forgot--pass text_left d_block text_center mb_3"
            >Quên mật khẩu?</router-link
          >
          <router-link
            :to="{ name: 'check_mail' }"
            class="forgot--pass text_left d_block text_center mb_3"
            >Bạn đang gặp sự cố?</router-link
          >
        </div>
        <div class="bottom mt_auto">
          <p class="choose--options text_center my_2">HOẶC</p>
          <div class="answer">
            <span>
              Bạn chưa có tài khoản?
              <router-link to="/signup">Đăng ký ngay</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scope>
.title {
  color: #666666;
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.75rem;
}
.items--header {
  max-height: 82px;
}
.items--footer {
  .bottom {
    .answer {
      color: #8a8a8a;
      font-size: 0.8rem;
      line-height: 1.33;
    }
  }
  .choose--options {
    position: relative;
    &::before {
      position: absolute;
      content: "";
      width: 28%;
      height: 1px;
      top: 53%;
      left: 10%;
      z-index: -1;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      background: #8a8a8a;
    }

    &::after {
      position: absolute;
      content: "";
      width: 28%;
      height: 1px;
      top: 53%;
      right: 10%;
      z-index: -1;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      background: #8a8a8a;
    }
  }
}
</style>
