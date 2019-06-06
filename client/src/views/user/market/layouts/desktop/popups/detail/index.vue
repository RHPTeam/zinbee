<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_4 pb_4 pt_3">
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
                :style="{ backgroundImage: 'url(' + product.img + ')' }"
              ></div>
            </div>
            <div class="right">
              <div class="right--data">
                <div class="title">{{ product.title }}</div>
                <div class="editor mt_1">bởi {{ product.editor }}</div>
                <div class="sale d_flex align_items_center mt_3">
                  <icon-base
                    class="icon--user mr_1"
                    width="16px"
                    height="16px"
                    viewBox="0 0 20 20"
                  >
                    <icon-user></icon-user>
                  </icon-base>
                  <span>{{ product.sale }} đã sử dụng</span>
                </div>
                <div class="price mt_3">{{ product.price }} ₫</div>
              </div>
              <div class="right--btn">
                <div class="btn btn_outline_info">Thêm vào kho</div>
              </div>
            </div>
          </div>
          <div class="functions mt_3">
            <div class="functions--title mb_2">Đặc điểm</div>
            <ul class="list_group pl_3">
              <li class="list_group_item">
                <span class="font_weight_bold">Key 1: </span>
                <span>Lorem ipsum dolor sit amet</span>
              </li>
              <li class="list_group_item">
                <span class="font_weight_bold">Key 1: </span>
                <span>Lorem ipsum dolor sit amet</span>
              </li>
            </ul>
          </div>
          <div class="preview mt_3">
            <div class="preview--title mb_2">Xem trước</div>
            <div class="preview--content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum...
            </div>
          </div>
        </div>
        <!-- End: Modal Body -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
