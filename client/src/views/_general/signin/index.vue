<template>
  <div class="wrapper--main">
    <div class="wrapper--content">
      <!-- Start: Sign In Desktop -->
      <div class="d_md_block d_none">
        <app-desktop />
      </div>
      <!-- End: Sign In Desktop -->
      <!-- Start: Sign In Mobile -->
      <div class="d_block d_md_none">
        <app-mobile />
      </div>
      <!-- End: Sign In Mobile -->
    </div>
  </div>
</template>

<script>
import AppDesktop from "./desktop";
import AppMobile from "./mobile";
export default {
  components: {
    AppDesktop,
    AppMobile
  }
};
</script>

<style lang="scss" scoped></style>
