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
          Chúng tôi vừa gửi một email với đường dẫn đặt lại mật khẩu tới email
          của bạn. Vui lòng kiểm tra để khôi phục tài khoản.
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
        <a class="link--group-item mr_3" href="#">Trợ giúp</a>
        <a class="link--group-item mr_3" href="#">Bảo mật</a>
        <a class="link--group-item" href="#">Điều khoản</a>
      </div>
    </div>
    <!-- End: Footer -->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
.session {
  .card {
    background-color: #fff;
    border-color: #ebebeb;
    border-radius: 0.625rem;
    font-size: 0.95rem;
    width: 460px;
    height: 560px;
    .card--body {
      .alert {
        background-color: rgba(255, 248, 230, 0.7);
        border-radius: 0.5rem;
        color: #444;
        font-size: 0.95rem;
        padding: 0.75rem;
      }
      .title {
        font-size: 1.5rem;
        font-weight: 600;
      }
      .form--wrap {
        .form_group {
          .form_control {
            border: 0;
            border-bottom: 1px solid #e4e4e4;
            border-radius: 0;
            font-size: 0.95rem;
            font-weight: 600;
            padding: 0.75rem 0.75rem 0.75rem 2rem !important;
            transition: all 0.4s ease;
            &::placeholder {
              color: #ccc;
              font-size: 0.875rem;
              font-weight: normal;
            }
            &:active,
            &:hover,
            &:focus {
              border-color: #ffb94a;
              box-shadow: none;
              outline: 0;
            }
            &.error {
              border-color: #f96666;
            }
          }
          .icon {
            top: 8px;
            .icon--envelope {
              color: #999;
            }
          }
        }
        .text--error {
          color: #ff3333;
          font-size: 0.825rem;
        }
      }
    }
    .card--footer {
      .btn--submit {
        background-color: #ffb94a;
        border-radius: 0.625rem;
        color: #fff;
        cursor: pointer;
        font-weight: 600;
        padding: 0.5rem 0.75rem;
        transition: all 0.4s ease;
        &:hover {
          background-color: #ff9e4a;
        }
      }
      .link--custom {
        color: #ffb94a;
        font-size: 0.875rem;
        text-transform: uppercase;
      }
    }
  }
  .footer {
    .link--group {
      &-item {
        color: #999;
        font-size: 0.825rem;
        font-weight: 600;
        text-decoration: none;
        opacity: 0.8;
        transition: all 0.4s ease;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}

/* Responsive */
@media screen and (max-width: 576px) {
  .session {
    .card {
      border: 0;
      font-size: 0.875rem;
      width: 100%;
      height: auto;
    }
    .footer {
      .link--group {
        &-item {
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
