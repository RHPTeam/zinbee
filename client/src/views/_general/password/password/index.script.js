/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
export default {
  data() {
    return {
      errorText: {
        password: "",
        confirmPassword: ""
      },
      isShowPassword: false,
      isShowConfirmPassword: false,
      reset: {
        password: "",
        confirmPassword: ""
      },
      statusClassError: {
        password: false,
        confirmPassword: false
      },
      statusClassPassed: {
        password: false,
        confirmPassword: false
      },
      validateError: false,
      validateErrorText: ""
    };
  },
  computed: {
    userInfo(){
      return this.$store.getters.infoUserEmail;
    },
    code(){
      return this.$store.getters.code;
    }
  },
  methods: {
    async sendPassword() {
      const dataSender = {
        password: this.reset.password,
        email: this.userInfo.email,
        token: window.location.href
      };

      // Validate
      if (this.reset.password === "") {
        this.validateError = true;
        this.validateErrorText = "Bạn chưa nhập mật khẩu!";
        return;
      } else if (this.reset.confirmPassword === "") {
        this.validateError = true;
        this.validateErrorText = "Bạn chưa xác nhận mật khẩu!";
        return;
      } else if ( this.statusClassError.password ) {
        this.validateError = true;
        this.validateErrorText = this.errorText.password;
        return;
      } else if ( this.statusClassError.confirmPassword ) {
        this.validateError = true;
        this.validateErrorText = this.errorText.confirmPassword;
        return;
      }

      // Reset validateError & validateErrorText before send request
      this.validateError = false;
      this.validateErrorText = "";

      await this.$store.dispatch( "getNewPassword", dataSender );
      this.$router.push({name: "user_signin"});
    }
  },
  watch: {
    "reset.password"( value ) {
      this.errorText.password = "Mật khẩu nằm trong khoảng 6-20 kí tự!";
      this.statusClassError.password = true;
      this.statusClassPassed.password = false;
      if ( value.length > 5 && value.length < 20 ) {
        this.errorText.password = "";
        this.statusClassError.password = false;
        this.statusClassPassed.password = true;
      } else if ( value.length === 0 ) {
        this.errorText.password = "";
        this.statusClassError.password = false;
        this.statusClassPassed.password = false;
      }
    },
    "reset.confirmPassword"( value ) {
      this.errorText.confirmPassword = "Mật khẩu không trùng nhau!";
      this.statusClassError.confirmPassword = true;
      this.statusClassPassed.confirmPassword = false;
      if ( value === this.reset.password ) {
        this.errorText.confirmPassword = "";
        this.statusClassError.confirmPassword = false;
        this.statusClassPassed.confirmPassword = true;
      } else if ( value.length === 0 ) {
        this.errorText.confirmPassword = "";
        this.statusClassError.confirmPassword = false;
        this.statusClassPassed.confirmPassword = false;
      }
    }
  }
};
