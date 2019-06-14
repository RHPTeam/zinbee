<template>
  <div class="redirect">
    Đang chuyển trang vui lòng chờ ít giây ...
  </div>
</template>

<script>
import CookieFunction from "@/utils/functions/cookie";
export default {
  async created() {
    //remove Cookie
    await CookieFunction.removeCookie("sid");
    await CookieFunction.removeCookie("uid");
    await CookieFunction.removeCookie("cfr");
    await CookieFunction.removeCookie("token");
    await CookieFunction.removeCookie("_sub");
    await CookieFunction.removeCookie("__v");
    //redirect to signin
    this.$router.push({ name: "user_signin" });
  }
};
</script>

<style scoped></style>
