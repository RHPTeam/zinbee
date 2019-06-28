<template>
  <div class="agency">
    <div class="header">
      <breadcrumb :breadTitle="breadTitle" :breadDesc="breadDesc" />
    </div>
    <div class="tabs">
      <router-link
        class="active tab mr_3"
        tag="a"
        :to="{ name: 'agency_list' }"
      >
        Danh sách đại lý
      </router-link>
      <router-link class="active tab" tag="a" :to="{ name: 'agency_package' }">
        Quản lý gói tài khoản
      </router-link>
    </div>
    <div class="agency--wrap">
      <router-view />
    </div>
  </div>
</template>

<script>
import Breadcrumb from "./breadcrumb";
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      breadTitle: "Quản lý đại lý",
      breadDesc: "giúp bạn quản lý thông tin đại lý dễ dàng hơn"
    };
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  a {
    &:hover,
    &:active,
    &:visited,
    &:focus {
      text-decoration: none;
    }
  }
  .active {
    color: #ffb94a !important;
  }
}
</style>
