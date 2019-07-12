<template>
  <div class="modal--wrapper">
    <VuePerfectScrollbar class="scroll-homepage" @ps-scroll-y="scrollHandle" ref="menu">
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
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import AppHeader from "./header";
import AppMain from "./main";
import AppFooter from "./footer";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    AppHeader,
    AppMain,
    AppFooter,
    VuePerfectScrollbar
  },
  data() {
    return {};
  },
  methods: {
    scrollHandle(evt) {
      // Position ScrollTop = evt.srcElement.scrollTo
      if (evt.srcElement.scrollTop === 0) {
        this.$store.dispatch("changeBackgroundHeader", 1);
      } else {
        this.$store.dispatch("changeBackgroundHeader", 2);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal--wrapper {
  .scroll-homepage {
    height: 100vh;
    width: 100vw;
  }
}
</style>
