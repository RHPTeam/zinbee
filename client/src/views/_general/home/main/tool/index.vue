<template>
  <section id="tool" class="tool position_relative">
    <div
      class="border--right position_absolute"
      :style="{
        backgroundImage: 'url(' + vienPhai + ')'
      }"
    ></div>
    <div
      class="border--left position_absolute"
      :style="{
        backgroundImage: 'url(' + vienTrai + ')'
      }"
    ></div>
    <div class="ct">
      <div class="section--title-content">
        <h3 class="title">Công cụ hỗ trợ marketing – bán hàng</h3>
        <div class="desc">
          Zinbee cung cấp bộ công cụ giúp quản lý cũng như tự động nhiều hoạt
          động trong quá trình làm marketing, bán hàng và tương tác với khách
          hàng trên Facebook.
        </div>
      </div>
      <div class="r content mb_md_4">
        <div class="c_lg_6 c_md_12 mb_md_3 left">
          <!-- <img :src="imageTool1" alt> -->
          <div
            class="marketing--section-image"
            :style="{
              backgroundImage: 'url(' + benefit + ')'
            }"
          ></div>
        </div>
        <div class="c_lg_6 c_md_12 right position_relative">
          <div class="title--content">Những tính năng nổi trội của Zinbee</div>
          <div class="items d_flex align_items_center">
            <div class="icon">
              <icon-base
                icon-name="close"
                width="50"
                height="50"
                viewBox="0 0 70 70"
              >
                <icon-database />
              </icon-base>
            </div>
            <div class="text">
              <p>
                Zinbee cung cấp kho nội dung mẫu đa dạng, cùng tính năng đăng
                bài tự động
              </p>
            </div>
          </div>
          <div class="items d_flex align_items_center">
            <div class="icon">
              <icon-base
                icon-name="close"
                width="50"
                height="50"
                viewBox="0 0 500 500"
              >
                <icon-search-auto />
              </icon-base>
            </div>
            <div class="text">
              <p>
                Tự động tăng tương tác với khách hàng. Lọc và xây dựng tệp khách
                hàng tiềm năng.
              </p>
            </div>
          </div>
          <div class="items d_flex align_items_center">
            <div class="icon">
              <icon-base
                icon-name="close"
                width="50"
                height="50"
                viewBox="0 0 500 500"
              >
                <icon-chart-bar />
              </icon-base>
            </div>
            <div class="text">
              <p>
                Zinbee là bộ công cụ giúp tự động hóa việc marketing, bán hàng
                cũng như tự động tương tác với khách hàng trên Facebook.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="r content benefit">
        <div class="c_lg_6 c_md_12 mb_md_3 left">
          <div class="title--content">Lợi ích Zinbee mang lại</div>
          <div class="items d_flex align_items_center">
            <div class="icon">
              <icon-base
                icon-name="close"
                width="50"
                height="50"
                viewBox="0 0 550 550"
              >
                <icon-rocket />
              </icon-base>
            </div>
            <div class="text">
              <p>Tăng hiệu quả kinh doanh</p>
            </div>
          </div>
          <div class="items d_flex align_items_center">
            <div class="icon">
              <icon-base
                icon-name="close"
                width="48"
                height="48"
                viewBox="0 0 500 500"
              >
                <icon-laptop-phone />
              </icon-base>
            </div>
            <div class="text">
              <p>Dễ dàng quản lý nội dung bài đăng, chiến dich.</p>
            </div>
          </div>
          <div class="items d_flex align_items_center">
            <div class="icon">
              <icon-base
                icon-name="close"
                width="48"
                height="48"
                viewBox="0 0 60 60"
              >
                <icon-diamond />
              </icon-base>
            </div>
            <div class="text">
              <p>Tăng tương tác và xây dựng tệp khách hàng tiềm năng</p>
            </div>
          </div>
          <div class="items d_flex align_items_center">
            <div class="icon">
              <icon-base
                icon-name="close"
                width="48"
                height="48"
                viewBox="0 0 29 29"
              >
                <icon-timer />
              </icon-base>
            </div>
            <div class="text">
              <p>Tiết kiệm thời gian, chi phí cho quảng cáo và nhân lực</p>
            </div>
          </div>
        </div>
        <div class="c_lg_6 c_md_12 right position_relative">
          <!-- <div class="info position_absolute">ZinBee</div> -->
          <!-- <img :src="imageTool2" alt> -->
          <div
            class="marketing--section-image"
            :style="{
              backgroundImage: 'url(' + automatic + ')'
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
      vienTrai: require("@/assets/images/home/vientrai.png"),
      vienPhai: require("@/assets/images/home/vienphai.png"),
      benefit: require("@/assets/images/home/undraw_visual_data_b1wx.svg"),
      automatic: require("@/assets/images/home/undraw_setup_analytics_8qkl.svg")
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@import "../index.style";
// tool
.tool {
  color: #333;
  margin-bottom: 0 !important;
  padding: 6.25rem 0;
  .border--left {
    bottom: 0;
    right: 0;
    height: 600px;
    width: 470px;
    z-index: -1;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .border--right {
    top: 0;
    left: 0;
    z-index: -1;
    height: 400px;
    width: 360px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .content {
    .marketing--section-image {
      height: 300px;
      // width: 300px;
      background-size: cover;
      margin: 0 auto;
    }
    .left {
      .items {
        margin-bottom: 0.325rem;
      }
    }
    .right {
      .items {
        margin-bottom: 0.325rem;
      }
      .info {
        width: 100px;
        height: 100px;
        background: linear-gradient(
            to bottom,
            #323232 0%,
            #3f3f3f 40%,
            #1c1c1c 150%
          ),
          linear-gradient(
            to top,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(0, 0, 0, 0.25) 200%
          );
        background-blend-mode: multiply;
        background-image: linear-gradient(to right, #10171d 0%, #0e1f2c 100%);
        text-align: center;
        font-size: 24px;
        line-height: 100px;
        border-radius: 50%;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        left: -50px;
      }
    }
    .icon {
      padding-right: 30px;
    }
    .text {
      p {
        font-weight: 500;
        margin-bottom: 0;
        font-size: 1rem;
        padding-bottom: 1rem;
      }
    }
  }
  .title--content {
    background: #f8b448;
    color: #fff;
    padding: 1.25rem 0.9375rem;
    font-size: 1.375rem;
    text-align: center;
    border-radius: 0.3125rem;
    margin-bottom: 1.25rem;
    font-weight: 500;
  }
}
</style>
