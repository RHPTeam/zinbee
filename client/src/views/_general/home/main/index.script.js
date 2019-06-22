import Typed from "typed.js";
export default {
  data() {
    return {
      activetab: 1,
      backgroundBanner: require("@/assets/images/home/bg--banner.jpg"),
      backgroundTool: require("@/assets/images/home/powerful-bg.jpg"),
      backgroundCustomer: require("@/assets/images/home/quote.png"),
      backgroundMap: require("@/assets/images/home/map-bg.jpg"),
      backgroundShow: require("@/assets/images/home/show.png"),
      currentIndex: 1,
      currentIndexInfo: 1,
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
      imageTraining: [
        require("@/assets/images/home/training1.jpg"),
        require("@/assets/images/home/training2.jpg"),
        require("@/assets/images/home/training3.jpg"),
        require("@/assets/images/home/training4.jpg")
      ],
      imageTool1: require("@/assets/images/home/training1.jpg"),
      imageTool2: require("@/assets/images/home/training4.jpg"),
      benefit: require("@/assets/images/home/undraw_visual_data_b1wx.svg"),
      automatic: require("@/assets/images/home/undraw_setup_analytics_8qkl.svg"),
      currentSliderTraining: 1,
      srcSimpleInterface: require("@/assets/images/home/undraw_empty_cart_co35.svg"),
      srcAutomatic: require("@/assets/images/home/undraw_coming_home_52ir.svg"),
      srcExamlePost: require("@/assets/images/home/undraw_team_page_pgpr.svg")
    };
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
      if (this.currentIndexInfo === 4) {
        this.currentIndexInfo = 4;
      } else {
        this.currentIndexInfo++;
      }
    },
    prevInfo() {
      if (this.currentIndexInfo === 1) {
        this.currentIndexInfo = 1;
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
    sliderTraining() {
      setInterval(() => {
        this.currentSliderTraining++;
        if (this.currentSliderTraining === 4) {
          this.currentSliderTraining = 0;
        }
      }, 3000);
    }
  },
  mounted() {
    this.runInitEffect();
    this.sliderTraining();
  }
};
