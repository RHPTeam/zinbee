<template>
  <div class="actions">
    <!-- Start: Desktop -->
    <div class="d_md_block d_none">
      <app-desktop />
    </div>
    <!-- End: Desktop -->
  </div>
</template>

<script>
import AppDesktop from "./desktop";
export default {
  components: {
    AppDesktop
  }
};
</script>

<style scoped></style>
