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

    <div class="feature--products p_4 ct">
      <div class="d_flex flex_column text_center p_4">
        <h3>
          <b>Khám phá những bài post/campaign mẫu HOT nhất trong tuần.</b>
        </h3>
        <span
          >Hàng tuần, chúng tôi sẽ chọn ra những bài post/campaign được yêu
          thích nhất.</span
        >
      </div>
      <div class="list--products">
        <ul class="d_flex justify_content_center">
          <li class="mr_2">
            <div class="card">
              <a href="">
                <img
                  src="https://assets.shopfront.envato-static.com/images/home-page/marketing/discover.png"
                  alt=""
                />
              </a>
            </div>
          </li>
          <li class="mr_2">
            <div class="card">
              <a href="">
                <img
                  src="https://assets.shopfront.envato-static.com/images/home-page/marketing/discover.png"
                  alt=""
                />
              </a>
            </div>
          </li>
          <li class="mr_2">
            <div class="card">
              <a href="">
                <img
                  src="https://assets.shopfront.envato-static.com/images/home-page/marketing/discover.png"
                  alt=""
                />
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div class="d_flex justify_content_center">
        <button>Xem Thêm</button>
      </div>
    </div>

    <div class="products p_4 ct">
      <div class="tab d_flex justify_content_center py_3">
        <div class="d_flex align_items_center">
          <button class="btn btn_outline_info mr_3">Post Popular</button>
          <button class="btn btn_outline_info">Campaigns Simple</button>
        </div>
      </div>
      <div class="popular">
        <div class="r">
          <div
            class="c_md_6 c_lg_4 c_xl_4 mb_2"
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
                  <icon-base
                    icon-name="logo"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                  >
                    <icon-info />
                  </icon-base>
                </div>
              </div>

              <div class="detail px_3">
                <div class="desc">
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img
                        src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
                  </div>
                  <div class="right d_flex align_items_center ml_auto">
                    <button class="btn btn_outline_info mr_2">Download</button>
                    <div class="icon">
                      <icon-base
                        icon-name="logo"
                        width="24"
                        height="24"
                        viewBox="0 0 550 550"
                      >
                        <icon-copy />
                      </icon-base>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="c_md_6 c_lg_4 c_xl_4 mb_2"
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
                  <icon-base
                    icon-name="logo"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                  >
                    <icon-info />
                  </icon-base>
                </div>
              </div>

              <div class="detail px_3">
                <div class="desc">
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img
                        src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
                  </div>
                  <div class="right d_flex align_items_center ml_auto">
                    <button class="btn btn_outline_info mr_2">Download</button>
                    <div class="icon">
                      <icon-base
                        icon-name="logo"
                        width="24"
                        height="24"
                        viewBox="0 0 550 550"
                      >
                        <icon-copy />
                      </icon-base>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="c_md_6 c_lg_4 c_xl_4 mb_2"
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
                  <icon-base
                    icon-name="logo"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                  >
                    <icon-info />
                  </icon-base>
                </div>
              </div>

              <div class="detail px_3">
                <div class="desc">
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img
                        src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
                  </div>
                  <div class="right d_flex align_items_center ml_auto">
                    <button class="btn btn_outline_info mr_2">Download</button>
                    <div class="icon">
                      <icon-base
                        icon-name="logo"
                        width="24"
                        height="24"
                        viewBox="0 0 550 550"
                      >
                        <icon-copy />
                      </icon-base>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="c_md_6 c_lg_4 c_xl_4 mb_2"
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
                  <icon-base
                    icon-name="logo"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                  >
                    <icon-info />
                  </icon-base>
                </div>
              </div>

              <div class="detail px_3">
                <div class="desc">
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img
                        src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
                  </div>
                  <div class="right d_flex align_items_center ml_auto">
                    <button class="btn btn_outline_info mr_2">Download</button>
                    <div class="icon">
                      <icon-base
                        icon-name="logo"
                        width="24"
                        height="24"
                        viewBox="0 0 550 550"
                      >
                        <icon-copy />
                      </icon-base>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="c_md_6 c_lg_4 c_xl_4 mb_2"
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
                  <icon-base
                    icon-name="logo"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                  >
                    <icon-info />
                  </icon-base>
                </div>
              </div>

              <div class="detail px_3">
                <div class="desc">
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img
                        src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
                  </div>
                  <div class="right d_flex align_items_center ml_auto">
                    <button class="btn btn_outline_info mr_2">Download</button>
                    <div class="icon">
                      <icon-base
                        icon-name="logo"
                        width="24"
                        height="24"
                        viewBox="0 0 550 550"
                      >
                        <icon-copy />
                      </icon-base>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="c_md_6 c_lg_4 c_xl_4 mb_2"
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
                  <icon-base
                    icon-name="logo"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                  >
                    <icon-info />
                  </icon-base>
                </div>
              </div>

              <div class="detail px_3">
                <div class="desc">
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img
                        src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
                  </div>
                  <div class="right d_flex align_items_center ml_auto">
                    <button class="btn btn_outline_info mr_2">Download</button>
                    <div class="icon">
                      <icon-base
                        icon-name="logo"
                        width="24"
                        height="24"
                        viewBox="0 0 550 550"
                      >
                        <icon-copy />
                      </icon-base>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="c_md_6 c_lg_4 c_xl_4 mb_2"
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
                  <icon-base
                    icon-name="logo"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                  >
                    <icon-info />
                  </icon-base>
                </div>
              </div>

              <div class="detail px_3">
                <div class="desc">
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img
                        src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
                  </div>
                  <div class="right d_flex align_items_center ml_auto">
                    <button class="btn btn_outline_info mr_2">Download</button>
                    <div class="icon">
                      <icon-base
                        icon-name="logo"
                        width="24"
                        height="24"
                        viewBox="0 0 550 550"
                      >
                        <icon-copy />
                      </icon-base>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="c_md_6 c_lg_4 c_xl_4 mb_2"
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
                  <icon-base
                    icon-name="logo"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                  >
                    <icon-info />
                  </icon-base>
                </div>
              </div>

              <div class="detail px_3">
                <div class="desc">
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img
                        src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
                  </div>
                  <div class="right d_flex align_items_center ml_auto">
                    <button class="btn btn_outline_info mr_2">Download</button>
                    <div class="icon">
                      <icon-base
                        icon-name="logo"
                        width="24"
                        height="24"
                        viewBox="0 0 550 550"
                      >
                        <icon-copy />
                      </icon-base>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="c_md_6 c_lg_4 c_xl_4 mb_2"
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
                  <icon-base
                    icon-name="logo"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                  >
                    <icon-info />
                  </icon-base>
                </div>
              </div>

              <div class="detail px_3">
                <div class="desc">
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img
                        src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
                  </div>
                  <div class="right d_flex align_items_center ml_auto">
                    <button class="btn btn_outline_info mr_2">Download</button>
                    <div class="icon">
                      <icon-base
                        icon-name="logo"
                        width="24"
                        height="24"
                        viewBox="0 0 550 550"
                      >
                        <icon-copy />
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

    <div class="join p_4 ct">
      <div class="d_flex flex_column text_center background--join">
        <div>
          <!--<div class="background&#45;&#45;join r">-->
          <!--<div-->
          <!--class="c_6"-->
          <!--:style="{ backgroundImage: 'url(' + srcDefault1 + ')' }"-->
          <!--&gt;-->
          <!--</div>-->
          <!--<div-->
          <!--class="c_6"-->
          <!--:style="{ backgroundImage: 'url(' + srcDefault2 + ')' }"-->
          <!--&gt;-->
          <!--</div>-->
          <!--</div>-->

          <div class="mb_4">
            <b
              >Gia nhập hệ thống zinbee ngay hôm nay để trải nghiệm những sản
              phẩm marketing tốt nhất</b
            >
          </div>

          <button class="btn btn_outline_info">Đăng ký</button>
        </div>
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
        }
      ],
      srcDefault1: require("@/assets/images/market/join_us1.svg"),
      srcDefault2: require("@/assets/images/market/join_us2.svg")
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
