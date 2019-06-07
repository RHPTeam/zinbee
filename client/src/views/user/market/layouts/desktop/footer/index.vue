<template>
  <div class="wrap--footer pt_4 pb_3">
    <div class="m_0 text_center content">
      <div class="d_inline_flex">
        <div class="copyright d_flex align_items_center mr_3">
          <icon-base
            icon-name="logo"
            width="20"
            height="20"
            viewBox="0 0 220 220"
          >
            <icon-logo-icon />
          </icon-base>
          <div class="ml_1">Zinbee © 2019</div>
        </div>
        <div class="language d_flex align_items_center">
          <div class="text">Tiếng Việt</div>
          <div class="icon--edit ml_1">
            <icon-base
              icon-name="edit"
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <icon-edit />
            </icon-base>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap--footer {
  background-color: #eeeeee;
  color: #666666;
  font-size: 0.875rem;
  .language {
    color: #666;
    cursor: pointer;
    .icon--edit {
      margin: 0;
      color: #999999;
    }
    .text {
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
