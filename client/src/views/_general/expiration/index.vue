<template>
  <div class="wrapper">
    <!-- Start: App desktop -->
    <div class="d_block d_md_none">
      <!-- Start: Header -->
      <app-header></app-header>
      <!-- End: Header -->
      <!-- Start: Main -->
      <app-main></app-main>
      <!-- End: Main -->
      <!-- Start: Footer -->
      <app-footer />
      <!-- End: Footer -->
    </div>
    <!-- End: App desktop -->
    <!-- Start: App mobile -->
    <div class="d_none d_md_block">
      <app-header></app-header>
      <div class="contact--fb text_center">
        <a href="https://www.facebook.com/zinbeeauto/">Liên hệ ngay</a>
      </div>
    </div>
    <!-- End: App mobile -->
  </div>
</template>

<script>
import AppHeader from "./header";
import AppMain from "./main";
import AppFooter from "./footer";

export default {
  components: {
    AppHeader,
    AppMain,
    AppFooter
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #f7f7f7;
}
.contact--fb {
  background: red;
  display: block;
  padding: 0.625rem 0;
}
</style>
