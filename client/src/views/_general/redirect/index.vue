<template>
  <div class="redirect">
    Đang chuyển trang vui lòng chờ ít giây ...
  </div>
</template>

<script>
import CookieFunction from "@/utils/functions/cookie";
export default {
  async created() {
    CookieFunction.removeCookie("sid");
    CookieFunction.removeCookie("uid");
    CookieFunction.removeCookie("cfr");
    CookieFunction.removeCookie("token");
    CookieFunction.removeCookie("_sub");
    CookieFunction.removeCookie("__v");
    this.$router.push({ name: "user_signin" });
  }
};
</script>

<style scoped></style>
