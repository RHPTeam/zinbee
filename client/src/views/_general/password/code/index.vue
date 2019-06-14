<template>
  <form @submit.prevent="sendCode" class="text_center">
    <div class="form--reset-logo">
      <icon-base
        icon-name="logo"
        width="210.21"
        height="78.65"
        viewBox="0 0 250.446 93.703"
      >
        <icon-logo />
      </icon-base>
    </div>
    <div class="form--reset-img mt_4">
      <img
        src="http://source.unsplash.com/random/70x70"
        width="70"
        height="70"
        alt=""
      />
      <h4>{{ userInfo.name }}</h4>
    </div>
    <div class="form--reset-title">
      Chúng tôi vừa gửi một mã xác minh tới email của bạn. Nhập vào form bên
      dưới để xác minh tài khoản.
    </div>
    <div class="text_danger mt_2 mb_2">
      Chú ý CODE được gửi đến email chỉ có hiệu lực kích hoạt trong vòng 3 phút.
      Vui lòng hoàn thành thay đổi mật khẩu của bạn trong khoảng thời gian này.
    </div>
    <div
      class="form_group position_relative"
      :class="{
        errors: statusClassError,
        passed: statusClassPassed
      }"
    >
      <div class="icon position_absolute">
        <icon-base
          class="ic--security"
          icon-name="security"
          width="22"
          height="22"
          viewBox="0 0 20 20"
        >
          <icon-security />
        </icon-base>
      </div>
      <input
        type="text"
        class="form_control"
        placeholder="Nhập mã xác minh"
        v-model="code"
      />
    </div>
    <div class="text--error">{{ errorText }}</div>
    <button type="submit" class="btn form_control">Tiếp theo</button>
    <div class="form--redirect mb_1"><a href="#">Trở lại</a></div>
  </form>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "../style/index.style";
</style>
