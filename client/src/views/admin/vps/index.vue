<template>
  <div class="server">
    <div class="desc py_3 px_2">
      <span>Quản lý hệ thống server :</span> Thông tin về domain trong hệ thống.
    </div>
    <div class="action py_2 px_2">
      <button class="btn btn_info" @click="redirectVps">Quản lý VPS</button>
      <button class="btn btn_dark ml_3" @click="redirectPostServer">
        Quản lý server post
      </button>
    </div>

    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirectVps() {
      this.$router.push({ name: "admin_server" });
    },
    redirectPostServer() {
      this.$router.push({ name: "post_server" });
    }
  }
};
</script>

<style lang="scss" scoped></style>
