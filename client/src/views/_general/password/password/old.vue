<template>
  <form @submit.prevent="sendPassword" class="text_center">
    <div class="">
      <icon-base
        icon-name="ZinBee"
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
      Xác minh tài khoản thành công. Bây giờ, bạn đã có thể đặt lại mật khẩu của
      mình.
    </div>
    <div
      class="form_group position_relative"
      :class="{
        errors: statusClassError.password,
        passed: statusClassPassed.password
      }"
    >
      <div class="icon position_absolute">
        <icon-base
          class="ic--lock"
          icon-name="Mật khẩu"
          width="14.782"
          height="18.55"
          viewBox="0 0 14.782 18.55"
        >
          <icon-lock />
        </icon-base>
      </div>
      <input
        type="password"
        class="form_control"
        placeholder="Nhập mật khẩu mới"
        v-model="reset.password"
      />
    </div>
    <div class="text--error">{{ errorText.password }}</div>
    <div
      class="form_group position_relative password--comfirm"
      :class="{
        errors: statusClassError.confirmPassword,
        passed: statusClassPassed.confirmPassword
      }"
    >
      <div class="icon position_absolute">
        <icon-base
          class="ic--lock-check"
          icon-name="Mật khẩu"
          width="14.8"
          height="18.604"
          viewBox="0 0 14.8 18.604"
        >
          <icon-lock-check />
        </icon-base>
      </div>
      <input
        type="password"
        class="form_control"
        placeholder="Nhập lại mật khẩu mới"
        v-model="reset.confirmPassword"
      />
    </div>
    <div class="text--error">{{ errorText.confirmPassword }}</div>
    <button type="submit" class="btn form_control">
      Xác nhận
    </button>
    <div class="mb_1 link--custom"><a href="/signin">Đăng nhập</a></div>
  </form>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
</style>
