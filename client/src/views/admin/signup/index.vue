<template>
  <div class="wrap position_relative" :data-theme="currentTheme">
    <div class="info d_flex align_items_center justify_content_center p_3 mt_5">
      <form>
        <h3>Đăng ký quản trị viên</h3>
        <div class="form_group">
          <label>Tên đăng nhập</label>
          <input
            type="text"
            class="form_control"
            placeholder="Điền tên đăng ký"
            v-model="user.name"
          />
        </div>

        <div class="form_group">
          <label>Email Đăng ký</label>
          <input
            type="email"
            class="form_control"
            placeholder="Điền email đăng ký"
            v-model="user.email"
          />
        </div>

        <div class="form_group">
          <label>Số điện thoại</label>
          <input
            type="text"
            class="form_control"
            placeholder="Điền số điện thoại đăng ký"
            v-model="user.phone"
          />
        </div>

        <div class="form_group">
          <label>Mã nhân viên</label>
          <input
            type="text"
            class="form_control"
            placeholder="Điền mã nhân viên"
            v-model="user.code"
          />
        </div>

        <div class="form_group">
          <label>Mật khẩu</label>
          <input
            type="password"
            class="form_control"
            placeholder="Điền mật khẩu"
            v-model="user.password"
          />
        </div>

        <div class="form_group">
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            class="form_control"
            placeholder="Xác nhận lại mật khẩu"
            v-model="confirmPassword"
          />
        </div>

        <button
          class="btn btn_info form_control"
          @click.prevent="redirectInside"
        >
          Đăng ký
        </button>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  components: {},
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: "",
        code: "",
        password: ""
      },
      confirmPassword: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async redirectInside() {
      if (this.confirmPassword !== this.user.password) {
        this.$store.dispatch("set_error", "Mật khẩu không trùng nhau!");
        return;
      } else if (this.confirmPassword === "" || this.user.password === "") {
        this.$store.dispatch("set_error", "Mật khẩu không được để trống");
        return;
      }
      const dataSender = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        phone: this.user.phone,
        code: this.user.code
      };
      await this.$store.dispatch("signUpAdmin", dataSender);
      if (
        this.$store.getters.authError === "403" ||
        this.$store.getters.authError === "404"
      ) {
        return;
      }
      this.$router.push({ name: "admin_dashboard" });
      // window.location.href =
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
