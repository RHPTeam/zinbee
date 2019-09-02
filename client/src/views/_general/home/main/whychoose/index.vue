<template>
  <section id="why--chose" class="why--choose position_relative">
    <div class="section--title-content">
      <h3 class="title">Ai có thể sử dụng zinbee ?</h3>
    </div>

    <div class="marketing--section px_4 ct mb_5">
      <div class="r">
        <div class="c_md_12 items c_lg_4 c_xl_4 mb_4 text_center">
          <img class="marketing--section-image" :src="srcSimpleInterface" />
          <div class="title">
            Shop kinh doanh cá nhân
          </div>
          <div>
            Các shop đang kinh doanh cá nhân đang cần giải pháp, công cụ hỗ trợ
            bán hàng, tương tác với khách hàng tốt hơn. Tiết kiệm thời gian và
            chi phí.
          </div>
        </div>
        <div class="c_md_12 items c_lg_4 c_xl_4 mb_4 text_center">
          <img class="marketing--section-image" :src="srcExamlePost" />
          <div class="title">
            Các doanh nghiệp
          </div>
          <div>
            Các doanh nghiệp đang muốn triển khai marketing trên Facebook với
            giải pháp tối ưu, hoàn toàn tự động để giảm chi phí và nhân lực.
          </div>
        </div>
        <div class="c_md_12 items c_lg_4 c_xl_4 mb_4 text_center">
          <img class="marketing--section-image" :src="srcAutomatic" />
          <div class="title">
            Tổ chức Marketing - Sale
          </div>
          <div>
            Các tổ chức, cá nhân Marketing - Sale mong muốn tăng hiệu quả công
            việc với công cụ quản lý các hoạt động trên Facebook.
          </div>
        </div>
      </div>
    </div>
    <!-- End: Marketing Section -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      // Why choose
      srcSimpleInterface: require("@/assets/images/home/undraw_empty_cart_co35.svg"),
      srcAutomatic: require("@/assets/images/home/undraw_coming_home_52ir.svg"),
      srcExamlePost: require("@/assets/images/home/undraw_team_page_pgpr.svg")
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@import "../index.style";
// why choose zinbee
.why--choose {
  padding: 6.25rem 0;
  background: #f7f7f7;
  color: #333;
  &::before {
    content: "";
    position: absolute;
    top: 50px;
    left: 50px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background: #f8b44873;
    // z-index: 1;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 150px;
    right: -50px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background: #f8b44873;
    // z-index: 1;
  }
  .marketing--section {
    .marketing--section-image {
      background-size: 300px 130px;
      height: 150px;
      background-repeat: no-repeat;
    }
    .title {
      font-size: 1.9rem;
      padding: 1rem 0;
      font-weight: 500;
    }
  }
}
</style>
