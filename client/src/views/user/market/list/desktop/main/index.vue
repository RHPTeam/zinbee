<template>
  <div class="list--main py_3 pr_4">
    <div class="r list--group">
      <div class="c_12 list--group-item"
           v-for="( item, index ) in posts"
           :key="index"
      >
        <div class="card">
          <div class="card_body d_flex">
            <div class="c_md_9 left p_0">
              <div class="top d_flex">
                <div class="thumbnail mr_3">
                  <div class="thumbnail--bg"
                       :style="{ backgroundImage: 'url(' + item.img + ')' }"
                       @click="showDetailPopup( item )"
                  ></div>
                </div>
                <div class="info">
                  <div class="title font_weight_bold mb_1"
                       @click="showDetailPopup( item )"
                  >{{ item.title }}</div>
                  <div class="editor mb_3">bởi {{ item.editor }}</div>
                  <div class="functions">
                    <ul class="list_group pl_3">
                      <li class="list_group_item pb_1">Online Drag & Drop Stampready builde</li>
                      <li class="list_group_item pb_1">Online Drag & Drop Stampready builde</li>
                      <li class="list_group_item pb_1">Online Drag & Drop Stampready builde</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="bottom mt_3">
                <div class="tags">
                  <span>Tags: </span>
                  <span v-for="( tag, tagIndex ) in item.tags"
                        :key="tagIndex"
                  >{{ tag }}{{ tagIndex === item.tags.length - 1 ? "" : ", " }}</span>
                </div>
              </div>
            </div>
            <div class="c_md_3 right py_0 pr_0 pl_3">
              <div class="top"></div>
              <div class="right--item content text_center mt_3">
                <div class="price font_weight_bold">{{ item.price }} ₫</div>
                <div class="sale d_flex align_items_center justify_content_center mt_1">
                  <icon-base
                    class="icon--user mr_1"
                    width="16px"
                    height="16px"
                    viewBox="0 0 20 20"
                  >
                    <icon-user></icon-user>
                  </icon-base>
                  <span>{{ item.sale }} đã sử dụng</span>
                </div>
                <div class="last--update mt_1">Cập nhật lần cuối: {{ dateFormat( item.updatedAt ) }}</div>
              </div>
              <div class="right--item bottom text_center">
                <div class="btn btn_outline_info">Thêm vào kho</div>
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
    </transition>
  </div>
</template>

<script>
import DetailPopup from "../../../layouts/desktop/popup/detail";

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
          img: "https://hinhanhdepvai.com/wp-content/uploads/2017/05/hot-girl.jpg",
          title: "Cho tôi một vé trở về tuổi thơ",
          editor: "Đặng Yến",
          price: "100,000",
          tags: [ "du lịch", "mỹ phẩm" ],
          sale: 103,
          updatedAt: "2019-06-05T12:27:39.126+00:00"
        }
      ]
    }
  },
  methods: {
    dateFormat( date ) {
      const dateTime = new Date( date ),
            day = String( dateTime.getDate() ).padStart( 2, 0 ),
            month = String( dateTime.getMonth() + 1 ).padStart( 2, 0 ),
            year = dateTime.getFullYear();

      return `${day}/${month}/${year}`;
    },
    showDetailPopup( val ) {
      this.productSelected = val;
      this.isShowDetailPopup = true;
    }
  }
}
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
