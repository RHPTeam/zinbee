<template>
  <div class="manager">
    <label class="header mt_3" @click="createAgency">
      Tạo mới đại lý
    </label>
    <div class="body">
      <div class="post--data my_3">
        <div class="item--header d_flex align_items_center px_3 py_2">
          <div class="col col--name px_2">Tên đại lý</div>
          <div class="col col--category px_2">Thành viên</div>
          <div class="col col--image px_4">Thời gian đã sử dụng</div>
          <div class="col col--image px_4">Thời gian còn lại</div>
          <div class="col col--image px_4">Gói tài khoản</div>
          <div class="col col--action px_4">Hành động</div>
        </div>
        <!-- if all post === undefined call component loading -->
        <div
          class="item--body data--empty d_flex align_items_center justify_content_center px_3 py_2"
          v-if="agencies && agencies.length === 0"
        >
          Không có dữ liệu.
        </div>
        <!-- else call component item post -->
        <div v-else>
          <div
            class="mt_3"
            v-if="this.$store.getters.agencyStatus === 'loading'"
          >
            <loading-component></loading-component>
          </div>
          <div v-else>
            <item-agency
              v-for="(item, index) in agencies"
              :key="index"
              :item="item"
              @showDeletePopup="showDeletePopup($event)"
              @showCreatePopup="showCreatePopup($event)"
            ></item-agency>
          </div>
        </div>

        <!--***********POPUP***********  -->
        <transition name="popup">
          <delete-agency
            v-if="isShowDeleteAgency === true"
            :agencyId="agencyId"
            @close="isShowDeleteAgency = $event"
          ></delete-agency>
          <info-agency v-if="isShowInfo === true" :isShowInfo="isShowInfo" @closePopup="isShowInfo = $event">
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
