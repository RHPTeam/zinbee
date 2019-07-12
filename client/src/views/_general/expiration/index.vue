<template>
  <div class="wrapper">
    <!-- Start: App desktop -->
    <div class="d_none d_md_block">
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
    <div class="d_block d_md_none">
      <app-header></app-header>
      <div class="contact--fb text_center p_3 mt_3">
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
  height: 100vh;
  width: 100vw;
  background-color: #f7f7f7;
}
.contact--fb {
  a {    
    background: #ecbf7b;
    display: block;
    padding: 0.625rem 0;
    border-radius: 0.625rem;
    color: #fff;
  }
}
</style>
