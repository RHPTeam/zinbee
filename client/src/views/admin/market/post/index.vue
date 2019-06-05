<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <!-- Start: Content -->
      <div class="main--content">
        <!-- Start: Navigation -->
        <app-navigation />
        <!-- End: Navigation -->
        <transition name="slide-fade">
          <router-view :key="$route.path" />
        </transition>
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import AppNavigation from "./layouts/navigation/index";
export default {
  components: {
    AppNavigation
  }
};
</script>

<style lang="scss" scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
  animation: fadeInRight 1s;
}
.slide-fade-leave-active {
  transition: all 0.1s ease;
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
