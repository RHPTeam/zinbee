<template>
  <span>Đang chuyển hướng</span>
</template>

<script>
import CookieFunction from "@/utils/functions/cookie";

export default {
  created() {
    if (this.$route.params.aid && this.$route.params.aid.length > 0) {
      CookieFunction.setCookie("aid", this.$route.params.aid);
    }
    this.$router.push("/");
  }
};
</script>
