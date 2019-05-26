<template>
  <div class="wrap">
    <div class="info d_flex align_items_center justify_content_center p_3 mt_5">
      <form>
        <h3>Đăng nhập vào hệ thống Admin</h3>
        <div class="form_group">
          <label>Email đăng nhập</label>
          <input
            type="text"
            class="form_control"
            placeholder="Nhập email ..."
            v-model="user.email"
          />
        </div>

        <div class="form_group">
          <label>Mật khẩu</label>
          <input
            type="password"
            class="form_control"
            placeholder="Nhập mật khẩu"
            v-model="user.password"
          />
        </div>
        <button class="btn btn_info form_control" @click="signIn">
          Đăng nhập
        </button>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async signIn() {
      const dataSender = {
        email: this.user.email,
        password: this.user.password
      };
      await this.$store.dispatch("signIn", dataSender);
      this.$router.push("/admin");
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  .info {
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    margin: auto;
    width: 500px;
  }
}
</style>
