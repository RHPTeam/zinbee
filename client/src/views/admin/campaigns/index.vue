<template>
  <div class="main">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getAllCategoryDefault");
    this.$store.dispatch("getAllCampaign");
    this.$store.dispatch("getAllMarketPosts");
  }
};
</script>

<style scoped></style>
