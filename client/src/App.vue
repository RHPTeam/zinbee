<template>
  <div id="app">
    <VuePerfectScrollbar class="scroll-area">
      <router-view />
    </VuePerfectScrollbar>
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .scroll-area {
    position: relative;
    height: 100vh;
  }
}
// RESPONSIVE
@media screen and (max-width: 767px) {
  #app {
    .ps > .ps__scrollbar-y-rail > .ps__scrollbar-y,
    .ps > .ps__scrollbar-x-rail > .ps__scrollbar-x,
    .ps:hover > .ps__scrollbar-y-rail:hover,
    .ps.ps--active-x > .ps__scrollbar-x-rail,
    .ps.ps--active-y > .ps__scrollbar-y-rail {
      display: none;
    }
  }
}
</style>
