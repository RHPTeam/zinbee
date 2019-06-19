<template>
  <div class="modal--wrapper">
    <div class="modal--content">
      <!-- Start: Header -->
      <app-header />
      <!-- End: Header -->
      <!-- Start: Main -->
      <app-main />
      <!-- Start: Main -->
      <!-- Start: Footer -->
      <app-footer />
      <!-- Start: Footer -->
    </div>
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
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
