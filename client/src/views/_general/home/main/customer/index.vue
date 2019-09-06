<template>
  <section id="customer" class="customer">
    <div class="ct">
      <div class="r">
        <div
          class="c_lg_5 left c_md_12 mb_md_3"
          :style="{
            backgroundImage: 'url(' + backgroundCustomer + ')'
          }"
        >
          <div class="title--section">Ý kiến của khách hàng</div>
          <div class="desc">
            Những phản hồi tích cực của khách hàng đã sử dụng Zinbee
          </div>
        </div>
        <!-- Satrt: Slider -->
        <div class="c_lg_7 c_md_12 right">
          <div class="slider">
            <transition name="slide-fade">
              <div class="items" v-if="currentIndex === 1">
                <div class="introduce--customer d_flex align_items_center">
                  <div>
                    <img
                      src="@/assets/images/home/NQK.jpg"
                      alt="Banner ZinBee"
                    />
                  </div>
                  <div>
                    <h5>Quang Khải</h5>
                    <p>Doanh nhân - Diễn Giả</p>
                  </div>
                </div>
                <div class="desc">
                  Tôi đã tiết kiệm được rất nhiều thời gian kể từ khi sử dụng
                  Zinbee, tôi không phải lo nghĩ lúc nào cũng phải ngồi đăng
                  bài, kết bạn,... thật sự tuyệt vời.
                </div>
              </div>
            </transition>
            <transition name="slide-fade">
              <div class="items" v-if="currentIndex === 2">
                <div class="introduce--customer d_flex align_items_center">
                  <div>
                    <img
                      src="@/assets/images/home/NTL.jpg"
                      alt="Banner ZinBee"
                    />
                  </div>
                  <div>
                    <h5>Thùy Linh</h5>
                    <p>Kinh doanh mỹ phẩm</p>
                  </div>
                </div>
                <div class="desc">
                  Trước kia lúc nào tôi cũng phải vội vàng sắp xếp thời gian để
                  đăng bài, tương tác, lên từng page, group, từ khi có Zinbee,
                  mọi thứ thật đơn giản.
                </div>
              </div>
            </transition>
            <transition name="slide-fade">
              <div class="items" v-if="currentIndex === 3">
                <div class="introduce--customer d_flex align_items_center">
                  <div>
                    <img
                      src="@/assets/images/home/NHL.jpg"
                      alt="Banner ZinBee"
                    />
                  </div>
                  <div>
                    <h5>Huy Lâm</h5>
                    <p>Giám đốc kinh doanh</p>
                  </div>
                </div>
                <div class="desc">
                  Hiệu quả công việc của công ty tôi tăng lên rõ rệt từ khi sử
                  dụng Zinbee, cám ơn Zinbee rất nhiều, tôi chắc chắn sẽ sử dụng
                  Zinbee cho tất cả các đại lý của tôi.
                </div>
              </div>
            </transition>
          </div>
          <div
            class="position_absolute action--slider d_flex align_items_center"
          >
            <span @click="prev" class="prev action" v-if="currentIndex !== 1">
              <icon-base
                class="icon--arrow-left"
                icon-name="Trước"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <icon-arrow-left></icon-arrow-left>
              </icon-base>
            </span>
            <span
              @click="next"
              class="next ml_auto action"
              v-if="currentIndex !== 3"
            >
              <icon-base
                class="icon--arrow-left"
                icon-name="Sau"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <icon-arrow-left></icon-arrow-left>
              </icon-base>
            </span>
          </div>
          <div class="action text_center">
            <ul>
              <li
                :class="[currentIndex === 1 ? 'active' : '']"
                @click="currentIndex = 1"
              ></li>
              <li
                :class="[currentIndex === 2 ? 'active' : '']"
                @click="currentIndex = 2"
              ></li>
              <li
                :class="[currentIndex === 3 ? 'active' : '']"
                @click="currentIndex = 3"
              ></li>
            </ul>
          </div>
        </div>
        <!-- End: Slider -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // Customer
      currentIndex: 1,
      backgroundCustomer: require("@/assets/images/home/quote.png")
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
    sliderCustomer() {
      setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex === 4) {
          this.currentIndex = 1;
        }
      }, 5000);
    }
  },
  mounted() {
    this.sliderCustomer();
  }
};
</script>

<style scoped lang="scss">
@import "../index.style";
// customer
.customer {
  background: #f3f9ff;
  padding: 6.25rem 0;
  .left {
    background-size: cover;
    background-repeat: no-repeat;
    .title--section {
      font-weight: 500;
      font-size: 2.1875rem;
      line-height: 3.4375rem;
      color: #333;
      position: relative;
      padding-bottom: 1.625rem;
      margin-bottom: 0.625rem;
      &::before {
        content: "";
        width: 2.5rem;
        height: 2px;
        background: #333;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateX(0);
      }
    }
    .desc {
      font-weight: 400;
      font-size: 1rem;
      line-height: 2.1875rem;
      color: #333;
    }
  }
  .slider {
    max-height: 369px;
    overflow: hidden;
    .items {
      max-width: 470px;
      background: #fff;
      padding: 50px 50px 59px;
      box-shadow: 0px 5px 10px 0px rgba(26, 38, 74, 0.031);
      border-radius: 5px;
      cursor: pointer;
      margin: 0 auto;
      .introduce--customer {
        img {
          height: 160px;
          width: 160px;
          border-radius: 50%;
          margin-right: 22px;
        }
        h5 {
          font-size: 18px;
          line-height: 25px;
          color: #222;
          font-weight: 500;
        }
        p {
          font-size: 16px;
          line-height: 24px;
          color: #666;
        }
      }
      .desc {
        padding-top: 28px;
        font-size: 1rem;
      }
    }
  }
  .right {
    .next {
      transform: rotate(180deg);
    }
    .action--slider {
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
      z-index: 5;
      .action {
        cursor: pointer;
        border-radius: 50%;
        color: #f8b448;
        transition: 0.4s;
        &:hover {
          background: #f8b448;
          color: #fff;
        }
      }
      .next {
        margin-right: 30px;
        padding: 0.25rem 0.625rem;
        height: 44px;
        width: 44px;
        svg {
          margin-top: 6px;
        }
      }
      .prev {
        padding: 0.25rem 0.625rem;
        height: 44px;
        width: 44px;
        svg {
          margin-top: 6px;
        }
      }
    }
    & > .action {
      margin-top: 1rem;
      display: none;
      li {
        cursor: pointer;
        display: inline-block;
        margin-right: 5px;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background: #ccc;
        &.active {
          background: #f8b448;
        }
      }
    }
  }
}
</style>
