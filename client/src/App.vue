<template>
  <div id="app">
    <VuePerfectScrollbar class="scroll-area" ref="scroll">
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
</style>
