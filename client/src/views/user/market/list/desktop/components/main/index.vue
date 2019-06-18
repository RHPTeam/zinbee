<template>
  <div class="list--main" :data-theme="currentTheme">
    <!-- START: Selected filters -->
    <div class="d_flex selected-filters align_items_center mb_4 mt_2">
      <div class="total--product">
        <b>{{ productsInCategory.length }}</b> items in
      </div>
      <div class="d_flex pl_2 pr_3">
        <div class="selected">
          <div class="items">
            <router-link class="name all--post" :to="{ name: 'market_home' }"
              >All post</router-link
            >
            <span class="px_1 cut">/</span>
          </div>
        </div>
        <div class="selected" v-if="currentParentMarketCategory">
          <div class="items">
            <span class="name">{{ currentParentMarketCategory }}</span>
            <span class="px_1 cut">/</span>
          </div>
        </div>
        <div class="selected" v-if="currentChildrenMarketCategory">
          <div class="items">
            <span class="name">{{ currentChildrenMarketCategory }}</span>
            <span class="px_1 cut">/</span>
          </div>
        </div>
      </div>
      <div class="clear">Clear all</div>
    </div>
    <!-- End Selected filters -->
    <!-- component loading  -->
    <div v-if="statusProducts === 'loading'">
      <loading-component />
    </div>
    <div class="r list--group m_0" v-else>
      <div
        class="c_12 list--group-item mb_3 p_0"
        v-for="(item, index) in productsInCategory"
        :key="index"
      >
        <div class="card">
          <div class="card_body d_flex">
            <div class="c_md_9 left p_0">
              <div class="top r m_0">
                <div class="thumbnail px_0 c_lg_6 c_md_12 c_xl_6">
                  <div
                    v-if="item.previews.thumbnail"
                    class="thumbnail--img"
                    :style="{
                      backgroundImage: 'url(' + item.previews.thumbnail + ')'
                    }"
                    @click="showDetailPopup(item)"
                  ></div>
                </div>
                <div
                  class="info pr_0 c_lg_6 c_md_12 c_xl_6 pt_md_1"
                  @click="showDetailPopup(item)"
                >
                  <div class="title">
                    {{ item.name }}
                  </div>
                  <div class="editor mb_2">
                    <span class="by">Bởi {{ item._creator.name }}</span>
                    <!-- <span class="avatar--user mr_1">
                      <img src="https://hinhanhdepvai.com/wp-content/uploads/2017/05/hot-girl.jpg" alt="">
                    </span>-->
                  </div>
                  <div class="description mb_1">
                    {{ item.description.slice(0, 100)
                    }}{{ item.description.length > 100 ? "..." : "" }}
                  </div>
                  <div class="attribute">
                    <ul class="m_0 p_0">
                      <li
                        class="list_group_item"
                        v-for="(attr, index) in item.attributes.slice(0, 2)"
                        :key="`c-${index}`"
                      >
                        <span v-if="attr.name === '' || attr.value === ''"
                          >Không có đặc điểm nào</span
                        >
                        <span v-else>
                          <span class="font_weight_bold"
                            >{{ attr.name }} :</span
                          >
                          <span>{{ attr.value }}</span>
                        </span>
                      </li>
                      <li v-if="item.attributes.length > 1">....</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="bottom mt_3">
                <div class="tags">
                  <span>Tags:</span>
                  <span v-for="(tag, tagIndex) in item.tags" :key="tagIndex"
                    >{{ tag
                    }}{{ tagIndex === item.tags.length - 1 ? "" : ", " }}</span
                  >
                </div>
              </div>
            </div>
            <div class="c_md_3 right py_0 pr_0 pl_3">
              <!-- <div class="top"></div> -->
              <div class="right--item content text_center mt_1">
                <div
                  class="price font_weight_bold"
                  v-if="
                    parseInt(item.priceCents) > 0 && item.priceCents.length > 0
                  "
                >
                  {{ item.priceCents }} ₫
                </div>
                <div class="font_weight_bold" v-else>Miễn phí</div>
                <div
                  class="sale d_flex align_items_center justify_content_center mt_1"
                >
                  <icon-base
                    class="icon--user mr_1"
                    width="16px"
                    height="16px"
                    viewBox="0 0 20 20"
                    icon-name="User"
                  >
                    <icon-user></icon-user>
                  </icon-base>
                  <span>{{ item.numberOfSales }} đã sử dụng</span>
                </div>
                <div class="last--update my_1">
                  Cập nhật lần cuối: {{ dateFormat(item.updatedAt) }}
                </div>
              </div>
              <div class="right--item bottom text_center">
                <div
                  class="btn btn_outline_info"
                  @click="addToCollection(item)"
                >
                  Thêm vào kho
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text_center py_3 card" v-if="productsInCategory.length === 0">
      Khong co san pham nao
    </div>
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
      />
    </transition>
  </div>
</template>

<script>
import DetailPopup from "../../../../layouts/desktop/popup/detail";
import AddedCollection from "../../../../layouts/desktop/popup/addToCollection";
export default {
  components: {
    DetailPopup,
    AddedCollection
  },
  data() {
    return {
      isShowDetailPopup: false,
      productSelected: {},
      isShowAddToCollectionPopup: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    currentParentMarketCategories() {
      return this.$store.getters.currentParentMarketCategory;
    },
    productsInCategory() {
      return this.$store.getters.productsByCategory;
    },
    currentParentMarketCategory() {
      let nameParent = "";
      let idParent = this.$route.params.categoryParent;
      let categoryParent = this.$store.getters.currentParentMarketCategory;
      if (categoryParent._id === idParent) {
        nameParent = categoryParent.name;
      }
      return nameParent;
    },
    currentChildrenMarketCategory() {
      let nameChildren = "";
      const idChildren = this.$route.params.subCategory;
      const categoryChildren = this.$store.getters.currentParentMarketCategory
        .children;
      categoryChildren.map(item => {
        if (item._id === idChildren) {
          nameChildren = item.name;
        }
      });
      return nameChildren;
    },
    status() {
      return this.$store.getters.marketStatus;
    },
    statusProducts() {
      return this.$store.getters.statusProducts;
    }
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
    },
    async addToCollection(value) {
      await this.$store.dispatch("addToCollection", value._id);
      if (this.status === "success") {
        this.isShowAddToCollectionPopup = true;
      }
    }
  },
  created() {
    const productsByCategory = this.$store.getters.productsByCategory;
    if (productsByCategory.length === 0) {
      this.$store.dispatch(
        "getProductsByCategory",
        this.$route.params.subCategory
      );
    }
    const currentParentMarketCategory = this.$store.getters
      .currentParentMarketCategory;
    if (currentParentMarketCategory.length === 0) {
      this.$store.dispatch(
        "currentParentMarketCategory",
        this.$$route.params.subCategory
      );
    }
  }
};
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
