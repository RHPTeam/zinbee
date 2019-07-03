<template>
  <div class="manager">
    <label class="header mt_3" @click="isShowInfo = true">
      Tạo mới đại lý
    </label>
    <div class="body">
      <div class="post--data my_3">
        <div class="item--header d_flex align_items_center px_3 py_2">
          <div class="col col--name px_2">Tên bài viết</div>
          <div class="col col--category px_2">Nội dung</div>
          <div class="col col--image px_4">Hình ảnh</div>
          <div class="col col--action px_4">Hành động</div>
        </div>
        <!-- if all post === undefined call component loading -->
        <div
          class="item--body data--empty d_flex align_items_center justify_content_center px_3 py_2"
        >
          Không có dữ liệu.
        </div>
        <!-- else call component item post -->
        <div>
          <div class="mt_3">
            <loading-component></loading-component>
          </div>
          <div>
            <item-agency
              @showDeletePopup="showDeletePopup($event)"
              @showCreatePopup="showCreatePopup($event)"
            ></item-agency>
          </div>
        </div>

        <!--***********POPUP***********  -->
        <transition name="popup">
          <delete-agency
            v-if="isShowDeleteAgency === true"
            :post="postSelected"
            @closePopup="isShowDeleteAgency = $event"
          ></delete-agency>
          <info-agency v-if="isShowInfo === true" @close="isShowInfo = $event">
          </info-agency>
        </transition>
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
