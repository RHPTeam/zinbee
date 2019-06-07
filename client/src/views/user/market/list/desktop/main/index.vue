<template>
  <div class="list--main" :data-theme="currentTheme">
    <!-- START: Selected filters -->
    <div class="d_flex selected-filters align_items_center mb_4 mt_2">
      <div class="total--product"><b>1234</b> items in</div>
      <div class="d_flex pl_2 pr_3">
        <div class="selected">
          <div class="items">
            <span class="name">All post</span>
            <span class="px_1 cut">/</span>
          </div>
        </div>
        <div class="selected">
          <div class="items">
            <span class="name">Post</span>
            <span class="px_1 cut">/</span>
          </div>
        </div>
      </div>
      <div class="clear">Clear all</div>
    </div>
    <!-- End Selected filters -->
    <div class="r list--group m_0">
      <div
        class="c_12 list--group-item mb_3 p_0"
        v-for="(item, index) in products"
        :key="index"
      >
        <div class="card">
          <div class="card_body d_flex">
            <div class="c_md_9 left p_0">
              <div class="top r m_0">
                <div class="thumbnail px_0 c_lg_6 c_md_12 c_xl_6">
                  <img
                    :src="item.previews.thumbnail"
                    @click="showDetailPopup(item)"
                    alt="Images ne"
                    class="thumbnail--img"
                  />
                </div>
                <div class="info pr_0 c_lg_6 c_md_12 c_xl_6">
                  <div class="title" @click="showDetailPopup(item)">
                    {{ item.name }}
                  </div>
                  <div class="editor mb_2">
                    <span class="by">Bởi</span>
                    <!-- <span class="avatar--user mr_1">
                      <img src="https://hinhanhdepvai.com/wp-content/uploads/2017/05/hot-girl.jpg" alt="">
                    </span>-->
                    {{ item._creator.name }}
                  </div>
                  <div class="description mb_1">{{ item.description }}</div>
                  <div class="attribute">
                    <ul class="m_0 p_0">
                      <li
                        class="list_group_item"
                        v-for="(attr, index) in item.attributes.slice(0, 3)"
                        :key="`c-${index}`"
                      >
                        <span class="font_weight_bold">{{ attr.name }} :</span>
                        <span>{{ attr.value }}</span>
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
              <div class="top"></div>
              <div class="right--item content text_center mt_1">
                <div class="price font_weight_bold">
                  {{ item.priceCents }} ₫
                </div>
                <div
                  class="sale d_flex align_items_center justify_content_center mt_1"
                >
                  <icon-base
                    class="icon--user mr_1"
                    width="16px"
                    height="16px"
                    viewBox="0 0 20 20"
                  >
                    <icon-user></icon-user>
                  </icon-base>
                  <span>{{ item.numberOfSales }} đã sử dụng</span>
                </div>
                <div class="last--update mt_1">
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
import DetailPopup from "../../../layouts/desktop/popup/detail";
import AddedCollection from "../../../layouts/desktop/popup/addToCollection";
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
    products() {
      return this.$store.getters.allProduct;
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
    addToCollection(value) {
      this.$store.dispatch("addToCollection", value);
      this.isShowAddToCollectionPopup = true;
    }
  },
  created() {
    this.$store.dispatch("getProducts");
  }
};
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
