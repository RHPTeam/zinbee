<template>
  <div class="main">
    <div class="search p_4 ">
      <div class="d_flex flex_column text_center pb_4">
        <h3>
          <b
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem,
            esse.</b
          >
        </h3>
        <span
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem,
          esse.</span
        >
      </div>

      <div class=" d_flex justify_content_center p_4">
        <div class="form--search d_flex align_content_center position_relative">
          <div class="icon--search position_absolute btn">
            <icon-base
              icon-name="logo"
              width="24"
              height="24"
              viewBox="0 0 16 16"
            >
              <icon-input-search />
            </icon-base>
          </div>
          <input class="search--input" type="text" placeholder="Tìm Kiếm..." />
        </div>
      </div>
    </div>

    <section
      class="describe d_flex flex_column align_items_center justify_content_center py_4"
    >
      <h3 class="title mb_4">Lorem ipsum dolor sit amet, consectetur.</h3>
      <div class="">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste,
        quibusdam. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consectetur.
      </div>
    </section>

    <div class="products p_4 ct">
      <div class="tab d_flex justify_content_center py_3 mb_4">
        <div class="d_flex align_items_center">
          <button class="btn btn_outline_info mr_3">Post Popular</button>
          <button class="btn btn_outline_info">Campaigns Simple</button>
        </div>
      </div>
      <div class="popular">
        <div class="r">
          <div
            class="item c_md_6 c_lg_4 c_xl_4 mb_2"
            v-for="(item, index) in posts"
            :key="index"
          >
            <div class="card">
              <div class="thumbnail position_relative">
                <div
                  class="thumbnail--bg"
                  :style="{ backgroundImage: 'url(' + item.img + ')' }"
                  @click="showDetailPopup(item)"
                ></div>
                <div class="icon position_absolute">
                  <div class="uncheck d_none">
                    <icon-base
                      icon-name="logo"
                      width="24"
                      height="24"
                      viewBox="0 0 550 550"
                    >
                      <icon-heart />
                    </icon-base>
                  </div>
                  <div class="check">
                    <icon-base
                      icon-name="logo"
                      width="24"
                      height="24"
                      viewBox="0 0 550 550"
                    >
                      <icon-select-heart />
                    </icon-base>
                  </div>
                </div>
              </div>

              <div class="detail px_2 py_3">
                <div class="desc mb_2">
                  <h4 class="m_0">{{ item.title }}</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      <span>by</span> {{ item.editor }}
                    </div>
                    <div
                      class="avatar"
                      :style="{ backgroundImage: 'url(' + item.img + ')' }"
                    ></div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <div class="price">${{ item.price }}</div>
                    <div class="sales">{{ item.sale }} sales</div>
                  </div>
                  <div class="right d_flex align_items_center ml_auto">
                    <div class="action der_1 mr_2">Preview</div>
                    <div class="icon der_1">
                      <icon-base
                        icon-name="logo"
                        width="24"
                        height="24"
                        viewBox="0 0 550 550"
                      >
                        <icon-download />
                      </icon-base>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="join d_flex align_items_center justify_content_center p_4 mb_5"
      :style="{
        backgroundImage:
          'url(' + srcDefault1 + ')' + ',' + 'url(' + srcDefault2 + ')'
      }"
    >
      <div class="text_center background--join">
        <div class="desc mb_4">
          Trải nghiệm sản phẩm marketing tốt nhất
        </div>
        <span class="signup">Đăng ký</span>
      </div>
    </div>

    <div class="marketing--section p_4 ct">
      <div class="r">
        <div class="c_md_6 c_lg_4 c_xl_4 mb_2 text_center">
          <img
            src="https://assets.shopfront.envato-static.com/images/home-page/marketing/support.png"
            alt=""
          />
          <div><b>All the themes you need.</b></div>
          <div>
            Templates for the best CMS like WordPress and Joomla, e-commerce
            templates for WooCommerce, Shopify and more… A huge library with
            top-quality themes and templates.
          </div>
        </div>
        <div class="c_md_6 c_lg_4 c_xl_4 mb_2 text_center">
          <img
            src="https://assets.shopfront.envato-static.com/images/home-page/marketing/everything.png"
            alt=""
          />

          <div><b>All the themes you need.</b></div>
          <div>
            Templates for the best CMS like WordPress andJoomla, e-commerce
            templates for WooCommerce, Shopify and more… A huge library with
            top-quality themes and templates.
          </div>
        </div>
        <div class="c_md_6 c_lg_4 c_xl_4 mb_2 text_center">
          <img
            src="https://assets.shopfront.envato-static.com/images/home-page/marketing/discover.png"
            alt=""
          />
          <div><b>All the themes you need.</b></div>
          <div>
            Templates for the best CMS like WordPress and Joomla, e-commerce
            templates for WooCommerce, Shopify and more… A huge library with
            top-quality themes and templates.
          </div>
        </div>
      </div>
    </div>

    <!-- *************POPUP************* -->
    <transition name="popup">
      <detail-popup
        v-if="isShowDetailPopup"
        :product="productSelected"
        @closePopup="isShowDetailPopup = $event"
      ></detail-popup>
    </transition>
  </div>
</template>

<script>
import DetailPopup from "../layouts/desktop/popups/detail";

export default {
  components: {
    DetailPopup
  },
  data() {
    return {
      isShowDetailPopup: false,
      productSelected: {},
      posts: [
        {
          img:
            "https://hinhanhdepvai.com/wp-content/uploads/2017/05/hot-girl.jpg",
          title: "Cho tôi một vé trở về tuổi thơ",
          editor: "Đặng Yến",
          price: "100,000",
          tags: ["du lịch", "mỹ phẩm"],
          sale: 103,
          updatedAt: "2019-06-05T12:27:39.126+00:00"
        },
        {
          img:
            "https://png.pngtree.com/element_origin_min_pic/16/05/16/205739ba060e909.jpg",
          title: "Tiền bán ngáo để mua Husky",
          editor: "Yến Ngáo",
          price: "100,000",
          tags: ["du lịch", "mỹ phẩm"],
          sale: 103,
          updatedAt: "2019-06-05T12:27:39.126+00:00"
        },
        {
          img:
            "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681",
          title: "Bán ngáo được bao tiền ?",
          editor: "Ngáo Yến",
          price: "100,000",
          tags: ["du lịch", "mỹ phẩm"],
          sale: 103,
          updatedAt: "2019-06-05T12:27:39.126+00:00"
        }
      ],
      srcDefault1: require("@/assets/images/market/left_bottom_hero.png"),
      srcDefault2: require("@/assets/images/market/right_bottom_hero.png")
    };
  },
  methods: {
    dateFormat(date) {
      const dateTime = new Date(date),
        day = String(dateTime.getDate()).padStart(2, 0),
        month = String(dateTime.getMonth() + 1).padStart(2, 0),
        year = dateTime.getFullYear();

      return `${day}/${month}/${year}`;
    },
    showDetailPopup(val) {
      this.productSelected = val;
      this.isShowDetailPopup = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
