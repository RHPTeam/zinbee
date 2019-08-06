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
  </div>
</template>

<script>
import AppHeader from "./components/header";
import AppList from "./components/list";
export default {
  components: {
    AppHeader,
    AppList
  }
};
</script>

<style scoped></style>
