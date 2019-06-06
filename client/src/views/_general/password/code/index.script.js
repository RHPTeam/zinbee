/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
export default {
  data() {
    return {
      code: "",
      errorText: "",
      statusClassError: false,
      statusClassPassed: false
    };
  },
  computed: {
    userInfo(){
      return this.$store.getters.infoUserEmail;
    }
  },
  methods: {
    async sendCode() {
      const dataSender = {
        code: this.code,
        email: this.userInfo.email
      };
      await this.$store.dispatch( "setCodeResetPassword", this.code );
      await this.$store.dispatch( "checkCode", dataSender );
      this.$router.push( { name: "change_final" } );
    }
  },
  watch: {
    code( value ) {
      this.errorText = "Code gửi đến cho bạn gồm 6 ký tự";
      this.statusClassError = true;
      this.statusClassPassed = false;
      if ( value.length === 6 ) {
        this.errorText = "";
        this.statusClassError = false;
        this.statusClassPassed = true;
      } else if ( value.length === 0 ) {
        this.errorText = "";
        this.statusClassError = false;
        this.statusClassPassed = false;
      }
    }
  }
};

