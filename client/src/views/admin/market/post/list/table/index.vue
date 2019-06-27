<template>
  <div class="post--data my_3" :data-theme="currentTheme">
    <div class="item--header d_flex align_items_center px_3 py_2">
      <div class="col col--name px_2">
        <span
          class="sort"
          @click="sortPostsByProperty(isSort[0], 0)"
          :class="[
            isSort[0].asc === true || isSort[0].desc === true ? 'active' : ''
          ]"
          >Tên bài viết
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].asc === false && isSort[0].desc === false"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].asc"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down descending ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].desc"
          >
            <icon-arrow-down />
          </icon-base>
        </span>
      </div>
      <div class="col col--category px_2">Nội dung</div>
      <div class="col col--image px_4">Hình ảnh</div>
      <div class="col col--action px_4">Hành động</div>
    </div>
    <!-- if all post === undefined call component loading -->
    <div
      v-if="filteredMarketPosts.length === 0"
      class="item--body data--empty d_flex align_items_center justify_content_center px_3 py_2"
    >
      Không có dữ liệu.
    </div>
    <!-- else call component item post -->
    <div v-else>
      <div
        v-if="this.$store.getters.marketPostStatus === 'loading'"
        class="mt_3"
      >
        <loading-component></loading-component>
      </div>
      <div v-else>
        <item-post
          v-for="(item, index) in filteredMarketPosts"
          :key="index"
          :item="item"
          @showDeletePopup="showDeletePopup($event)"
          @showCreatePopup="showCreatePopup($event)"
        ></item-post>
      </div>
    </div>

    <!-- ***********POPUP*********** -->
    <transition name="popup">
      <delete-popup
        v-if="isShowDeletePopup"
        :post="postSelected"
        @closePopup="isShowDeletePopup = $event"
      ></delete-popup>
      <product-market
        v-if="isShowCreateProductPopup === true"
        :post="postSelected"
        @close="isShowCreateProductPopup = $event"
      >
      </product-market>
    </transition>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
