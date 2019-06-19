<template>
  <div class="copy">
    <div class="ct m_auto d_flex align_items_center">
      <div>Copyright © 2018 zinbee.vn</div>
      <div class="ml_auto d_flex contact">
        <div class="icon">
          <a href="https://www.facebook.com/zinbeeauto/" target="_blank">
            <icon-base
              class="facebook"
              icon-name="facebook"
              width="30"
              height="30"
              viewBox="0 0 105 105"
            >
              <icon-facebook />
            </icon-base>
          </a>
        </div>
        <div class="items">Liên hệ hỗ trợ</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
a {
  color: inherit;
}
.copy {
  background: linear-gradient(to right, #000 0%, #0e1f2c 100%);
  padding: 36px 0px;
  color: #fff;
  .contact {
    .items {
      padding: 0 1rem;
      font: 700 16px/28px "Open Sans", sans-serif;
    }
  }
}
</style>
