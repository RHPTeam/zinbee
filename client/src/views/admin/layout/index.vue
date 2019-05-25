<template>
  <div class="wrapper" :data-theme="currentTheme">
    <!-- Start: Desktop Component-->
    <div class="wrap--content d_none d_md_flex">
      <div class="wrap--content-sidebar">
        <app-sidebar />
      </div>
      <div class="wrap--content-main">
        <app-header />
        <router-view />
      </div>
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>
<script src="./index.script.js"></script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  .wrap--content-main {
    width: 100%;
    padding: 30px 60px 60px 0;
  }
  .mobile-scroll {
    height: calc(100vh - 110px);
  }
}

.wrapper[data-theme="light"] {
  color: #666;
  background-color: #f7f7f7;
  .wrap--content-mobile {
    background-color: #fff;
  }
  // background-color: #ddd;
}

.wrapper[data-theme="dark"] {
  color: #ccc;
  background-color: #2f3136;
}
</style>
