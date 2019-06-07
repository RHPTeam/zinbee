<template>
  <div class="banner-root">
    <div class="banner-container">
      <div class="headerstrip-wrapper">
        <button
          title="dismiss"
          type="button"
          class="js-banner__dismiss headerstrip__banner-dismiss"
        >
          <svg
            class="headerstrip__dismiss-icon"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.8 2.4c.3.3.3.8 0 1.1l-6 6c-.3.3-.3.8 0 1.1l6 6c.3.3.3.8 0 1.1l-2.2 2.2c-.3.3-.8.3-1.1 0l-6-6c-.3-.3-.8-.3-1.1 0l-6 6c-.3.3-.8.3-1.1 0L.1 17.7c-.3-.3-.3-.8 0-1.1l6-6c.3-.3.3-.8 0-1.1l-6-6c-.3-.3-.3-.8 0-1.1L2.3.2c.3-.3.8-.3 1.1 0l6 6c.3.3.8.3 1.1 0l6-6c.3-.3.8-.3 1.1 0l2.2 2.2z"
            ></path>
          </svg>
        </button>
        <a
          class="headerstrip js-banner__link"
          @click.prevent="$router.push({ name: 'market_home' })"
        >
          <div class="headerstrip-content-background"></div>
          <div class="headerstrip-canvas is-hidden-desktop">
            <div class="headerstrip-content">
              <div class="headerstrip-text">
                <strong>
                  Đăng ký ngay hôm nay để trải nghiệm đầy đủ các chức năng!!!
                </strong>
                <span
                  class="js-banner__link headerstrip-cta-mobile"
                  @click.prevent="$router.push({ name: 'market_home' })"
                  >Trải nghiệm ngay</span
                >
              </div>
            </div>
          </div>
          <div class="headerstrip-canvas is-hidden-tablet-and-below">
            <div class="headerstrip-content">
              <div class="headerstrip-text">
                <strong>Đăng ký ngay để trải nghiệm đầy đủ các chức năng:</strong>
                Bài viết, chiến dịch, quản lý nhóm, thống kê, ...!
              </div>
              <span
                class="js-banner__link headerstrip-cta"
                @click.prevent="$router.push({ name: 'market_home' })"
                >Trải nghiệm ngay</span
              >
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./index.style";
</style>
