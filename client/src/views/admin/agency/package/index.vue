<template>
  <div class="package">
    <div class="r">
      <!--      <div class="c_3">-->
      <!--        <div-->
      <!--          class="card d_flex flex_column align_items_center position_relative px_3 py_5"-->
      <!--        >-->
      <!--          <loading-component />-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="c_lg_3 c_xl_3 c_md_6 mb_3 position_relative">
        <div
          class="card d_flex flex_column align_items_center position_relative px_3 py_5"
        >
          <div class="icon mb_2">
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="50"
              height="50"
              viewBox="0 0 481 481"
            >
              <icon-folder />
            </icon-base>
          </div>
          <div class="desc">item.title }}</div>
        </div>

        <div class="above d_flex align_items_center position_absolute">
          <icon-base
            class="icon--remove"
            icon-name="plus"
            width="24"
            height="24"
            viewBox="0 0 20 20"
          >
            <icon-remove />
          </icon-base>
        </div>

        <!--*********** POPUP *************-->
        <!--        <transition name="popup">-->
        <!--          <delete-folder-popup-->
        <!--            v-if="isShowDeletePopup === true"-->
        <!--            :data-theme="currentTheme"-->
        <!--            :item="item._id"-->
        <!--            @close="isShowDeletePopup = $event"-->
        <!--          ></delete-folder-popup>-->
        <!--        </transition>-->
      </div>

      <div class="c_lg_3 c_xl_3 c_md_6 mb_3">
        <div class="card d_flex flex_column align_items_center px_3 py_5">
          <div class="icon mb_2">
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="50"
              height="50"
              viewBox="0 0 66 66"
            >
              <icon-plus />
            </icon-base>
          </div>
          <div class="desc">Tạo thư mục mới</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.package {
  .c_md_6 {
    &:hover,
    &:active,
    &:visited,
    &:focus {
      > .above {
        opacity: 1;
      }
    }
    .above {
      cursor: pointer;
      top: 0.5rem;
      right: 1rem;
      z-index: 9;
      opacity: 0;
    }
  }
  .card {
    cursor: pointer;
    border-radius: 1rem;
  }
}
</style>
