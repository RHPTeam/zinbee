<template>
  <div class="redirect">
    Đang chuyển trang vui lòng chờ ít giây ...
  </div>
</template>

<script>
export default {
  async created() {
    await localStorage.clear();
    this.$router.push({ name: "user_signin" });
  }
};
</script>

<style scoped></style>
