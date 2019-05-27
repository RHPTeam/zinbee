/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
export default {
  data() {
    return {
      code: "",
      errorText: "",
      statusClassError: false,
      statusClassPassed: false,
      user: {
        name: "Đặng Yến"
      }
    };
  },
  computed: {
    // user() {
    //   return this.$store.getters.userInfo;
    // }
  },
  methods: {
    async sendCode() {
      await this.$store.dispatch( "checkCode", this.code );
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

