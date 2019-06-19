<template>
  <div class="wrapper--header">
    <div class="ct pt_4 pb_5">
      <!-- Start: Header Top -->
      <div class="header--top text_right">
        <router-link :to="{ name: 'user_signin' }" tag="a" class="link--login">
          Đăng nhập
        </router-link>
      </div>
      <!-- End: Header Top -->
      <!-- Start: Header Main -->
      <div class="header--main mt_3">
        <!-- Start: Logo -->
        <div class="logo d_flex align_items_center justify_content_center mb_3">
          <icon-base
            class="icon--logo"
            width="100"
            height="37.41"
            viewBox="0 0 939.92 351.67"
          >
            <icon-logo-black />
          </icon-base>
        </div>
        <!-- Start: Logo -->
        <!-- Start: Alert -->
        <div class="alert--expiration mx_auto p_4">
          <div class="calendar--groups d_flex justify_content_center position_relative mb_4 mt_3">
            <div class="calendar--day d_flex align_items_center justify_content_center position_absolute">19</div>
            <div class="calendar--bg position_relative">
              <div class="rect--small-left position_absolute"></div>
              <div class="rect--small-right position_absolute"></div>
              <div class="rectangle--top position_absolute"></div>
              <div class="rectangle position_absolute"></div>
            </div>
          </div>
          <div class="content text_center">
            <div class="title">
              Tài khoản của bạn đã hết hạn :-(
            </div>
            <div class="desc mt_3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        </div>
        <!-- End: Alert -->
      </div>
      <!-- End: Header Main -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.wrapper--header {
  /*background-image: linear-gradient(135deg,#00c4cc 0,#6e44bd 100%);*/
  background-image: linear-gradient(135deg, #FFC837 10%, #FF8008 100%);
  /*background-image: linear-gradient(135deg,#2f3136 0,#27292c 100%);*/
  .header--top {
    .link--login {
      color: #fff;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
      opacity: 0.85;
      text-decoration: none;
      transition: all 0.4s ease;
      &:hover {
        opacity: 1;
      }
    }
  }
  .header--main {
    .logo {
      color: #666;
      .icon--logo {
        color: #fff;
        opacity: 0.85;
      }
    }
    .alert--expiration {
      background-color: #fff;
      border: 1px solid #e4e4e4;
      border-radius: 0.5rem;
      width: 660px;
      .calendar--groups {
        .calendar--day {
          color: #ff3333;
          font-size: 2.5rem;
          font-weight: 600;
          height: 74px;
          top: 26px;
          width: 120px;
          z-index: 5;
        }
        .calendar--bg {
          height: 100px;
          width: 120px;
          .rect--small-left {
            background-color: #F7F7F7;
            border: 1px solid #e4e4e4;
            border-radius: 0.25rem;
            height: 20px;
            top: -10px;
            left: 20px;
            width: 16px;
            z-index: 4;
          }
          .rect--small-right {
            background-color: #F7F7F7;
            border: 1px solid #e4e4e4;
            border-radius: 0.25rem;
            height: 20px;
            top: -10px;
            right: 20px;
            width: 16px;
            z-index: 4;
          }
          .rectangle {
            border: 1px solid #e4e4e4;
            border-radius: 0.375rem;
            height: 100px;
            top: 0;
            width: 120px;
            z-index: 3;
          }
          .rectangle--top {
            background-color: #F7F7F7;
            border: 1px solid #e4e4e4;
            border-radius: 0.375rem 0.375rem 0 0;
            height: 26px;
            top: 0;
            width: 120px;
            z-index: 2;
          }
        }
      }
      .content {
        .title {
          font-size: 1.5rem;
          font-weight: 600;
        }
        .desc {
          color: #999;
          font-size: .875rem;
        }
      }
    }
  }
}
</style>
