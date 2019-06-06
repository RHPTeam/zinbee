<template>
  <div class="list--wrapper">
    <div class="r px_3">
      <app-search/>
    </div>
    <div class="r">
      <div class="c_md_3">
        <!-- Start: App Sidebar-->
        <app-sidebar></app-sidebar>
        <!-- End: App Sidebar -->
      </div>
      <div class="c_md_9">
        <!-- Start: App Data-->
        <app-data></app-data>
        <!-- End: App Data -->
      </div>
    </div>
  </div>
</template>

<script>
import AppData from "./main";
import AppSearch from "./search";
import AppSidebar from  "./sidebar";

export default {
  components: {
    AppData,
    AppSearch,
    AppSidebar
  }
}
</script>

<style scoped lang="scss">

</style>
