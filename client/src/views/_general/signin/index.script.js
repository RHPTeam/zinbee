/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
import AppIntroVideo from "../introvideo";
import AppAlert from "@/components/shared/layouts/alert";

import CookieFunction from "@/utils/functions/cookie";
import SecureFunction from "@/utils/functions/decode";
import axios from "axios/index";

export default {
  data() {
    return {
      errorText: {
        email: "",
        password: ""
      },
      isShowPassword: false,
      loginError: false,
      loginErrorText: true,
      loginImage: require("@/assets/images/zinbee-login-image.svg"),
      statusFinishForm: false,
      statusClassError: {
        email: false,
        password: false
      },
      statusClassPassed: {
        email: false,
        password: false
      },
      user: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    redirectDomain() {
      return this.$store.getters.redirectDomain;
    }
  },
  methods: {
    async signIn() {
      const dataSender = {
        email: this.user.email,
        password: this.user.password
      };

      // Reset error status
      this.$store.dispatch("setAuthError", "");

      // Validate before request
      if (this.user.email === "") {
        this.loginError = true;
        this.loginErrorText = "Bạn chưa nhập địa chỉ email!";
        return;
      } else if (this.user.password === "") {
        this.loginError = true;
        this.loginErrorText = "Bạn chưa nhập mật khẩu!";
        return;
      } else if ( this.statusClassError.email ) {
        this.loginError = true;
        this.loginErrorText = this.errorText.email;
        return;
      } else if ( this.statusClassError.password ) {
        this.loginError = true;
        this.loginErrorText = this.errorText.password;
        return;
      }

      // Reset loginError & loginErrorText before send request
      this.loginError = false;
      this.loginErrorText = "";

      await this.$store.dispatch( "signInByUser", dataSender );
      if ( this.$store.getters.authError === "401" ) {
        return false;
      }
      const token = `sid=${CookieFunction.getCookie(
        "sid"
      )}; uid=${CookieFunction.getCookie("uid")}; cfr=${CookieFunction.getCookie(
        "cfr"
      )};`;
      if ( this.$store.getters.authError === "405" ) {
        this.$router.push( { name: "user_expiration" } );
      } else {
        window.location = `${this.redirectDomain}redirect?authorization=${encodeURIComponent(token)}`;
      }
    }
  },
  watch: {
    "user.email"( value ) {
      const regexEmail = new RegExp(
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
      );

      this.errorText.email = "Email không khả dụng cho định dạng!";
      this.statusClassError.email = true;
      this.statusClassPassed.email = false;
      if ( regexEmail.test( value.toLowerCase() ) ) {
        this.errorText.email = "";
        this.statusClassError.email = false;
        this.statusClassPassed.email = true;
      } else if ( value.length === 0 ) {
        this.errorText.email = "";
        this.statusClassError.email = false;
        this.statusClassPassed.email = false;
      }
    },
    "user.password"( value ) {
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
    }
  },
  components: {
    AppAlert,
    AppIntroVideo
  }
};
