<template>
  <div class="wrapper">
    <!-- Start: Header -->
    <app-header></app-header>
    <!-- End: Header -->
    <!-- Start: Main -->
    <app-main></app-main>
    <!-- End: Main -->
  </div>
</template>

<script>
import AppHeader from "./header";
import AppMain from "./main";

export default {
  components: {
    AppHeader,
    AppMain
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #F7F7F7;
}
</style>
