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
    const dataSender = {
      size: 25,
      page: 1
    };
    this.$store.dispatch("getAllMarketPosts", dataSender);
  }
};
</script>

<style scoped></style>
