<template>
  <div>
    <div class="position_absolute" style="bottom: 1rem; left: 1rem;">

      <!-- Then put toasts within -->
      <div class="toast fade show" role="alert" data-autohide="false" aria-live="assertive" aria-atomic="true" v-for="facebook in accountFacebookList" :key="facebook._id" v-if="accountFacebookList.length > 0 && facebook.status === false" @click="goToAccountFacebook">
        <div class="toast--header">
          <svg class="bd--placeholder-img rounded mr_2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect fill="#007aff" width="100%" height="100%"></rect></svg>
          <strong class="mr_auto">Thông báo</strong>
          <small class="text_muted">vừa xong</small>
          <button type="button" class="ml_2 mb_1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="toast--body">
          Chúng tôi nhận thấy rằng, bạn đã đăng xuất tài khoản <b class="im">{{ facebook.userInfo.name }}</b> trên facebook. Vui lòng cập nhật lại mã kích hoạt tài khoản facebook tại đây!
        </div>
      </div>

      <!-- Then put toasts within -->
      <div class="toast fade show" role="alert" data-autohide="false" aria-live="assertive" aria-atomic="true" v-if="statusNetwork === false">
        <div class="toast--header">
          <svg class="bd--placeholder-img rounded mr_2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect fill="#007aff" width="100%" height="100%"></rect></svg>
          <strong class="mr_auto">Thông báo</strong>
          <small class="text_muted">vừa xong</small>
          <button type="button" class="ml_2 mb_1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="toast--body">
          Chúng tôi nhận thấy rằng, kết nối mạng của bạn bị <span class="im">mất</span>, hoặc <span class="im">quá yếu</span>. Vui lòng kiểm tra lại đường truyền mạng để có được trải nghiệp tốt nhất trên hệ thống!
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    statusNetwork: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    accountFacebookList() {
      return this.$store.getters.allAccountFb;
    }
  },
  methods: {
    goToAccountFacebook() {
      this.$router.push({name: "f_account"});
    }
  }
}
</script>
<style lang="scss" scoped>
  .close {
    font-size: 1.3125rem;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
  }

  button.close {
    padding: 0;
    background-color: transparent;
    border: 0;
  }

  .toast {
    background-clip: padding-box;
    cursor: pointer;
    overflow: hidden;
  }

  .toast {
    max-width: 280px;
    font-size: .875rem;
    border: 1px solid rgba(0,0,0,.1);
    box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.1);
    backdrop-filter: blur(10px);
    border-radius: .25rem;
    &.show {
      display: block;
      opacity: 1;
    }
    &:not(:last-child) {
      margin-bottom: .75rem;
    }
    &--header {
      display: flex;
      align-items: center;
      padding: .25rem .75rem;
      color: #6c757d;
      border-bottom: 1px solid rgba(0,0,0,.05);
    }
    &--body {
      background-color: rgb(255, 255, 255);
      color: rgba( 0, 0, 0, .6);
      padding: .75rem;
    }
  }

  .toast, .toast--header {
    background-color: rgba(255,255,255,.85);
  }

  .fade {
    transition: opacity .15s linear;
  }

  .im {
    color: rgba(255, 0, 3, 0.56);
  }
</style>
