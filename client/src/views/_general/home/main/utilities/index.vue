<template>
  <section id="utilities" class="utilities ct">
    <div class="section--title-content mb_0">
      <h3 class="title">Tại sao nên chọn ZinBee ?</h3>
    </div>
    <div class="d_none d_md_block">
      <div class="options mb_4 d_none">
        <div class="d_flex first">
          <div
            class="title"
            :class="[currentIndexInfo === 1 ? 'active' : '']"
            @click="currentIndexInfo = 1"
          >
            <p>01. Giao diện thân thiện</p>
          </div>
          <div
            class="title"
            :class="[currentIndexInfo === 2 ? 'active' : '']"
            @click="currentIndexInfo = 2"
          >
            <p>02. Nội dung đa dạng</p>
          </div>
        </div>
        <div class="d_flex second">
          <div
            class="title"
            :class="[currentIndexInfo === 3 ? 'active' : '']"
            @click="currentIndexInfo = 3"
          >
            <p>03. Tự động hóa</p>
          </div>
          <div
            class="title"
            :class="[currentIndexInfo === 4 ? 'active' : '']"
            @click="currentIndexInfo = 4"
          >
            <p>04. Rất nhiều tính năng khác</p>
          </div>
        </div>
      </div>
      <div class="content--options position_relative pt_4">
        <div class="px_3 slide--image">
          <transition name="slide-fade">
            <div class="items display d_flex" v-if="currentIndexInfo === 0">
              <div class="left text">
                <div class="title--why">Giao diện thân thiện</div>
                <div class="desc">
                  Đội ngũ Zinbee không ngừng cải tiến, nâng cấp nhằm xây dựng
                  một hệ thống tiện lợi nhất cho người dùng
                </div>
              </div>
              <div
                class="right order"
                :style="{
                  backgroundImage: 'url(' + sliderUtilities[0] + ')'
                }"
              ></div>
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="content items d_flex" v-if="currentIndexInfo === 1">
              <div class="left text">
                <div class="title--why">Nội dung đa dạng</div>
                <div class="desc">
                  Kho nội dung được cập nhật tiên lục, đem đến sự lựa chọn dễ
                  dàng và phù hợp cho khách hàng.
                </div>
              </div>
              <div
                class="right order"
                :style="{
                  backgroundImage: 'url(' + sliderUtilities[1] + ')'
                }"
              ></div>
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="automation items d_flex" v-if="currentIndexInfo === 2">
              <div class="right text">
                <div class="title--why">Tự động hóa</div>
                <div class="desc">
                  Bạn sẽ có nhiều thời gian hơn với hệ thống tự động hóa của
                  Zinbee, mọi thứ chỉ cần setup và Zinbee sẽ thay bạn thực hiện
                  bất kể ngày hay đêm
                </div>
              </div>
              <div
                class="left order"
                :style="{
                  backgroundImage: 'url(' + sliderUtilities[2] + ')'
                }"
              ></div>
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="function items d_flex" v-if="currentIndexInfo === 3">
              <div class="left text">
                <div class="title--why">Rất nhiều tính năng khác</div>
                <div class="desc">
                  Hàng chục tính năng khác luôn được update liên tục, đem tới
                  những tiện ích tối ưu nhất cho khách hàng của Zinbee
                </div>
              </div>
              <div
                class="right order"
                :style="{
                  backgroundImage: 'url(' + sliderUtilities[3] + ')'
                }"
              ></div>
            </div>
          </transition>
        </div>
        <div class="action text_center">
          <ul>
            <li
              :class="[currentIndexInfo === 0 ? 'active' : '']"
              @click="currentIndexInfo = 0"
            ></li>
            <li
              :class="[currentIndexInfo === 1 ? 'active' : '']"
              @click="currentIndexInfo = 1"
            ></li>
            <li
              :class="[currentIndexInfo === 2 ? 'active' : '']"
              @click="currentIndexInfo = 2"
            ></li>
            <li
              :class="[currentIndexInfo === 3 ? 'active' : '']"
              @click="currentIndexInfo = 3"
            ></li>
          </ul>
        </div>
        <div
          class="position_absolute action--slider-info d_flex align_items_center"
        >
          <span
            class="prev action"
            @click="prevInfo"
            v-if="currentIndexInfo !== 0"
          >
            <icon-base
              class="icon--arrow-left"
              icon-name="Prev"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <icon-arrow-left></icon-arrow-left>
            </icon-base>
          </span>
          <span
            class="next ml_auto action"
            @click="nextInfo"
            v-if="currentIndexInfo !== 3"
          >
            <icon-base
              class="icon--arrow-left"
              icon-name="Next"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <icon-arrow-left></icon-arrow-left>
            </icon-base>
          </span>
        </div>
      </div>
    </div>
    <div class="d_md_none d_block">
      <div class="content--options px_3">
        <div class="items display mb_4">
          <div class="title--why">Giao diện thân thiện</div>
          <div class="desc mb_2">
            Đội ngũ Zinbee không ngừng cải tiến, nâng cấp nhằm xây dựng một hệ
            thống tiện lợi nhất cho người dùng
          </div>
          <div
            class="right order"
            :style="{
              backgroundImage: 'url(' + sliderUtilities[0] + ')'
            }"
          ></div>
        </div>

        <div class="content items mb_4">
          <div class="title--why">Nội dung đa dạng</div>
          <div class="desc mb_2">
            Kho nội dung được cập nhật tiên lục, đem đến sự lựa chọn dễ dàng và
            phù hợp cho khách hàng.
          </div>
          <div
            class="right order"
            :style="{
              backgroundImage: 'url(' + sliderUtilities[1] + ')'
            }"
          ></div>
        </div>

        <div class="automation items mb_4">
          <div class="title--why">Tự động hóa</div>
          <div class="desc mb_2">
            Bạn sẽ có nhiều thời gian hơn với hệ thống tự động hóa của Zinbee,
            mọi thứ chỉ cần setup và Zinbee sẽ thay bạn thực hiện bất kể ngày
            hay đêm
          </div>

          <div
            class="right order"
            :style="{
              backgroundImage: 'url(' + sliderUtilities[2] + ')'
            }"
          ></div>
        </div>

        <div class="function items mb_4">
          <div class="title--why">Rất nhiều tính năng khác</div>
          <div class="desc mb_2">
            Hàng chục tính năng khác luôn được update liên tục, đem tới những
            tiện ích tối ưu nhất cho khách hàng của Zinbee
          </div>
          <div
            class="right order"
            :style="{
              backgroundImage: 'url(' + sliderUtilities[3] + ')'
            }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentIndexInfo: 0,
      // images of Utilities
      sliderUtilities: [
        require("@/assets/images/home/undraw_chore_list_iof3.svg"),
        require("@/assets/images/home/undraw_collecting_fjjl.svg"),
        require("@/assets/images/home/undraw_time_management_30iu.svg"),
        require("@/assets/images/home/undraw_task_31wc.svg")
      ]
    };
  },
  methods: {
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
    sliderWhyChooseZinbee() {
      setInterval(() => {
        this.currentIndexInfo++;
        if (this.currentIndexInfo === 4) {
          this.currentIndexInfo = 0;
        }
      }, 6000);
    }
  },
  mounted() {
    this.sliderWhyChooseZinbee();
  }
};
</script>

<style scoped lang="scss">
@import "../index.style";

// utilities
.utilities {
  margin-bottom: 0 !important;
  padding: 6.25rem 0;
  color: #333;
  .options {
    border-bottom: 1px solid #ebebeb;
    .first,
    .second {
      flex: 1;
    }
    .title {
      flex: 1;
      p {
        line-height: 92px;
        margin-bottom: 0;
        display: inline-block;
        cursor: pointer;
        transition: 0.4s;
        position: relative;
        &::before {
          content: "";
          width: 0px;
          height: 1px;
          bottom: 0px;
          left: 0;
          position: absolute;
          background: transparent;
          transition: all 0.5s linear;
        }
      }
      &.active,
      &:hover {
        p {
          color: #333;
          &::before {
            background: #333;
            width: 100%;
          }
        }
      }
    }
  }
  .content--options {
    padding: 0 3.5rem;
    // height: 537px;
    overflow: hidden;
    &:hover {
      .action--slider-info {
        opacity: 1;
      }
    }
    .title--why {
      font-size: 1.8rem;
      margin: 0 0 1rem 0;
      font-weight: 500;
    }
    .section--title-content {
      margin-bottom: 10px;
    }
    .slide--image {
      overflow: hidden;
      height: 247px;
      .items {
        overflow: hidden;
        height: 247px;
      }
      .left,
      .right {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        flex: 1;
        &.text {
          padding: 0 1rem;
        }
      }
    }
  }
  .action {
    margin-top: 1rem;
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
  .action--slider-info {
    opacity: 0;
    transition: 0.3s;
    width: 100%;
    top: 40%;
    transform: translateY(-50%);
    left: 0px;
    .action {
      cursor: pointer;
      // background: #ccc;
      border-radius: 50%;
      color: #f8b448;
      transition: 0.4s;
      &:hover {
        background: #f8b448;
        color: #fff;
      }
    }
    .next {
      transform: rotate(180deg);
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
}
</style>
