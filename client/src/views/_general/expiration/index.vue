<template>
  <div class="wrapper">
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
</style>
