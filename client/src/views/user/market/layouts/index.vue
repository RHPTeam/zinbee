<template>
  <div class="wrapper" :data-theme="currentTheme">
    <!-- Start: Desktop Component-->
    <div class="wrap--content d_none d_md_flex">
      <div class="wrap--content-main">
        <!-- Start: Root Banner-->
        <app-root-banner v-if="false"/>
        <!-- End: Root Banner-->
        <!-- Start: Header-->
        <div class="main--header">
          <app-header />
        </div>
        <!-- End: Header-->
        <!-- Start: Navigation-->
        <div class="nav">
          <app-navigation />
        </div>
        <!-- End: Navigation-->
        <!-- Start: Content-->
        <div class="main--content">
          <router-view />
        </div>
        <!-- End: Content-->
        <!-- Start: Footer-->
        <div class="main--footer">
          <app-footer />
        </div>
        <!-- End: Footer-->
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
