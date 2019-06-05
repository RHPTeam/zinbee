<template>
  <div class="main">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getAllCategoryDefault");
    this.$store.dispatch("getAllPostLibraries");
  }
};
</script>

<style scoped></style>
