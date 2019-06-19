import carousel from "vue-owl-carousel";
import Typed from "typed.js";
export default {
  data() {
    return {
      activetab: 1,
      backgroundBanner: require("@/assets/images/landingpage/bg--banner.jpg"),
      backgroundTool: require("@/assets/images/landingpage/powerful-bg.jpg"),
      backgroundCustomer: require("@/assets/images/landingpage/quote.png"),
      backgroundMap: require("@/assets/images/landingpage/map-bg.jpg"),
      currentIndex: 1,
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
      }
    };
  },
  components: {
    carousel
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
    showTyped() {
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
    }
  },
  computed: {},
  mounted() {
    this.showTyped();
  }
};
