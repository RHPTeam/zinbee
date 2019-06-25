<template>
  <div class="main">
    <!-- Start: Search Banner -->
    <div class="search p_4 ">
      <div class="d_flex flex_column text_center pb_4">
        <h3>
          <b>Rất nhiều các bài post và chiến dịch mẫu đang đợi bạn.</b>
        </h3>
        <span
          >Nhập tên bài post hoặc chiến dịch mà bạn cần tìm. Sau đó nhấn mua
          hoặc thêm vào kho.</span
        >
      </div>
      <div class=" d_flex justify_content_center p_4">
        <div class="form--search d_flex align_content_center position_relative">
          <div
            class="icon--search position_absolute d_flex align_items_center btn"
            @click="searchKeyword"
          >
            <icon-base
              icon-name="Tìm kiếm"
              width="30"
              height="30"
              viewBox="0 0 20 20"
            >
              <icon-input-search />
            </icon-base>
          </div>
          <input
            class="search--input"
            type="text"
            placeholder="Tìm kiếm..."
            v-model="keywordSearch"
            @keyup.enter="searchKeyword"
          />
        </div>
      </div>
    </div>
    <!-- End: Search Banner -->
    <!-- Start: Description -->

    <!-- End: Description -->
    <!-- Start: Popular Products -->
    <div class="products p_4 ct">
      <section class="describe d_flex flex_column text_center py_4">
        <h3 class="title mb_4">
          Khám phá những bài sản phẩm mới nhất trong tuần
        </h3>
        <div class="">
          Hàng tuần, những sản phẩm mới nhất được nhiều người yêu thích sẽ được
          giới thiệu ở đây.
        </div>
      </section>
      <div class="tab d_flex justify_content_center py_3 mb_4">
        <div class="d_flex align_items_center">
          <button class="btn btn_outline_warning mr_3">Bài viết</button>
          <button class="btn btn_outline_warning campaigns">Chiến dịch</button>
        </div>
      </div>
      <div class="popular">
        <div class="r" v-if="newMarketProducts && newMarketProducts.length > 0">
          <div
            class="item c_md_6 c_lg_4 c_xl_4 mb_2"
            v-for="(item, index) in newMarketProducts"
            :key="index"
          >
            <div class="card">
              <div class="thumbnail position_relative">
                <div
                  class="thumbnail--bg"
                  :style="{
                    backgroundImage: 'url(' + item.previews.thumbnail + ')'
                  }"
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
              <div class="detail px_3 py_3">
                <div class="desc mb_2">
                  <h4 class="mb_1" @click="showDetailPopup(item)">
                    {{ item.name }}
                  </h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      <span>by</span> {{ item._creator.name }}
                    </div>
                    <!--<div
                      class="avatar"
                      :style="{ backgroundImage: 'url(' + item.img + ')' }"
                    ></div>-->
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <div
                      class="price font_weight_bold"
                      v-if="
                        parseInt(item.priceCents) > 0 &&
                          item.priceCents.length > 0
                      "
                    >
                      {{ item.priceCents }} ₫
                    </div>
                    <div class="font_weight_bold price" v-else>Miễn phí</div>
                    <div class="sales">{{ item.numberOfSales }} đã sử dụng</div>
                  </div>
                  <div class="right d_flex align_items_center ml_auto">
                    <div
                      class="action der_1"
                      @click="addToCollection(item._id)"
                    >
                      Thêm vào kho
                    </div>
                    <!--<div class="icon der_1">
                      <icon-base
                        icon-name="logo"
                        width="24"
                        height="24"
                        viewBox="0 0 550 550"
                      >
                        <icon-download />
                      </icon-base>
                    </div>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End: Popular Products -->
    <!-- Start: Join With Us -->
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
        <span class="signup" @click="redirectToSignup">Đăng ký</span>
      </div>
    </div>
    <!-- End: Join With Us -->
    <!-- Start: Marketing Section -->
    <div class="marketing--section p_4 ct mb_5">
      <div class="r">
        <div class="c_md_6 c_lg_4 c_xl_4 mb_2 text_center">
          <div
            class="marketing--section-image"
            :style="{
              backgroundImage: 'url(' + srcSimpleInterface + ')'
            }"
          ></div>
          <div class="title mt_4"><b>Giao diện thân thiện.</b></div>
          <div>
            Zinbee luôn cố gắng đem đến những sản phẩm dễ dàng sử dụng, thân
            thiện với người dùng. Hoạt động tốt trên tất cả các trình duyệt web.
          </div>
        </div>
        <div class="c_md_6 c_lg_4 c_xl_4 mb_2 text_center">
          <div
            class="marketing--section-image"
            :style="{
              backgroundImage: 'url(' + srcExamlePost + ')'
            }"
          ></div>
          <div class="title mt_4"><b>Bài post, chiến dịch mẫu.</b></div>
          <div>
            Để tăng hiệu quả sử dụng phần mềm, Zinbee có những post, chiến dịch
            mẫu để bạn tham khảo và sử dụng.
          </div>
        </div>
        <div class="c_md_6 c_lg_4 c_xl_4 mb_2 text_center">
          <div
            class="marketing--section-image"
            :style="{
              backgroundImage: 'url(' + srcAutomatic + ')'
            }"
          ></div>
          <div class="title mt_4"><b>Hoàn toàn tự động.</b></div>
          <div>
            Bạn chỉ cần thiết lập chiến dịch một lần. Phần mềm sẽ tự động post
            bài theo lịch được cài đặt.
          </div>
        </div>
      </div>
    </div>
    <!-- End: Marketing Section -->

    <!-- *************POPUP************* -->
    <transition name="popup">
      <detail-popup
        v-if="isShowDetailPopup"
        :product="productSelected"
        @closePopup="isShowDetailPopup = $event"
      ></detail-popup>
      <added-collection
        v-if="isShowAddToCollectionPopup === true"
        @closePopupAddToCollection="isShowAddToCollectionPopup = $event"
      ></added-collection>
    </transition>
  </div>
</template>

<script>
import DetailPopup from "../layouts/desktop/popup/detail";
import AddedCollection from "../layouts/desktop/popup/addToCollection";

export default {
  components: {
    AddedCollection,
    DetailPopup
  },
  data() {
    return {
      isShowDetailPopup: false,
      isShowAddToCollectionPopup: false,
      productSelected: {},
      srcDefault1: require("@/assets/images/market/left_join.svg"),
      srcDefault2: require("@/assets/images/market/right_join.svg"),
      srcAutomatic: require("@/assets/images/market/automatic.svg"),
      srcExamlePost: require("@/assets/images/market/example_post.svg"),
      srcSimpleInterface: require("@/assets/images/market/simple_interface.svg"),
      keywordSearch: "",
      currentPage: 1,
      maxPerPage: 12
    };
  },
  computed: {
    newMarketProducts() {
      return this.$store.getters.newestProduct;
    },
    status() {
      return this.$store.getters.marketStatus;
    }
  },
  async created() {
    await this.$store.dispatch("getNewestProduct", 6);
  },
  methods: {
    async addToCollection(value) {
      await this.$store.dispatch("addToCollection", value);
      if (this.status === "success") {
        this.isShowAddToCollectionPopup = true;
      }
    },
    dateFormat(date) {
      const dateTime = new Date(date),
        day = String(dateTime.getDate()).padStart(2, 0),
        month = String(dateTime.getMonth() + 1).padStart(2, 0),
        year = dateTime.getFullYear();

      return `${day}/${month}/${year}`;
    },
    formatCurrency(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    showDetailPopup(val) {
      this.productSelected = val;
      this.isShowDetailPopup = true;
    },
    redirectToSignup() {
      const routeData = this.$router.resolve({ name: "user_signup" });

      window.open(routeData.href, "_blank");
    },
    searchKeyword() {
      this.$store.dispatch("searchProducts", this.keywordSearch);
      this.$router.push({
        name: "market_search",
        params: {
          keyword: this.keywordSearch
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
