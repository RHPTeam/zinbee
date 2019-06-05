<template>
  <div class="wrapper">
    <!-- Start: Desktop Component-->
    <div class="wrap--content d_none d_md_block">
      <div class="wrap--content-header">
        <app-header />
      </div>
      <div class="wrap--content-main">
        <router-view />
      </div>
      <div class="wrap--content-footer">
        <app-footer />
      </div>
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>
<script src="./index.script.js"></script>

<style lang="scss" scoped>
.wrapper {
  color: #666;
  background-color: #fff;
  min-height: 100vh;
  .wrap--content-main {
    width: 100%;
  }
  .wrap--content-mobile {
    background-color: #fff;
  }
  .wrap--content-footer {
    background-color: #f7f7f7;
  }
  .mobile-scroll {
    height: calc(100vh - 110px);
  }
}
</style>
