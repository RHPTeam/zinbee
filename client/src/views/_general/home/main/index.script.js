import Typed from "typed.js";

import AppBanner from "./banner";
// import AppCustomer from "./customer";
// import AppOwner from "./owner";
// import AppPrice from "./price";
// import AppTool from "./tool";
// import AppTraining from "./training";
// import AppUtilities from "./utilities";
// import AppWhyChoose from "./whychoose";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    AppBanner,
    // AppCustomer,
    // AppOwner,
    // AppPrice,
    // AppTool,
    // AppTraining,
    // AppUtilities,
    // AppWhyChoose,
    VuePerfectScrollbar
  },
  data() {
    return {
      activetab: 1,
      // Banner
      backgroundBanner: require("@/assets/images/home/bg--banner.svg"),
      vienTraiBanner: require("@/assets/images/home/vientrai.png"),
      vienPhaiBanner: require("@/assets/images/home/vienphai.png"),
      // Tool
      benefit: require("@/assets/images/home/undraw_visual_data_b1wx.svg"),
      automatic: require("@/assets/images/home/undraw_setup_analytics_8qkl.svg"),
      backgroundTool: require("@/assets/images/home/bg--polygon.png"),
      // Customer
      backgroundCustomer: require("@/assets/images/home/quote.png"),
      // Contact
      backgroundShow: require("@/assets/images/home/owner_bg.jpg"),
      currentIndex: 1,
      currentIndexInfo: 0,
      typed: {
        strings: ["Developers.", "Designers.", "People."],
        // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
        stringsElement: null,
        // typing speed
        typeSpeed: 30,
        // time before typing starts
        startDelay: 1200,
        // backspacing speed
        backSpeed: 20,
        // time before backspacing
        backDelay: 500,
        // loop
        loop: true,
        // false = infinite
        // loopCount: 5,
        // show cursor
        showCursor: false,
        // character for cursor
        cursorChar: "|",
        // attribute to type (null == text)
        attr: null,
        // either html or text
        contentType: "html",
        // call when done callback function
        callback: function() {},
        // starting callback function before each string
        preStringTyped: function() {},
        //callback for every typed string
        onStringTyped: function() {},
        // callback for reset
        resetCallback: function() {}
      },
      currentSliderTraining: 0,
      // Why choose
      srcSimpleInterface: require("@/assets/images/home/undraw_empty_cart_co35.svg"),
      srcAutomatic: require("@/assets/images/home/undraw_coming_home_52ir.svg"),
      srcExamlePost: require("@/assets/images/home/undraw_team_page_pgpr.svg"),
      // Slider Training
      imageTraining: [
        require("@/assets/images/home/training2.jpg"),
        require("@/assets/images/home/training1.jpg"),
        require("@/assets/images/home/training3.jpg"),
        require("@/assets/images/home/training4.jpg")
      ],
      // images of Utilities
      sliderUtilities: [
        require("@/assets/images/home/undraw_chore_list_iof3.svg"),
        require("@/assets/images/home/undraw_collecting_fjjl.svg"),
        require("@/assets/images/home/undraw_time_management_30iu.svg"),
        require("@/assets/images/home/undraw_task_31wc.svg")
      ]
    };
  },
  mounted() {
    // this.runInitEffect();
    this.sliderCustomer();
    this.sliderWhyChooseZinbee();
  },
  methods: {
    next() {
      if (this.currentIndex === 3) {
        this.currentIndex = 3;
      } else {
        this.currentIndex++;
      }
    },
    prev() {
      if (this.currentIndex === 1) {
        this.currentIndex = 1;
      } else {
        this.currentIndex--;
      }
    },
    nextInfo() {
      if (this.currentIndexInfo === 3) {
        this.currentIndexInfo = 3;
      } else {
        this.currentIndexInfo++;
      }
    },
    prevInfo() {
      if (this.currentIndexInfo === 0) {
        this.currentIndexInfo = 0;
      } else {
        this.currentIndexInfo--;
      }
    },
    showTyped() {
      this.$router.push({ name: "user_signin" });
    },
    runInitEffect() {
      new Typed(".test", {
        strings: [
          "Công cụ hỗ trợ tuyệt vời",
          "Tiết kiệm tới 80% thời gian cho bạn",
          "Vũ khí không thể thiếu cho bán hàng trên facebook"
        ],
        // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
        stringsElement: null,
        // typing speed
        typeSpeed: 50,
        // time before typing starts
        startDelay: 200,
        // backspacing speed
        backSpeed: 30,
        // time before backspacing
        backDelay: 800,
        // loop
        loop: true,
        // false = infinite
        // show cursor
        showCursor: false,
        // character for cursor
        cursorChar: "|",
        // attribute to type (null == text)
        attr: null,
        // either html or text
        contentType: "html",
        // call when done callback function
        callback: function() {},
        // starting callback function before each string
        preStringTyped: function() {},
        //callback for every typed string
        onStringTyped: function() {},
        // callback for reset
        resetCallback: function() {}
      });
    },
    goToSignUp() {
      const routeSignUp = this.$router.resolve({ name: "user_signup" });

      window.open(routeSignUp.href, "_blank");
    },
    goToMarket() {
      const route = this.$router.resolve({ name: "market_home" });

      window.open(route.href, "_blank");
    },
    sliderCustomer() {
      setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex === 4) {
          this.currentIndex = 1;
        }
      }, 5000);
    },
    sliderWhyChooseZinbee() {
      setInterval(() => {
        this.currentIndexInfo++;
        if (this.currentIndexInfo === 4) {
          this.currentIndexInfo = 0;
        }
      }, 6000);
    }
  }
};
