import AppIntroVideo from "../introvideo";
import AppAlert from "@/components/shared/layouts/alert";
import ServerMutipart from "./popup/index";

// import axios from "axios/index";

export default {
  components: {
    AppAlert,
    AppIntroVideo,
    ServerMutipart
  },
  data() {
    return {
      confirmPassword: "",
      errorText: {
        name: "",
        email: "",
        phone: "",
        password: "",
        presenter: ""
      },
      isStatusNetwork: false,
      network: "",
      srcDefaultSinup: require("@/assets/images/images-login.jpg"),
      statusFinishForm: false,
      statusClassError: {
        name: false,
        email: false,
        phone: false,
        password: false,
        presenter: false
      },
      statusClassPassed: {
        name: false,
        email: false,
        phone: false,
        password: false,
        presenter: true
      },
      statusForm: false,
      user: {
        name: "",
        email: "",
        password: "",
        phone: "",
        presenter: ""
      },
      isShowServerMutipart: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async submit() {
      if (this.confirmPassword !== this.user.password) {
        this.$store.dispatch("set_error", "Mật khẩu không trùng nhau!");
        return;
      } else if (this.confirmPassword === "" || this.user.password === "") {
        this.$store.dispatch("set_error", "Mật khẩu không được để trống");
        return;
      }
      let dataSender = {};

      if (this.user.presenter === "") {
        dataSender = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          phone: this.user.phone
        };
      } else {
        dataSender = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          phone: this.user.phone,
          presenter: this.user.presenter
        };
      }
      const resData = await this.$store.dispatch("signUp", dataSender);
      this.isShowServerMutipart = true;

      if (resData === false) {
        return;
      }
      // this.$store.dispatch("getUserInfo" );
      // this.$router.push( "/welcome" );
    }
  },
  watch: {
    "user.name"(value) {
      this.errorText.name = "Tên phải ít nhất 6 ký tự và tối đa 50 ký tự!";
      this.statusClassError.name = true;
      this.statusClassPassed.name = false;
      if (value.length > 5 && value.length < 50) {
        this.errorText.name = "";
        this.statusClassError.name = false;
        this.statusClassPassed.name = true;
      } else if (value.length === 0) {
        this.errorText.name = "";
        this.statusClassError.name = false;
        this.statusClassPassed.name = false;
      }
    },
    "user.email"(value) {
      const regexEmail = new RegExp(
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
      );

      this.errorText.email = "Email không khả dụng cho định dạng!";
      this.statusClassError.email = true;
      this.statusClassPassed.email = false;
      if (regexEmail.test(value.toLowerCase())) {
        this.errorText.email = "";
        this.statusClassError.email = false;
        this.statusClassPassed.email = true;
      } else if (value.length === 0) {
        this.errorText.email = "";
        this.statusClassError.email = false;
        this.statusClassPassed.email = false;
      }
    },
    "user.password"(value) {
      this.errorText.password = "(*) Mật khẩu nằm trong khoảng 6-20 kí tự!";
      this.statusClassError.password = true;
      this.statusClassPassed.password = false;
      if (value.length > 5 && value.length < 20) {
        this.errorText.password = "";
        this.statusClassError.password = false;
        this.statusClassPassed.password = true;
      } else if (value.length === 0) {
        this.errorText.password = "";
        this.statusClassError.password = false;
        this.statusClassPassed.password = false;
      }
    },
    confirmPassword(value) {
      this.errorText.confirmPassword = "Mật khẩu không trùng nhau!";
      this.statusClassError.confirmPassword = true;
      this.statusClassPassed.confirmPassword = false;
      if (value === this.user.password) {
        this.errorText.confirmPassword = "";
        this.statusClassError.confirmPassword = false;
        this.statusClassPassed.confirmPassword = true;
      } else if (value.length === 0) {
        this.errorText.confirmPassword = "";
        this.statusClassError.confirmPassword = false;
        this.statusClassPassed.confirmPassword = false;
      }
    },
    "user.phone"(value) {
      const regexPhoneVT = /(09[6|7|8]|03[2|3|4|5|6|7|8|9]|086)+([0-9]{7}\b)/g,
        regexPhoneVN = /(09[1|4]|08[1|2|3|4|5|8])+([0-9]{7}\b)/g,
        regexPhoneMB = /(09[0|3]|07[0|6|7|8|9]|089)+([0-9]{7}\b)/g,
        regexPhoneVNMB = /(09[2]|05[6|8])+([0-9]{7}\b)/g,
        regexPhoneGMB = /(09[9]|059)+([0-9]{7}\b)/g;

      this.errorText.phone = "Số điện thoại không hợp lệ!";
      this.statusClassError.phone = true;
      this.statusClassPassed.phone = false;
      this.isStatusNetwork = false;
      this.network = "";
      if (regexPhoneVT.test(value)) {
        this.errorText.phone = "";
        this.statusClassError.phone = false;
        this.statusClassPassed.phone = true;
        this.isStatusNetwork = true;
        this.network = "viettel";
      } else if (regexPhoneVN.test(value)) {
        this.errorText.phone = "";
        this.statusClassError.phone = false;
        this.statusClassPassed.phone = true;
        this.isStatusNetwork = true;
        this.network = "vinaphone";
      } else if (regexPhoneMB.test(value)) {
        this.errorText.phone = "";
        this.statusClassError.phone = false;
        this.statusClassPassed.phone = true;
        this.isStatusNetwork = true;
        this.network = "mobiphone";
      } else if (regexPhoneVNMB.test(value)) {
        this.errorText.phone = "";
        this.statusClassError.phone = false;
        this.statusClassPassed.phone = true;
        this.isStatusNetwork = true;
        this.network = "vietnammobile";
      } else if (regexPhoneGMB.test(value)) {
        this.errorText.phone = "";
        this.statusClassError.phone = false;
        this.statusClassPassed.phone = true;
        this.isStatusNetwork = true;
        this.network = "gmobile";
      } else if (value.length === 0) {
        this.errorText.phone = "";
        this.statusClassError.phone = false;
        this.statusClassPassed.phone = false;
        this.isStatusNetwork = false;
        this.network = "";
      } else {
        this.errorText.phone = "Số điện thoại không hợp lệ!";
        this.statusClassError.phone = false;
        this.statusClassPassed.phone = false;
        this.isStatusNetwork = false;
        this.network = "";
      }
    },
    "user.presenter"(value) {
      if (value.length <= 30) {
        this.errorText.presenter = "";
        this.statusClassError.presenter = false;
        this.statusClassPassed.presenter = true;
      } else if (value.length > 30) {
        this.errorText.presenter = "Mã giới thiệu tối đa 30 ký tự!";
        this.statusClassError.presenter = true;
        this.statusClassPassed.presenter = false;
      }
    }
  }
};
