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
      srcDefaultLogin: require( "@/assets/images/images-login.jpg" ),
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
  methods: {
    async signIn() {
      const dataSender = {
        email: this.user.email,
        password: this.user.password
      };

      await this.$store.dispatch( "signIn", dataSender );
      if (
        parseInt(
          SecureFunction.decodeRole( CookieFunction.getCookie( "cfr" ), 10 )
        ) === 0
      ) {
        if (
          this.$store.getters.authStatus === "401" || this.$store.getters.authStatus === "405"
        ) {
          return;
        }
        this.$store.dispatch("getUserInfo" );
        this.$router.push( "/welcome" );
      } else if (
        parseInt(
          SecureFunction.decodeRole( CookieFunction.getCookie( "cfr" ), 10 )
        ) === 1 || parseInt(
          SecureFunction.decodeRole( CookieFunction.getCookie( "cfr" ), 10 )
        ) === 2
      ) {
        this.$router.push( "/admin" );
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
