<template>
  <div class="main">
    <div class="item--header d_flex align_items_center px_3 py_2">
      <div class="col col--name">Mã code</div>
      <div class="col col--category expire">Ngày hết hạn</div>
      <!-- <div class="col col--category status">Trạng thái</div> -->
      <div class="col col--category number--account activated">
        Số lượng tài khoản
      </div>
      <div class="col col--action">Hành động</div>
    </div>
    <div class="item--body">
      <div class="text_center my_2" v-if="allCode.length === 0">
        Không có dữ liệu
      </div>
      <app-item
        v-else
        v-for="code in allCode"
        :key="code._id"
        :code="code"
        @showPopupUpdate="showPopupUpdate($event)"
        @showPopupDelete="showPopupDelete($event)"
      />
    </div>
    <!-- Start: Popup Update code -->
    <transition name="popup">
      <popup-update-code
        v-if="isShowPopupUpdateCode === true"
        :code="codeSelected"
        @closePopup="isShowPopupUpdateCode = $event"
      />
      <popup-delete-code
        v-if="isShowPopupDeleteCode === true"
        @closePopup="isShowPopupDeleteCode = $event"
        typeName="mã code này"
        storeActionName="deleteCode"
        :targetData="codeSelected"
      />
    </transition>
    <!-- End: Popup Update code -->
  </div>
</template>

<script>
import AppItem from "./item";
import PopupDeleteCode from "@/components/popups/delete";
import PopupUpdateCode from "../popup/update";
export default {
  components: {
    AppItem,
    PopupDeleteCode,
    PopupUpdateCode
  },
  data() {
    return {
      isShowPopupUpdateCode: false,
      isShowPopupDeleteCode: false,
      codeSelected: {}
    };
  },
  computed: {
    allCode() {
      return this.$store.getters.allCode;
    }
  },
  async created() {
    await this.$store.dispatch("getAllCode");
  },
  methods: {
    showPopupUpdate(code) {
      this.codeSelected = code;
      this.isShowPopupUpdateCode = true;
    },
    showPopupDelete(code) {
      this.codeSelected = code;
      this.isShowPopupDeleteCode = true;
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "./index.style";
.item--header {
  background-color: #27292d;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #ccc;
  height: 48px;
  .col--name {
    width: 40%;
  }
  .col--category {
    width: 20%;
  }
  .col--action {
    width: 20%;
    text-align: center;
  }
}
.popup-enter-active,
.popup-leave-active {
  transition: opacity 1s;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
</style>
