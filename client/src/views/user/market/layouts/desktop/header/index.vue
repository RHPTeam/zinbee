<template>
  <div
    class="content--header-help d_flex justify_content_between align_items_center"
  >
    <div class="ct">
      <div class="r mx_0 mb_3">
        <div
          class="c_md_6 header--left d_flex justify_content_start align_items_center "
        >
          <!-- Start: Header logo -->
          <div class="logo">
            <div class="logo d_flex align_items_center">
              <icon-base
                icon-name="logo"
                width="40px"
                height="40px"
                viewBox="0 0 200 200"
              >
                <icon-logo-icon-white />
              </icon-base>
              <div class="center--support ml_2">
                Zinbee Store
              </div>
            </div>
          </div>
          <!-- End: Header logo-->
        </div>
        <div
          class="c_md_6 header--right d_flex justify_content_end align_items_center"
        >
          <!-- Start: Redirect to help -->
          <div class="help mr_2 ml_1">
            <icon-base
              icon-name="menu"
              width="25"
              height="25"
              viewBox="0 0 25 25"
            >
              <icon-help />
            </icon-base>
          </div>
          <!-- End: Redirect to help -->
        </div>
      </div>
      <div class="bot d_flex align_items_center py_2">
        <button class="tab btn btn_primary mr_2">Post Popular</button>
        <button class="tab btn btn_dark">Hightlight Post</button>
      </div>
    </div>
  </div>
</template>

<!--<script src="./index.script"></script>-->

<style lang="scss" scoped>
@import "index.style";
</style>
