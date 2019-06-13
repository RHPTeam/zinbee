<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_4 pb_4 pt_3" v-click-outside="closePopup">
        <!-- Start: Modal Header -->
        <div class="modal--header position_relative">
          <div class="btn--close position_absolute" @click="closePopup">
            <icon-base height="18px" width="18px" viewBox="0 0 20 20">
              <icon-cancel></icon-cancel>
            </icon-base>
          </div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="modal--body">
          <div class="general--info d_flex mb_3">
            <div class="left">
              <div
                class="thumbnail mr_3"
                :style="{
                  backgroundImage: 'url(' + product.previews.thumbnail + ')'
                }"
              ></div>
            </div>
            <div class="right">
              <div class="right--data">
                <div class="title">{{ product.name }}</div>
                <div class="editor">
                  <i>by</i>
                  {{ product._creator.name }}
                </div>
                <div class="sale d_flex align_items_center mt_3">
                  <icon-base
                    class="icon--user mr_1"
                    width="16px"
                    height="16px"
                    viewBox="0 0 20 20"
                  >
                    <icon-user></icon-user>
                  </icon-base>
                  <span>{{ product.numberOfSales }} đã sử dụng</span>
                </div>
                <div class="price mt_3">
                  {{ formatCurrency(product.priceCents) }} ₫
                </div>
              </div>
              <div class="right--btn">
                <div
                  class="btn btn_outline_info"
                  @click="addToCollection(product._id)"
                >
                  Thêm vào kho
                </div>
              </div>
            </div>
          </div>
          <VuePerfectScrollbar class="scroll--preview">
            <div class="functions mt_3">
              <div class="functions--title mb_2">Đặc điểm</div>
              <ul class="list_group pl_3">
                <li
                  class="list_group_item"
                  v-for="(attr, index) in product.attributes"
                  :key="`c-${index}`"
                >
                  <span v-if="attr.name === '' || attr.value === ''"
                    >Không có đặc điểm nào</span
                  >
                  <span v-else>
                    <span class="font_weight_bold">{{ attr.name }} :</span>
                    <span>{{ attr.value }}</span>
                  </span>
                </li>
              </ul>
            </div>
            <div class="preview mt_3">
              <div class="preview--title mb_2">Xem trước</div>
              <div class="preview--content">{{ product.summary }}</div>
            </div>
          </VuePerfectScrollbar>
        </div>
        <!-- End: Modal Body -->
      </div>
    </div>
    <!-- *************POPUP************* -->
    <transition name="popup">
      <added-collection
        v-if="isShowAddToCollectionPopup === true"
        @closePopupAddToCollection="isShowAddToCollectionPopup = $event"
      />
    </transition>
  </div>
</template>

<script>
import AddedCollection from "../addToCollection";
export default {
  props: ["product"],
  data() {
    return {
      isShowAddToCollectionPopup: false
    };
  },
  components: {
    AddedCollection
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    status() {
      return this.$store.getters.marketStatus;
    }
  },
  methods: {
    async addToCollection(value) {
      await this.$store.dispatch("addToCollection", value);
      if (this.status === "success") {
        this.isShowAddToCollectionPopup = true;
        // this.closePopup();
      }
    },
    closePopup() {
      this.$emit("closePopup", false);
    },
    formatCurrency(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
