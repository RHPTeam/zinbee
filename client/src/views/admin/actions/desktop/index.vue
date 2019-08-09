<template>
  <div class="main">
    <!-- Start: Introduce Actions -->
    <breadcrumb
      nameBread="Quản lý hoạt động"
      subBread="Giúp bạn quản lý các hoạt động của người dùng 1 cách tốt nhất"
    />
    <!-- End: Introduce Actions -->
    <!-- Start: Header -->
    <app-header />
    <!-- End: Header -->
    <!-- Start: List -->
    <app-list />
    <!-- End: List -->
    <!-- Start: Footer - Total -->
    <app-footer/>
    <!-- End: Footer - Total -->
    <!-- Start: Info -->
    <div class="info position_fixed">
      <div class="icon" @click="showInfo" v-click-outside="closeInfo">
        <icon-base
          class="icon--help"
          icon-name="Hỗ trợ"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <icon-help />
        </icon-base>
      </div>
      <div class="content position_absolute" :class="isShowInfo === true ? 'active' : ''">
        <div class="items d_flex align_items_center">
          Thêm
          <span class="bg--color create"></span>
        </div>
        <div class="items d_flex align_items_center">
          Sửa
          <span class="bg--color update"></span>
        </div>
        <div class="items d_flex align_items_center">
          Xóa
          <span class="bg--color delete"></span>
        </div>
        <div class="items d_flex align_items_center">
          Sao chép
          <span class="bg--color duplicate"></span>
        </div>
        <div class="items d_flex align_items_center">
          Đăng ngay
          <span class="bg--color postnow"></span>
        </div>
        <div class="items d_flex align_items_center">
          Đăng ký
          <span class="bg--color signup"></span>
        </div>
      </div>
    </div>
    <!-- End: Info -->
  </div>
</template>

<script>
import AppHeader from "./components/header";
import AppList from "./components/list";
import AppFooter from "./components/footer";
export default {
  components: {
    AppHeader,
    AppList,
    AppFooter
  },
  data() {
    return {
      isShowInfo: false
    }
  },
  methods: {
    closeInfo() {
      this.isShowInfo = false;
    },
    showInfo() {
      this.isShowInfo = true;
    }
  },
};
</script>

<style scoped lang="scss">
.main {
  .info {
    bottom: 2rem;
    right: 2rem;
    z-index: +2;
    .icon {
      cursor: pointer;
      svg {
        color: #27292d;
      }
    }
  }
  .content {
    width: 0;
    height: 0;
    bottom: 100%;
    right: 100%;
    transition: 0.3s all ease;
    overflow: hidden;
    &.active {
      height: 144px;
      width: 150px;
    }
  }
  .bg--color {
    height: 3px;
    width: 50px;
    margin-left: auto;
  }
  .create {
    background: green;
  }
  .update {
    background: orange;
  }
  .delete {
    background: red;
  }
  .duplicate {
    background: purple;
  }
  .postnow {
    background: yellow;
  }
  .signup {
    background: blue;
  }
}
</style>
