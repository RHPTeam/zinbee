<template>
  <div class="code">
    <breadcrumb
      nameBread="Mã kích hoạt"
      subBread="Mã kích hoạt giúp các tài khoản gia hạn nhanh chóng"
    />
    <!-- Start: Header - Navigation -->
    <app-navigation @openPopupCreate="isShowPopupCreate = $event" />
    <!-- End: Header - Navigation -->
    <!-- Start: Table - List code -->
    <list-code />
    <!-- End: Table - List code -->

    <!-- Start: Transition Popup -->
    <transition name="popup">
      <create-code
        v-if="isShowPopupCreate === true"
        @closePopup="isShowPopupCreate = $event"
      />
    </transition>
    <!-- End: Transition Popup -->
  </div>
</template>

<script>
import AppNavigation from "./components/navigation";
import ListCode from "./components/table";
import CreateCode from "./components/popup/create";
export default {
  components: {
    AppNavigation,
    CreateCode,
    ListCode
  },
  data() {
    return {
      isShowPopupCreate: false
    };
  }
};
</script>

<style scoped lang="scss">
.popup-enter-active,
.popup-leave-active {
  transition: opacity 1s;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
</style>
