<template>
  <div class="wrapper">
    <div
      class="wrapper--content d_flex align_items_center justify_content_center"
    >
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      srcDefault: require("@/assets/images/wave.svg")
    };
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: rgba(255, 248, 230, 0.7);
  height: 100vh;
  &--content {
    height: 100%;
  }
}

/* Responsive */
@media screen and (max-width: 576px) {
  .wrapper {
    &--content {
      background-color: #fff;
    }
  }
}
</style>
